import parse from "html-react-parser";
import ScrollTop from "../../../components/atoms/ScrollTop";
import { blogGetById } from "@/server/blog";
import OtherArticles from "./OtherArticles";

export async function generateMetadata({ params }) {
  const { id } = params;
  const blog = await blogGetById({ id });
  return {
    title: blog?.title,
    description: blog?.description,
    metadataBase: new URL(`https://orozcorp.io/Articles/${id}`),
    twitter: {
      card: "summary_large_image",
      title: blog?.title,
      creator: "@orozcorp_io",
    },
    robots: {
      index: true,
      follow: true,
      nocache: true,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      images: blog?.images?.map((image) => image.url),
      title: blog?.title,
      description: blog?.description,
      image: blog?.images?.[0]?.url,
      date: blog?.article?.publishedTime,
      type: "article",
      url: `https://orozcorp.io/Articles/${id}`,
      keywords: blog?.article?.tags,
      article: {
        publishedTime: blog?.article?.publishedTime,
        modifiedTime: blog?.article?.modifiedTime,
        expirationTime: blog?.article?.expirationTime,
        authors: blog?.article?.authors,
        tags: blog?.article?.tags,
      },
    },
  };
}
export default async function Article({ params }) {
  const { id } = params;
  const blog = await blogGetById({ id });
  return (
    <>
      <main className="flex flex-col flex-nowrap w-full justify-center items-center">
        <div className="flex flex-row flex-wrap p-4 w-full md:w-3/4 items-center justify-center">
          <div className="flex flex-col flex-nowrap w-full justify-start items-start "></div>
          <div className="flex flex-col flex-nowrap w-full justify-start items-start">
            <ScrollTop />
            <div className="my-16 w-full break-words text-justify">
              <h1 className="text-4xl font-bold my-6">{blog.title}</h1>
              <div className="my-6 flex flex-row flex-wrap gap-2">
                {blog?.article?.tags?.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              {parse(blog?.content || "")}
            </div>
          </div>
        </div>
      </main>
      <OtherArticles />
    </>
  );
}
