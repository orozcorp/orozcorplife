import { blogGetAll } from "@/server/blog";
import Link from "next/link";

export default async function OtherArticles() {
  const blogs = (await blogGetAll({ limit: 4 })) || [];
  return (
    <div className="w-full bg-black text-white mt-12 p-12">
      <div className="text-3xl text-center">Tips para mejorar tu </div>
      <h2 className="text-6xl font-bold mb-12 text-center">Negocio</h2>
      <div className="flex flex-col lg:flex-row flex-nowrap lg:flex-wrap gap-4 w-full mt-12 justify-center lg:justify-between items-center lg:items-stretch">
        {blogs.map((blog) => (
          <Link
            href={`/Articles/${blog?._id}`}
            key={blog?._id}
            className="border border-zinc-400 p-4 w-72 min-h-72 shadow-md rounded-md flex flex-col flex-nowrap justify-start items-start gap-4 hover:border-zinc-600 hover:bg-zinc-600 hover:text-white hover:shadow-xl"
          >
            <h2 className="text-2xl font-bold">{blog?.title}</h2>
            <p>{blog?.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
