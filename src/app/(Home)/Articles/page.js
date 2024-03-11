import { header } from "@/components/smallComponents/TextComponents";
import Card from "@/components/smallComponents/Card";

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
import { getData } from "@/lib/helpers/getData";
export default async function Articles() {
  const data = await getData({ query: QUERY, variables: { limit: 12 } });
  const blogs = data?.blogGetAll || [];
  return (
    <div
      className=" flex flex-col flex-nowrap justify-center items-center w-full mt-12"
      id="articles"
    >
      <div className="font-thin">MOST POPULAR</div>
      <h2 className={header({ size: "h1", color: "primary" })}>ARTICLES</h2>
      <div className="flex flex-row flex-wrap w-screen justify-center md:justify-between items-stretch content-center p-4 my-4 gap-4">
        {blogs?.map((blog) => (
          <Card
            key={blog._id}
            img={blog?.images[0]?.url || ""}
            link={`/Articles/${blog._id}`}
            title={blog.title}
            description={blog.description}
          />
        ))}
      </div>
    </div>
  );
}
