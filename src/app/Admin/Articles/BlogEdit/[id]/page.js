"use client";
import { getBlog } from "@/server/blog";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import CopyButton from "@/components/simpleFunctions/CopyButton";
import CopyText from "@/components/simpleFunctions/CopyText";
import BlogPost from "./Blog";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

export default function Blog({ params }) {
  const { id } = params;
  const { data: blog } = useQuery({
    queryKey: ["blog", id],
    queryFn: async () => await getBlog({ id }),
    staleTime: 0,
    intialData: {},
  });

  return (
    <div className="flex flex-row flex-wrap gap-3 justify-between">
      <div className="max-w-xl flex flex-col flex-nowrap gap-4">
        <CopyText
          text={`https://www.orozcorp.live/Articles/${id}`}
          buttonText="Copy URL"
        />
        <div className="flex flex-row flex-wrap gap-2">
          {blog?.image && (
            <Image
              src={blog.image}
              alt="Blog Image"
              width={200}
              height={200}
              className="rounded shadow-lg"
            />
          )}
          <div className="flex flex-row flex-wrap gap-2 flex-1">
            {blog?.tags?.map((tag, index) => (
              <Badge key={index}>{tag}</Badge>
            ))}
          </div>
          <Link
            href={blog?.image || "/"}
            target="_blank"
            download
            className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
          >
            Download Image
          </Link>
        </div>
        <div className="border p-3 shadow-lg rounded text-justify">
          <h2 className="text-2xl font-bold mb-4">Facebook Personal</h2>
          <p id="fbPersonal">{blog?.facebookPersonal}</p>
          <CopyButton
            elementId="fbPersonal"
            buttonText="Copy Fb Personal"
            className="my-4"
          />
        </div>
        <div className="border p-3 shadow-lg rounded text-justify">
          <h2 className="text-2xl font-bold mb-4">Facebook Business</h2>
          <p id="fbBusiness">{blog?.facebookBusiness}</p>
          <CopyButton
            elementId="fbBusiness"
            buttonText="Copy Fb Business"
            className="my-4"
          />
        </div>
      </div>
      <BlogPost blog={blog} />
      <div className="flex flex-row flex-wrap gap-2">
        <div className="max-w-2xl text-justify border p-3 shadow-lg rounded ">
          <h2 className="text-2xl font-bold mb-4">Instagram</h2>
          <p id="insta">{blog?.instagramPost}</p>
          <CopyButton
            elementId="insta"
            buttonText="Copy Insta"
            className="my-4"
          />
        </div>
        <div className="max-w-2xl text-justify border p-3 shadow-lg rounded ">
          <h2 className="text-2xl font-bold mb-4">Linked In</h2>
          <p id="linkedIn">{blog?.linkedInPost}</p>
          <CopyButton
            elementId="linkedIn"
            buttonText="Copy LinkedIn"
            className="my-4"
          />
        </div>
      </div>
    </div>
  );
}
