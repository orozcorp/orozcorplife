"use client";
import { useCallback, useState, useRef, useEffect } from "react";
import { useCompletion } from "ai/react";
import { AiOutlineFileText } from "react-icons/ai";
import { postData } from "@/lib/helpers/getData";
import { useRouter } from "next/navigation";
import Link from "next/link";
const MUTATION = `
  mutation Mutation($input: BlogInput!) {
    blogInsert(input: $input) {
      code
      message
      data
      success
    }
  }
`;
export default function Message({
  m,
  isLoading,
  title,
  _id,
  setErrorMutation,
  setErrorTags,
  setErrorContent,
}) {
  const chatContainerRef = useRef(null);
  const [status, setStatus] = useState("Starting");
  const [generating, setGenerating] = useState(false);
  const router = useRouter();
  const [loadingMutation, setLoadingMutation] = useState(false);
  const { complete, isLoading: loadingComp } = useCompletion({
    api: "/api/completion",
    id: m?.id,
    onError: (error) => {
      setErrorContent(error);
    },
  });
  const { complete: completeTags, isLoading: loadingTags } = useCompletion({
    api: "/api/completionTags",
    id: `${m?.id}-tags`,
    onError: (error) => {
      setErrorTags(error);
    },
  });
  const createBlog = useCallback(async () => {
    setGenerating(true);
    setStatus("Generating blog");
    const cblog = await complete(m?.content);
    if (!cblog) setErrorContent("Error al crear el blog");
    setStatus("Generating tags");
    const cblogTags = await completeTags(title);
    if (!cblogTags) setErrorTags("Error al crear el blog");
    const finalSchema = JSON.parse(cblogTags);
    const blog = {
      ...finalSchema,
      content: cblog,
      chatId: _id,
      messageId: m?.id,
    };
    setStatus("Inserting blog");
    try {
      const data = await postData({
        query: MUTATION,
        variables: {
          input: blog,
        },
      });
      setLoadingMutation(false);
      setGenerating(false);
      if (data?.blogInsert?.success)
        router.push(`/Admin/Articles/BlogEdit/${data.blogInsert.data}`);
      else
        setErrorMutation(data.blogInsert.message || "Error al crear el blog");
    } catch (error) {
      setLoadingMutation(false);
      setErrorMutation(error.message);
    }
  }, [
    _id,
    complete,
    completeTags,
    m?.content,
    m?.id,
    router,
    setErrorContent,
    setErrorMutation,
    setErrorTags,
    title,
  ]);
  useEffect(() => {
    if (!generating) return;
    // Scroll the chat container to the bottom whenever messages change
    chatContainerRef.current.scrollTop =
      chatContainerRef.current.scrollHeight + 10;
  }, [generating]);
  return (
    <div
      key={m?.id}
      className={`p-2 m-1 whitespace-pre-line flex flex-col flex-nowrap max-w-xl w-fit  ${
        m?.role === "user"
          ? "text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 shadow-lg shadow-blue-500/50 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 text-justify self-end"
          : m?.role === "system"
          ? "hidden"
          : "text-black border border-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 text-left self-start"
      }`}
      ref={chatContainerRef}
    >
      {m?.role === "user" ? "User: " : "AI: "}
      <p className="whitespace-pre-line">{m?.content}</p>
      {m?.transformedToBlog ? (
        <Link
          href={`Admin/Articles/BlogEdit/${m?.blogCreated}`}
          className="
            mt-4
            self-start
            bg-yellow-100 text-yellow-800 text-lg font-medium mr-2 px-3.5 py-0.5 rounded"
        >
          Ir a blog creado
        </Link>
      ) : (
        <>
          {m?.role === "assistant" && !isLoading && (
            <>
              {loadingComp || loadingTags || loadingMutation ? (
                <>
                  <button
                    className="
                      flex flex-row flex-wrap justify-center items-center
                      self-start cursor-pointer mt-4 border
                      hover:bg-yellow-800 hover:text-white bg-yellow-100 text-yellow-600 border-yellow-400
                      text-sm font-medium mr-2 px-3.5 py-2 rounded
                      "
                  >
                    <>
                      <div role="status">
                        <svg
                          aria-hidden="true"
                          className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-yellow-400"
                          viewBox="0 0 100 101"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                          />
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                          />
                        </svg>
                        <span>{status}</span>
                      </div>
                    </>
                  </button>
                </>
              ) : (
                <>
                  <button
                    disabled={loadingComp || loadingTags || loadingMutation}
                    onClick={createBlog}
                    className="
                        flex flex-row flex-wrap justify-center items-center
                        self-start cursor-pointer mt-4 border
                        hover:bg-green-800 hover:text-white bg-green-100 text-green-800 border-green-400
                        text-sm font-medium mr-2 px-3.5 py-2 rounded
                    "
                  >
                    <AiOutlineFileText style={{ marginRight: "8px" }} />
                    Crear Blog
                  </button>
                </>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}
