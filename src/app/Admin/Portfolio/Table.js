import { format_date } from "@/lib/helpers/formatters";
import Link from "next/link";
import { getData } from "@/lib/helpers/getData";
const QUERY = `
  query GetPortfolios {
    getPortfolios {
      _id
      active
      company
      date
      description
      images
      project
    }
  }
`;
export default async function Table() {
  const data = await getData({ query: QUERY });
  const portfolios = data?.getPortfolios;
  return (
    <div className="overflow-x-auto shadow-md sm:rounded-lg my-8 w-full">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              Project
            </th>
            <th scope="col" className="px-6 py-3">
              Company
            </th>
            <th scope="col" className="px-6 py-3">
              Description
            </th>
            <th scope="col" className="px-6 py-3">
              Date
            </th>
            <th scope="col" className="px-6 py-3">
              Active
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {portfolios?.map((portfolio) => (
            <tr
              className="bg-white border-b hover:bg-gray-50"
              key={portfolio?._id}
            >
              <td className="px-6 py-4">{portfolio?.description}</td>
              <td className="px-6 py-4">{portfolio?.company}</td>
              <td className="px-6 py-4 whitespace-pre-line">
                {portfolio?.description}
              </td>
              <td className="px-6 py-4">{format_date(portfolio?.date)}</td>
              <td className="px-6 py-4">
                {" "}
                <button
                  className={`${button({
                    color: portfolio?.active ? "primary" : "danger",
                  })}`}
                >
                  {portfolio?.active ? "active" : "inactive"}
                </button>
              </td>
              <td className="flex items-center px-6 py-4 space-x-3">
                <Link
                  href={`/Admin/Portfolio/${portfolio._id}`}
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Edit
                </Link>
                <a
                  href="#"
                  className="font-medium text-red-600 dark:text-red-500 hover:underline"
                >
                  Remove
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
