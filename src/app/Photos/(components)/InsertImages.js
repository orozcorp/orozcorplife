"use client";
import { useState, useEffect } from "react";
import { postData } from "@/lib/helpers/getData";
import Upload from "@/components/smallComponents/Upload";
import { usePathname, useRouter } from "next/navigation";
const MUTATION = `
  mutation Mutation($input: InsertTrabajos!) {
    addTrabajos(input: $input) {
      code
      data
      message
      success
    }
  }
`;
export default function InsertImages({ userId }) {
  const [loading, setLoading] = useState(false);
  const [percent, setPercent] = useState(0);
  const [keys, setKeys] = useState([]);
  const router = useRouter();
  const pathname = usePathname();
  const blogUpdate = async (e) => {
    e.preventDefault();
    console.log({
      input: {
        idUser: userId.value,
        userName: userId.label,
        trabajos: keys.map(
          (key) => `https://s3.us-east-2.amazonaws.com/orozcorp/${key}`
        ),
      },
    });

    setLoading(true);

    const data = await postData({
      query: MUTATION,
      variables: {
        input: {
          idUser: userId.value,
          userName: userId.label,
          trabajos: keys.map(
            (key) => `https://s3.us-east-2.amazonaws.com/orozcorp/${key}`
          ),
        },
      },
    });
    setKeys([]);
    setPercent(0);
    setLoading(false);
    router.replace(pathname);
  };
  return (
    <form
      className="flex flex-row flex-wrap gap-4 items-end"
      onSubmit={blogUpdate}
    >
      <Upload
        percent={percent}
        setPercent={setPercent}
        location={userId.value}
        fileKeys={keys}
        setFileKeys={setKeys}
      />
      <button
        type="submit"
        disabled={loading}
        className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
      >
        {loading ? "Guardando" : "Guardar trabajos"}
      </button>
    </form>
  );
}
