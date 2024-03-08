import parse from "html-react-parser";
import Head from "next/head";
import { getData } from "@/lib/helpers/getData";
const QUERY = `
  query BlogGetById($id: ID!) {
    blogGetById(_id: $id) {
      _id
      article {
        tags
        publishedTime
        modifiedTime
        expirationTime
        authors
      }
      content
      description
      images {
        alt
        height
        url
        width
      }
      title
    }
  }
`;
export default async function Article({ params }) {
  const { id } = params;
  const data = await getData({ query: QUERY, variables: { id } });
  const blog = data?.blogGetById || {};
  return (
    <>
      <Head>
        <title>{blog?.title}</title>
        <meta name="description" content={blog?.description} />
      </Head>

      <main className="flex flex-col flex-nowrap w-full justify-center items-center">
        <div className="flex flex-row flex-wrap p-4 w-full md:w-3/4 items-center justify-center">
          <div className="flex flex-col flex-nowrap w-full justify-start items-start">
            <div className="my-16 w-full break-words text-justify">
              {parse(blog?.content || "")}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
