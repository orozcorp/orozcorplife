const QUERY = `
  query BlogGetAll($limit: Int) {
    blogGetAll(limit: $limit) {
      _id
      description
      title
      images {
        url
      }
    }
  }
`;
import { header } from "@/components/smallComponents/TextComponents";
import dynamic from "next/dynamic";
const BlogSingle = dynamic(() => import("../(components)/BlogSingle"), {
  ssr: false,
});
import { getData } from "@/lib/helpers/getData";
export default async function Index() {
  const data = await getData({ query: QUERY, variables: { limit: 1000 } });
  const blogs = data?.blogGetAll || [];
  return (
    <div>
      <h2 className={`${header({ size: "h1", color: "primary" })} mb-8`}>
        Blog Entries
      </h2>
      <div className="flex flex-row flex-wrap items-stretch justify-start w-full h-full my-2 gap-8">
        {blogs?.map((blog) => (
          <BlogSingle blog={blog} key={blog?._id} />
        ))}
      </div>
    </div>
  );
}
