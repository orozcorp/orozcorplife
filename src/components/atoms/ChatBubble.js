"use client";
import React, { useCallback, useRef, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format_dateHr } from "@/lib/helpers/formatters";
import { useBlog } from "../../providers/blogProvider";
import { generateImage } from "./actions/createImage";
import { saveToDBBlog } from "./actions/createImage";
import { useCompletion } from "ai/react";
import { useRouter } from "next/navigation";
function ChatMessage({ m, firstContent, isLoading }) {
  const { role, content, createdAt } = m;
  const { blogData, setBlogData } = useBlog();
  const chatContainerRef = useRef(null);
  const router = useRouter();
  useEffect(() => {
    if (blogData.loadingGenerating) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight + 10;
    }
  }, [blogData.loadingGenerating]);
  const { complete: generateBlog } = useCompletion({ api: "/api/completion" });
  const { complete: generateBlogTags } = useCompletion({
    api: "/api/completionTags",
  });
  const { complete: generateFacebookBusiness } = useCompletion({
    api: "/api/facebookBusiness",
  });
  const { complete: generateFacebookPersonal } = useCompletion({
    api: "/api/facebookPersonal",
  });
  const { complete: generateInstagramPost } = useCompletion({
    api: "/api/instagramPost",
  });
  const { complete: generateLinkedInPost } = useCompletion({
    api: "/api/linkedInPost",
  });
  const { complete: generateImagePrompt } = useCompletion({
    api: "/api/imagePrompt",
  });
  const createBlog = useCallback(async () => {
    setBlogData((prevState) => ({
      ...prevState,
      loadingGeneralState: true,
      loadingGenerating: true,
      generativeState: "Generating Blog",
    }));

    try {
      const actions = [
        {
          complete: generateBlog,
          state: "Generating Blog",
        },
        {
          complete: generateBlogTags,
          state: "Generating Blog Tags",
        },
        {
          complete: generateFacebookBusiness,
          state: "Generating Facebook Business",
        },
        {
          complete: generateFacebookPersonal,
          state: "Generating Facebook Personal",
        },
        {
          complete: generateInstagramPost,
          state: "Generating Instagram Post",
        },
        {
          complete: generateLinkedInPost,
          state: "Generating LinkedIn Post",
        },
        {
          complete: generateImagePrompt,
          state: "Generating Image Prompt",
        },
      ];

      let results = {};
      for (const action of actions) {
        const result = await action.complete(content);
        setBlogData((prevState) => ({
          ...prevState,
          generativeState: action.state,
        }));
        results[action.state] = result;
      }
      const tags = JSON.parse(results["Generating Blog Tags"]);
      const blogId = await saveToDBBlog({
        input: {
          blog: results["Generating Blog"],
          image,
          facebookBusiness: results["Generating Facebook Business"],
          facebookPersonal: results["Generating Facebook Personal"],
          instagramPost: results["Generating Instagram Post"],
          linkedInPost: results["Generating LinkedIn Post"],
          ...tags,
        },
        imagePrompt: results["Generating Image Prompt"],
      });
      router.push(`/Admin/Articles/BlogEdit/${blogId}`);
    } catch (error) {
      console.log("Error in createBlog", error);
      setBlogData((prevState) => ({
        ...prevState,
        loadingGeneralState: false,
        loadingGenerating: false,
        error: error.message,
        message: "There was an error generating the blog",
      }));
    }
  }, [
    content,
    generateBlog,
    generateBlogTags,
    generateFacebookBusiness,
    generateFacebookPersonal,
    generateImagePrompt,
    generateInstagramPost,
    generateLinkedInPost,
    router,
    setBlogData,
  ]);

  const avatar =
    role === "user"
      ? "https://s3.amazonaws.com/stgfinal/mensajes/BFKQuMxLcF5HDxb9v/1616334156061-790BDD13-A03A-4EF4-94E8-DB239ECC2AEC.jpeg"
      : "https://orozcorp.s3.us-east-2.amazonaws.com/plasma/orozcorp_a_humanoid_AI_asistent_designed_for_a_ligthing_store_l_b41563a1-2152-46a1-a36b-2d4a9ab381d8.jpg";

  return (
    <div
      className={`flex items-start gap-2.5 ${
        role === "user" ? "self-start" : "self-end"
      }`}
      ref={chatContainerRef}
    >
      <Avatar>
        <AvatarImage src={avatar} />
        <AvatarFallback>{role[0]}</AvatarFallback>
      </Avatar>
      <div
        className={`${
          role === "user"
            ? "border-gray-200 bg-gray-100"
            : "border-slate-700 bg-slate-700"
        } flex flex-col w-fit max-w-[70%] leading-1.5 p-4 rounded-e-xl rounded-es-xl shadow-2xl shadow-slate-500`}
      >
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <span
            className={`${
              role === "user" ? "text-gray-900" : "text-white"
            } text-sm font-semibold`}
          >
            {role}:
          </span>
          <span
            className={`${
              role === "user" ? "text-gray-500" : "text-slate-200"
            } text-sm font-normal`}
          >
            {format_dateHr(createdAt)}
          </span>
        </div>
        <p
          className={`${
            role === "user" ? "text-gray-900 whitespace-pre-wrap" : "text-white"
          } text-sm font-normal py-2.5`}
        >
          {content}
        </p>
        {!firstContent && role !== "user" && !isLoading && (
          <button
            onClick={createBlog}
            disabled={blogData.generativeState !== "chat"}
            className={`bg-slate-600 p-2 rounded text-white hover:bg-slate-900 ${
              blogData.generativeState !== "chat"
                ? "cursor-not-allowed animate-pulse"
                : "cursor-pointer"
            }`}
          >
            {blogData.generativeState === "chat"
              ? "Create Blog"
              : blogData.generativeState}
          </button>
        )}
      </div>
    </div>
  );
}

export default ChatMessage;
