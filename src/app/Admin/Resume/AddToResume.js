"use client";
import Modal from "@/components/smallComponents/Modal";
import Input from "@/components/smallComponents/Input";
import { useState } from "react";
import { button } from "@/components/smallComponents/ButtonComponents";
import UploadImage from "@/components/smallComponents/UploadImage";
import { postData } from "@/lib/helpers/getData";
import Spinner from "@/components/smallComponents/Spinner";
import Alert from "@/components/smallComponents/Alert";
import { useRouter } from "next/navigation";
const MUTATION = `
  mutation Mutation($logo: String!, $company: String!, $dateStarted: Date!, $dateEnded: Date) {
    addResume(logo: $logo, company: $company, dateStarted: $dateStarted, dateEnded: $dateEnded) {
      code
      data
      message
      success
    }
  }
`;
export default function AddToResume({ display, setDisplay }) {
  const router = useRouter();
  const [values, setValues] = useState({
    company: "",
    dateStarted: new Date(),
    dateEnded: new Date(),
  });
  const [logo, setLogo] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const save = await postData({
        query: MUTATION,
        variables: {
          logo,
          company: values.company,
          dateStarted: values.dateStarted,
          dateEnded: values.dateEnded,
        },
      });
      if (save.addResume.success) {
        setValues({
          company: "",
          dateStarted: new Date(),
          dateEnded: new Date(),
        });
        setDisplay("none");
        setLogo("");
        router.push(`/Admin/Resume/${save.addResume.data}`);
      } else {
        setError(save.addResume.message);
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <Modal display={display} setDisplay={setDisplay} title="Add to resume">
      <form onSubmit={submit}>
        <UploadImage
          heading="Logo"
          setFoto={setLogo}
          location="Resume"
          accept="image/*"
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
          name="dateStarted"
        />
        <Input
          type="date"
          values={values}
          setValues={setValues}
          name="dateEnded"
        />
        <div className="flex flex-row flex-wrap justify-between items-center">
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
                logo: "",
                company: "",
                dateStarted: new Date(),
                dateEnded: new Date(),
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
