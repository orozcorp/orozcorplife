"use client";
import { useState } from "react";
import parse from "html-react-parser";
import { Button } from "@/components/ui/button";
import BlogEdit from "./BlogEdit";
export default function BlogPost({ blog }) {
  const [edit, setEdit] = useState(false);
  return (
    <div className="flex-1 text-justify border p-3 shadow-lg rounded ">
      {edit ? (
        <BlogEdit blog={blog} setEdit={setEdit} />
      ) : (
        <>
          <h2 className="text-2xl font-bold mb-4">Blog</h2>
          <h3 className="text-xl font-bold mb-4">{blog?.title}</h3>
          <h4 className="text-md font-bold mb-4">{blog?.description}</h4>
          <Button onClick={() => setEdit(!edit)} className="my-4 w-full">
            {" "}
            Edit
          </Button>
          {parse(blog?.content || "")}
        </>
      )}
    </div>
  );
}
