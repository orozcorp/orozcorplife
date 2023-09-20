import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col flex-nowrap justify-center items-center w-full h-[90vh]">
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link
        href="/"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Return Home
      </Link>
    </div>
  );
}
