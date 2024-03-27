import { header } from "@/components/smallComponents/TextComponents";
import Card from "@/components/smallComponents/Card";
import { blogGetAll } from "../actions/home";
import { Suspense } from "react";
export default async function Articles() {
  const blogs = (await blogGetAll({ limit: 12 })) || [];
  return (
    <div
      className=" flex flex-col flex-nowrap justify-center items-center w-full mt-12"
      id="articles"
    >
      <div className="font-thin">MOST POPULAR</div>
      <h2 className={header({ size: "h1", color: "primary" })}>ARTICLES</h2>
      <div className="flex flex-row flex-wrap w-screen justify-center md:justify-between items-stretch content-center p-4 my-4 gap-4">
        <Suspense fallback={<div>Loading articles...</div>}>
          {blogs?.map((blog) => (
            <Card
              key={blog._id}
              img={blog?.images[0]?.url || ""}
              link={`/Articles/${blog._id}`}
              title={blog.title}
              description={blog.description}
            />
          ))}
        </Suspense>
      </div>
    </div>
  );
}
