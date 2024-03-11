"use client";
import { useState } from "react";
import Image from "next/image";
import { format_date } from "@/lib/helpers/formatters";
import { rgbDataURL } from "@/lib/helpers/blur";
export default function Timeline({ timeline }) {
  const [clicked, setClicked] = useState("");
  return (
    <div className="p-5 mb-4 w-80 md:w-full border border-gray-100 rounded-lg bg-gray-50my-8">
      <time className="text-lg font-semibold text-gray-900 dark:text-white">
        {format_date(timeline?.dateStarted)} -{" "}
        {format_date(timeline?.dateEnded)}
      </time>
      <div className="flex flex-row flex-wrap justify-start items-center">
        <Image
          className="w-12 h-12 mb-3 mr-3 rounded-full sm:mb-0 object-cover object-center aspect-square"
          src={timeline?.logo}
          alt={timeline?.company}
          width={48}
          height={48}
          blurDataURL={rgbDataURL(0, 0, 0)}
          loading="lazy"
        />
        <div className="text-base font-normal">
          <span className="font-medium text-2xl text-gray-900 dark:text-white">
            {timeline?.company}
          </span>{" "}
        </div>
      </div>
      <ol className="mt-3 divide-y divider-gray-200 dark:divide-gray-700">
        {timeline?.activity?.map((item, index) => (
          <li
            key={index}
            onClick={() => setClicked(clicked === index ? "" : index)}
          >
            <div className="items-center cursor-pointer block p-3 sm:flex hover:bg-gray-100 dark:hover:bg-gray-700">
              <div className="text-gray-600  w-full">
                <div className="text-base font-normal flex flex-row flex-wrap w-full justify-between">
                  {" "}
                  <div>{item?.position}</div>
                  <span className="font-medium text-gray-900 text-sm">
                    {format_date(item?.dateStarted)} -{" "}
                    {format_date(item?.dateEnded)}
                  </span>
                </div>
                {clicked === index && (
                  <div
                    className="text-sm font-normal my-4"
                    style={{ whiteSpace: "pre-line" }}
                  >
                    {item.activityDetail}
                  </div>
                )}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
