"use client";
import Image from "next/image";
import { useState } from "react";
import { rgbDataURL } from "@/lib/helpers/blur";
import dynamic from "next/dynamic";
const TrabajoModal = dynamic(() => import("./TrabajoModal"));
import { AspectRatio } from "@/components/ui/aspect-ratio";

export default function Trabajo({ trabajo }) {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };
  return (
    <>
      <div onClick={handleOpenModal}>
        <div className="w-[200px] h-[266px] rounded-lg shadow-xl cursor-pointer">
          <AspectRatio ratio={9 / 12}>
            <Image
              src={trabajo.url}
              alt={trabajo.url} // Assuming trabajo.title is a descriptive title of the image
              className="object-cover  rounded-lg shadow-xl cursor-pointer"
              loading="lazy"
              fill
              quality={1}
              placeholder="blur" // Utilize Next.js built-in blur placeholder
              blurDataURL={trabajo.blurDataURL || rgbDataURL(0, 0, 0)} // Assuming trabajo has a blurDataURL property
            />
          </AspectRatio>
        </div>
      </div>
      {isModalOpen && (
        <TrabajoModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          imageUrl={trabajo.url}
        />
      )}
    </>
  );
}
