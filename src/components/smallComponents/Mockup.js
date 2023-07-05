import Image from "next/image";
import Link from "next/link";
export default function Mockup({ img, title, description, link }) {
  return (
    <div className="flex flex-col flex-nowrap justify-center items-center my-4">
      <div className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-xl">
        <div className="w-[148px] h-[18px] bg-gray-800 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute"></div>
        <div className="h-[46px] w-[3px] bg-gray-800 absolute -left-[17px] top-[124px] rounded-l-lg"></div>
        <div className="h-[46px] w-[3px] bg-gray-800 absolute -left-[17px] top-[178px] rounded-l-lg"></div>
        <div className="h-[64px] w-[3px] bg-gray-800 absolute -right-[17px] top-[142px] rounded-r-lg"></div>
        <div className="rounded-[2rem] overflow-hidden w-[272px] h-[572px] bg-white dark:bg-gray-800">
          <Image
            src={img}
            className="w-[272px] h-[572px]"
            width={272}
            height={572}
            alt={title}
          />
        </div>
      </div>
      <div className="my-4">{description}</div>
      <Link
        href={link}
        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-zinc-400 rounded-lg hover:bg-zinc-800 focus:ring-4 focus:outline-none focus:ring-zinc-300 dark:bg-zinc-600 dark:hover:bg-zinc-700 dark:focus:ring-zinc-800"
      >
        learn more
      </Link>
    </div>
  );
}
