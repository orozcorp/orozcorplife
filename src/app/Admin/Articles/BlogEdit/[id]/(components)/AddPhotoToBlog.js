"use client";
import { useState } from "react";
import Spinner from "../../../../../../components/smallComponents/Spinner";
import Image from "next/image";
import { postData } from "@/lib/helpers/getData";
import UploadFoto from "@/components/smallComponents/UploadFoto";
const MUTATION = `
  mutation BlogUpdatePhoto(
    $blogUpdatePhotoId: ID!
    $url: String!
    $title: String!
  ) {
    blogUpdatePhoto(id: $blogUpdatePhotoId, url: $url, title: $title) {
      code
      data
      message
      success
    }
  }
`;

export default function AddPhotoToBlog({ id, title }) {
  const [foto, setFoto] = useState("");
  const [loading, setLoading] = useState(false);
  const blogUpdatePhoto = async () => {
    setLoading(true);
    const data = await postData({
      query: MUTATION,
      variables: {
        blogUpdatePhotoId: id,
        url: foto,
        title: title,
      },
    });
    setLoading(false);
  };
  const [percent, setPercent] = useState(0);
  return (
    <div
      className="flex flex-row flex-wrap justify-start items-center w-full mb-8"
      as="form"
    >
      {foto && percent === 100 ? (
        <Image
          src={foto}
          alt="thumbail"
          width={60}
          height={60}
          className="mx-8 rounded"
        />
      ) : (
        <>
          <UploadFoto
            setFoto={setFoto}
            percent={percent}
            setPercent={setPercent}
          />
        </>
      )}
      <button
        disabled={loading || !foto || percent < 100}
        onClick={blogUpdatePhoto}
        style={{ alignSelf: "center" }}
        className="mt-8 text-white bg-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
      >
        {loading || (percent < 100 && percent !== 0) ? (
          <Spinner />
        ) : (
          "Guardar Foto"
        )}
      </button>
    </div>
  );
}
