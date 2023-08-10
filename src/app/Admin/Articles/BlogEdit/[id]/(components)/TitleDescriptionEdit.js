"use client";
import { postData } from "../../../../../../lib/helpers/getData";
import { useState } from "react";
const MUTATION = `
  mutation BlogUpdate($id: ID!, $input: BlogUpdateInput!) {
    blogUpdate(_id: $id, input: $input) {
      code
      data
      message
      success
    }
  }
`;
export default function TitleDescriptionEdit({ info, setInfo, id, setEdit }) {
  const [loading, setLoading] = useState(false);
  const blogUpdate = async () => {
    setLoading(true);
    const data = await postData({
      query: MUTATION,
      variables: {
        id,
        input: { ...info },
      },
    });
    setEdit(false);
    setLoading(false);
  };
  return (
    <form
      className="w-full my-4"
      onSubmit={(e) => {
        e.preventDefault();
        blogUpdate();
      }}
    >
      <div className="relative z-0 w-full mb-6 group">
        <input
          type="text"
          className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          required
          value={info?.title}
          onChange={(e) => setInfo({ ...info, title: e.target.value })}
        />
      </div>
      <div className="relative z-0 w-full mb-6 group">
        <textarea
          rows="4"
          className="block p-2.5 w-full text-md text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 "
          required
          value={info?.description}
          onChange={(e) => setInfo({ ...info, description: e.target.value })}
        />
      </div>
      <button
        className="
              flex flex-row flex-wrap items-center justify-center
              gap-4 mt-4 mr-2 mb-2
              text-white bg-green-700 hover:bg-gradient-to-br
              focus:ring-4 focus:outline-none focus:ring-green-300
              font-medium rounded-lg text-sm px-5 py-2.5 text-center "
        type="submit"
        disabled={loading}
      >
        {loading ? "Guardando" : "Guardar"}
      </button>
    </form>
  );
}
