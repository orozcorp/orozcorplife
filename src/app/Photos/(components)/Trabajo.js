"use client";
import Image from "next/image";
import { rgbDataURL } from "@/lib/helpers/blur";
export default function Trabajo({ trabajo }) {
  return (
    <div>
      <Image
        src={trabajo.url}
        width={200}
        height={200}
        alt={trabajo.url}
        className="h-auto max-w-md rounded-lg shadow-xl"
        loading="lazy"
        quality={50}
        blurDataURL={rgbDataURL(0, 0, 0)}
      />
    </div>
  );
}
