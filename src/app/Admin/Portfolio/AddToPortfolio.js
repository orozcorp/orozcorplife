"use client";
import Modal from "@/components/smallComponents/Modal";
import Input from "@/components/smallComponents/Input";
import { useState, useEffect } from "react";
import { button } from "@/components/smallComponents/ButtonComponents";
import KeywordsInput from "@/components/smallComponents/KeywordsInput";
import UploadImage from "@/components/smallComponents/UploadImage";
import { postData } from "@/lib/helpers/getData";
import Spinner from "@/components/smallComponents/Spinner";
import Alert from "@/components/smallComponents/Alert";
import TextArea from "@/components/smallComponents/TextArea";
import { useRouter } from "next/navigation";
import { rgbDataURL } from "@/lib/helpers/blur";
import Image from "next/image";
const MUTATION = `
  mutation Mutation($input: PortfolioInput!) {
    addPortfolio(input: $input) {
      code
      data
      success
      message
    }
  }
`;
export default function AddToPortfolio({ display, setDisplay }) {
  const router = useRouter();
  const [values, setValues] = useState({
    project: "",
    company: "",
    description: "",
    date: new Date(),
    images: [],
    keywords: [], // Added for keywords
    descriptionMeta: "", // Added for descriptionMeta
  });
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    if (!image) return;

    const timeoutId = setTimeout(() => {
      setValues({ ...values, images: [...values.images, image] });
      setImage("");
    }, 1500);

    return () => clearTimeout(timeoutId);
  }, [image, values]);
  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const save = await postData({
        query: MUTATION,
        variables: {
          input: {
            ...values,
            images: values.images.map((image) =>
              image.replace(
                "https://s3.us-east-2.amazonaws.com/orozcorp",
                "https://orozcorp.s3.us-east-2.amazonaws.com"
              )
            ),
          },
        },
      });
      if (save.addPortfolio.success) {
        setValues({
          project: "",
          company: "",
          description: "",
          date: new Date(),
          images: [],
        });
        setDisplay("none");
        router.push(`/Admin/Portfolio/${save.addPortfolio.data}`);
      } else {
        setError(save.addPortfolio.message);
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <Modal display={display} setDisplay={setDisplay} title="Add to portfolio">
      <form onSubmit={submit}>
        <div className="flex flex-row flex-wrap justify-between w-full gap-4">
          <Input
            type="text"
            values={values}
            setValues={setValues}
            name="project"
          />
          <Input
            type="text"
            values={values}
            setValues={setValues}
            name="company"
          />
          <Input
            type="date"
            values={values}
            setValues={setValues}
            name="date"
          />
        </div>
        <TextArea
          name="description"
          values={values}
          setValues={setValues}
          width="w-full"
        />
        <TextArea
          name="descriptionMeta"
          values={values}
          setValues={setValues}
          width="w-full"
          placeholder="Meta Description"
        />
        <KeywordsInput values={values} setValues={setValues} name="keywords" />
        <UploadImage
          heading="Image 310x572"
          setFoto={setImage}
          location="Projects"
          accept="image/*"
        />
        <div className="flex flex-row flex-wrap justify-start gap-4 my-4">
          {values.images.map((image, index) => (
            <div
              key={index}
              className="relative"
              onClick={() =>
                setValues({
                  ...values,
                  images: values.images.filter((img) => img !== image),
                })
              }
            >
              <Image
                src={image}
                alt="image"
                width={80}
                height={80}
                className="w-20 h-20 object-cover rounded-md"
                blurDataURL={rgbDataURL(0, 0, 0)}
                loading="lazy"
              />
            </div>
          ))}
        </div>
        <div className="flex flex-row flex-wrap justify-start items-stretch gap-4">
          <button
            type="submit"
            disabled={loading}
            className={`${button({ color: "primary", fontSize: "medium" })}`}
          >
            {loading ? <Spinner color="white" /> : "Save"}
          </button>
          <button
            className={`${button({ color: "danger", fontSize: "medium" })}`}
            onClick={(e) => {
              e.preventDefault();
              setValues({
                project: "",
                company: "",
                description: "",
                date: new Date(),
                images: [],
              });
              setDisplay("none");
            }}
          >
            Cancelar
          </button>
        </div>

        {error && <Alert color="red" type="Error" description={error} />}
      </form>
    </Modal>
  );
}
