import { header } from "@/components/smallComponents/TextComponents";
import WriteArticle from "./(components)/WriteArticle";
import Link from "next/link";
const QUERY = `
  query GetPrompts($limit: Int) {
    getPrompts {
      _id
      description
      prompt
    }
     blogGetAll(limit: $limit){
      _id
      description
      title
      status
      article{
        tags
      }
      images {
        url
      }
    }
  }
`;

import { getData } from "@/lib/helpers/getData";
export default async function Articles() {
  const data = await getData({ query: QUERY, variables: { limit: 1000 } });
  const prompts = data?.getPrompts?.map((prompt) => ({
    value: prompt._id,
    label: prompt.description,
    prompt: prompt.prompt,
  }));
  const blogs = data?.blogGetAll || [];
  return (
    <>
      <h1 className={`${header({ size: "h1", color: "primary" })} mb-4`}>
        Articles
      </h1>
      <div className="flex flex-row flex-wrap w-full justify-between items-center">
        <WriteArticle prompts={prompts} />
      </div>
      <div className="overflow-x-auto shadow-md sm:rounded-lg my-8 w-full">
        <table className="w-full text-sm text-left text-zinc-500">
          <thead className="text-xs text-zinc-900 uppercase bg-zinc-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Tags
              </th>
              <th scope="col" className="px-6 py-3">
                Estatus
              </th>
              <th scope="col" className="px-6 py-3">
                Has Img
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {blogs?.map((blog) => (
              <tr key={blog._id} className="border-b border-zinc-200">
                <td className="px-6 py-4">{blog.title}</td>
                <td className="px-6 py-4 ">{blog.description}</td>
                <td className="px-6 py-4 ">{blog.article.tags?.join(", ")}</td>
                <td className="px-6 py-4 ">{blog.status}</td>
                <td className="px-6 py-4 ">
                  {blog.images?.length > 0 ? "Yes" : "No"}
                </td>
                <td className="px-6 py-4 ">
                  <Link
                    className="text-blue-500 hover:text-blue-700"
                    href={`/Admin/Articles/BlogEdit/${blog._id}`}
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
