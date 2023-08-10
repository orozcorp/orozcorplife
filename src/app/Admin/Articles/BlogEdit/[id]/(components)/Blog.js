"use client";
import dynamic from "next/dynamic";
const MUTATION = `mutation BlogUpdateContent($id: ID!, $content: String!) {
    blogUpdateContent(_id: $id, content: $content) {
      code
      data
      message
      success
    }
  }`;
const toolbarOptions = {
  toolbar: [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction

    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["link", "image", "video", "formula"], // add's image support
    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],

    ["clean"], // remove formatting button
  ],
};
const QUERY = `
  query BlogGetById($id: ID!) {
    blogGetById(_id: $id) {
      _id
      article {
        authors
        expirationTime
        modifiedTime
        publishedTime
        tags
      }
      awsLambda
      content
      description
      imagePrompt
      images {
        alt
        height
        url
        width
      }
      promptIdeas
      status
      title
    }
  }
`;
import { useRouter } from "next/navigation";
import useQuery from "../../../../../../components/hooks/useQuery";
import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false, // Prevent rendering during server-side rendering
});
import "react-quill/dist/quill.snow.css";
import { postData } from "../../../../../../lib/helpers/getData";
import AddPhotoToBlog from "./AddPhotoToBlog";
import TitleDescription from "./TitleDescription";
import Tags from "./Tags";

export default function Blog({ id }) {
  const variables = useMemo(() => ({ id }), [id]);
  const router = useRouter();
  const { loading: loadingQ, error, data } = useQuery(QUERY, variables, 10000);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState(data?.blogGetById?.content);
  const [isQuillLoaded, setIsQuillLoaded] = useState(false);
  const blogData = useMemo(() => data?.blogGetById, [data?.blogGetById]);
  useEffect(() => {
    if (blogData?.content) {
      setContent(blogData.content);
    }
  }, [blogData?.content]);
  useEffect(() => {
    if (content && !isQuillLoaded) {
      setIsQuillLoaded(true);
    }
  }, [content, isQuillLoaded]);
  const blogUpdateContent = async () => {
    setLoading(true);
    const response = await postData({
      query: MUTATION,
      variables: {
        id,
        content,
      },
    });
    setLoading(false);
    router.push(`/Admin/Articles/Blog`);
  };

  if (!content) return <div>Loading</div>;
  return (
    <>
      <TitleDescription
        id={id}
        title={blogData?.title}
        description={blogData?.description}
        tags={blogData?.article?.tags}
      />
      {blogData?.images?.length > 0 && (
        <Image
          src={blogData.images[0]?.url}
          width={200}
          height={200}
          alt={blogData.images[0]?.alt}
        />
      )}
      <div className="flex flex-row flex-wrap items-start justify-start gap-2 my-4">
        {blogData?.article?.tags?.map((tag, index) => (
          <Tags key={index} _id={id} tag={tag} />
        ))}
      </div>
      <AddPhotoToBlog id={id} title={blogData?.title} />
      {typeof window !== "undefined" && isQuillLoaded && (
        <ReactQuill
          theme="snow"
          value={content}
          onChange={setContent}
          modules={toolbarOptions}
        />
      )}
      <button
        onClick={blogUpdateContent}
        className="my-8 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
      >
        {loading ? "Guardando" : "Guardar y publicar"}
      </button>
    </>
  );
}
