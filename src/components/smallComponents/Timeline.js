import Image from "next/image";
export default function Timeline({ date, activity }) {
  return (
    <div className="p-5 mb-4 w-80 border border-gray-100 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
      <time className="text-lg font-semibold text-gray-900 dark:text-white">
        {date}
      </time>
      <ol className="mt-3 divide-y divider-gray-200 dark:divide-gray-700">
        {activity?.map((item, index) => (
          <li key={index}>
            <a
              href="#"
              className="items-center block p-3 sm:flex hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Image
                className="w-12 h-12 mb-3 mr-3 rounded-full sm:mb-0"
                src={item.logo}
                alt={item.company}
                width={48}
                height={48}
              />
              <div className="text-gray-600 dark:text-gray-400">
                <div className="text-base font-normal">
                  <span className="font-medium text-gray-900 dark:text-white">
                    {item.company}
                  </span>{" "}
                  <span className="font-medium text-gray-900 dark:text-white">
                    {item.position}
                  </span>
                </div>
                <div className="text-sm font-normal">{item.activity}</div>
              </div>
            </a>
          </li>
        ))}
      </ol>
    </div>
  );
}
