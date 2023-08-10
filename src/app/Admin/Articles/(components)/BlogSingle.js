import Image from "next/image";
import Link from "next/link";

export default function BlogSingle({ blog }) {
  return (
    <div className="w-80 bg-white border border-gray-200 rounded-lg shadow flex flex-col flex-nowrap justify-between items-center">
      <Link href={`/Admin/Articles/BlogEdit/${blog?._id}`}>
        <Image
          className="rounded-t-lg"
          src={blog?.images[0]?.url}
          alt=""
          width={300}
          height={300}
        />
      </Link>
      <div className="p-5 flex flex-col flex-nowrap justify-start content-between items-between">
        <Link href={`/Admin/Articles/BlogEdit/${blog?._id}`}>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
            {blog?.title}
          </h5>
        </Link>
        <p className="mb-3 font-normal text-gray-700">{blog?.description}</p>
        <Link
          href={`/Admin/Articles/BlogEdit/${blog?._id}`}
          className="inline-flex self-start items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 "
        >
          Editar
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
  );
}
