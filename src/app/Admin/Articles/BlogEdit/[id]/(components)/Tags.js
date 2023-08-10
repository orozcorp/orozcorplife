"use client";
import { AiOutlineClose } from "react-icons/ai";
import { postData } from "@/lib/helpers/getData";
const MUTATION = `
  mutation BlogRemoveTag($id: ID!, $tag: String!) {
    blogRemoveTag(_id: $id, tag: $tag) {
      code
      data
      message
      success
    }
  }
`;

export default function Tags({ _id, tag }) {
  const removeTag = async () => {
    await postData({
      query: MUTATION,
      variables: {
        id: _id,
        tag: tag,
      },
    });
  };
  return (
    <div
      onClick={removeTag}
      className="
    flex flex-row flex-nowrap items-center justify-center gap-2
    text-gray-900 bg-green-200 hover:bg-red-400 focus:ring-4 focus:outline-none focus:ring-cyan-300 shadow-sm shadow-cyan-500/50 font-medium rounded-lg text-xs px-5 py-2.5 text-center mr-2 mb-2"
    >
      {tag}
      <AiOutlineClose />
    </div>
  );
}
