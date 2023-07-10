"use client";
import { format_date } from "@/lib/helpers/formatters";
import { getData } from "@/lib/helpers/getData";
import { button } from "@/components/smallComponents/ButtonComponents";
import Link from "next/link";
const QUERY = `
  query GetResume {
    getResume {
      active
      company
      dateEnded
      dateStarted
      _id
    }
  }
`;

export default async function Table() {
  const query = await getData({ query: QUERY });
  return (
    <div className="overflow-x-auto shadow-md sm:rounded-lg my-8 w-full">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              Date
            </th>
            <th scope="col" className="px-6 py-3">
              Company
            </th>
            <th scope="col" className="px-6 py-3">
              Is Active
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {query?.getResume?.map((resume) => (
            <tr className="bg-white border-b hover:bg-gray-50" key={resume._id}>
              <td className="px-6 py-4">{`${format_date(
                resume?.dateStarted
              )} a ${format_date(resume?.dateEnded)}`}</td>
              <td className="px-6 py-4">{resume?.company}</td>
              <td className="px-6 py-4">
                <button
                  className={`${button({
                    color: resume?.active ? "primary" : "danger",
                  })}`}
                >
                  {resume?.active ? "active" : "inactive"}
                </button>
              </td>
              <td className="flex flex-row flex-wrap justify-between items-center w-full px-6 py-4">
                <Link
                  href={`/Admin/Resume/${resume._id}`}
                  className="font-medium text-blue-600 hover:underline"
                >
                  Edit
                </Link>
                <div className="font-medium text-red-600 hover:underline">
                  Remove
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
