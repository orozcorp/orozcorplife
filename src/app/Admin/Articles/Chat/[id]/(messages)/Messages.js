"use client";
import { useChat } from "ai/react";
import { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { postData } from "@/lib/helpers/getData";
import Toast from "@/components/smallComponents/Toast";
import Message from "./Message";
import ErrorElement from "@/components/smallComponents/ErrorElement";
const MUTATION = `
  mutation ChatUpdate($id: ID!, $message: MessageInput!) {
    chatUpdate(_id: $id, message: $message) {
      code
      data
      message
      success
    }
  }
`;
export default function Chat({
  id,
  prompt,
  title,
  messages: initialMessages2,
}) {
  const [errorMutation, setErrorMutation] = useState("");
  const [errorTags, setErrorTags] = useState("pending");
  const [errorContent, setErrorContent] = useState("");
  const chatContainerRef = useRef(null);
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      id,
      initialMessages: [
        {
          role: "system",
          content: prompt,
          id: uuidv4(),
          createdAt: new Date(),
        },
        {
          role: "user",
          content: `Please write a summary about '${title}'. The summary should be from the perspective of an experienced entrepreneur addressing young entrepreneurs of small companies. Focus on a logical and clear tone, aiming to simplify complex IT concepts for a mainstream audience. Ensure that the summary is accessible and easy to understand, breaking down technical jargon into simpler terms where necessary`,
          id: uuidv4(),
          createdAt: new Date(),
        },
        {
          role: "assistant",
          id: uuidv4(),
          content: "Give me the content to summarize",
          createdAt: new Date(),
        },
        ...initialMessages2,
      ],
      onFinish: async (message) => {
        try {
          const save = await postData({
            query: MUTATION,
            variables: {
              id,
              message,
            },
          });
          if (!save.chatUpdate.success) {
            setErrorMutation(save.chatUpdate.message);
          } else {
            setErrorMutation("");
          }
        } catch (err) {
          setErrorMutation(err.message);
        }
      },
    });
  useEffect(() => {
    // Scroll the chat container to the bottom whenever messages change
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, [messages]);
  return (
    <>
      {errorTags !== "pending" && (
        <Toast message={errorTags} onClick={() => setErrorTags("pending")} />
      )}
      {errorContent !== "" && (
        <Toast message={errorContent} onClick={() => setErrorContent("")} />
      )}
      {errorMutation !== "" && (
        <Toast message={errorMutation} onClick={() => setErrorMutation("")} />
      )}
      <div
        ref={chatContainerRef}
        className="flex flex-col flex-nowrap justify-start overflow-y-auto w-full self-start h-full"
      >
        {messages.map((m) => (
          <Message
            key={m.id}
            m={m}
            isLoading={isLoading}
            title={title}
            _id={id}
            setErrorMutation={setErrorMutation}
            setErrorTags={setErrorTags}
            setErrorContent={setErrorContent}
          />
        ))}
      </div>
      <form
        onSubmit={handleSubmit}
        className="self-end w-full flex flex-row mt-4"
      >
        <label htmlFor="chat" className="sr-only">
          Your message
        </label>
        <div className="flex items-center px-3 py-2 rounded-lg bg-gray-50 w-full">
          <textarea
            rows="1"
            className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Your message..."
            required
            value={input}
            onChange={handleInputChange}
          />
          <button
            type="submit"
            className="m-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
            disabled={isLoading}
          >
            {isLoading ? (
              "Responding"
            ) : (
              <>
                <svg
                  className="w-5 h-5 rotate-90"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 20"
                >
                  <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
                </svg>
                <span className="sr-only">Send message</span>
              </>
            )}
          </button>
        </div>
      </form>
    </>
  );
}
