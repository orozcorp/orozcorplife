import { header } from "@/components/smallComponents/TextComponents";
import { button } from "@/components/smallComponents/ButtonComponents";

export default function Resume() {
  return (
    <>
      <h1 className={`${header({ size: "h1", color: "primary" })} mb-4`}>
        Resume
      </h1>
      <button className={`${button({ color: "primary", fontSize: "medium" })}`}>
        Add to Resume
      </button>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-8">
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
                Position
              </th>
              <th scope="col" className="px-6 py-3">
                Activity
              </th>
              <th scope="col" className="px-6 py-3">
                Detail
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
            <tr className="bg-white border-b hover:bg-gray-50">
              <td className="px-6 py-4">Apple MacBook Pro 17</td>
              <td className="px-6 py-4">Silver</td>
              <td className="px-6 py-4">Laptop</td>
              <td className="px-6 py-4">Yes</td>
              <td className="px-6 py-4">3.0 lb.</td>
              <td className="flex items-center px-6 py-4 space-x-3">
                <a
                  href="#"
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Edit
                </a>
                <a
                  href="#"
                  className="font-medium text-red-600 dark:text-red-500 hover:underline"
                >
                  Remove
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
