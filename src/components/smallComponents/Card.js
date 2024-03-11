import Link from "next/link";
export default function Card({ img, title, description, link }) {
  return (
    <div className="w-80 bg-white border  rounded-lg shadow-md shadow-zinc-800">
      <div className="flex items-center justify-between px-5  h-full">
        <div className="p-2 flex flex-col flex-nowrap h-full justify-between">
          <Link href={link}>
            <h3 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
              {title}
            </h3>
          </Link>
          <div>
            <p className="font-normal text-gray-700 ">{description}</p>
            <Link
              href={link}
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-zinc-800 rounded-lg hover:bg-zinc-800 focus:ring-4 focus:outline-none focus:ring-zinc-300"
            >
              Read more about this article
              <svg
                className="w-3.5 h-3.5 ml-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
