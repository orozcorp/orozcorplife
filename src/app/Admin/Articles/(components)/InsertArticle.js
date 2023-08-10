"use client";
import SearchableSelect from "../../../../components/smallComponents/SearchableSelect";
import Modal from "../../../../components/smallComponents/Modal";
import { useState } from "react";
import Alert from "@/components/smallComponents/Alert";
import { useRouter } from "next/navigation";
import { postData } from "@/lib/helpers/getData";
const MUTATION = `
  mutation ChatInsert($title: String!, $prompt: String!) {
    chatInsert(title: $title, prompt: $prompt) {
      code
      data
      message
      success
    }
  }
`;
export default function InsertArticle({ prompts, title, display, setDisplay }) {
  const [titleBlog, setTitleBlog] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const [prompt, setPrompt] = useState({
    value: "",
    label: "Select a prompt",
    prompt: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await postData({
        query: MUTATION,
        variables: { title: titleBlog, prompt: prompt.prompt },
      });
      setLoading(false);
      if (res.chatInsert.success) {
        setDisplay("none");
        router.push(`/Admin/Articles/Chat/${res.chatInsert.data}`);
      } else {
        setError(res.chatInsert.message);
      }
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };
  return (
    <Modal title={title} display={display} setDisplay={setDisplay}>
      <form onSubmit={handleSubmit}>
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="text"
            className="block text-left py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
            value={titleBlog}
            onChange={(e) => setTitleBlog(e.target.value)}
          />
          <label
            htmlFor="Title"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Title
          </label>
        </div>
        <SearchableSelect
          options={prompts}
          value={prompt}
          onChange={(e) => setPrompt(e)}
        />
        <button className=" my-8 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 ">
          {loading ? "Starting.... " : "Start brainstorming"}
        </button>
      </form>
      {error && (
        <div
          className={`p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100`}
          role="alert"
        >
          <span className="font-medium">Error</span> {error}
        </div>
      )}
    </Modal>
  );
}
