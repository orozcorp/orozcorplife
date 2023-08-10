import { header } from "@/components/smallComponents/TextComponents";
import WriteArticle from "./(components)/WriteArticle";
const QUERY = `
  query GetPrompts {
    getPrompts {
      _id
      description
      prompt
    }
  }
`;
import { getData } from "@/lib/helpers/getData";
export default async function Articles() {
  const data = await getData({ query: QUERY });
  const prompts = data?.getPrompts?.map((prompt) => ({
    value: prompt._id,
    label: prompt.description,
    prompt: prompt.prompt,
  }));
  return (
    <>
      <h1 className={`${header({ size: "h1", color: "primary" })} mb-4`}>
        Articles
      </h1>
      <WriteArticle prompts={prompts} />
      <div className="overflow-x-auto shadow-md sm:rounded-lg my-8 w-full">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
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
          <tbody></tbody>
        </table>
      </div>
    </>
  );
}
