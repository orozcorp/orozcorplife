"use client";
import Image from "next/image";
import { useState } from "react";
import { rgbDataURL } from "@/lib/helpers/blur";
import dynamic from "next/dynamic";
const TrabajoModal = dynamic(() => import("./TrabajoModal"));

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
        <Image
          src={trabajo.url}
          width={200}
          height={200}
          alt={trabajo.url}
          className="h-auto max-w-md rounded-lg shadow-xl cursor-pointer"
          loading="lazy"
          formats={["webp", "jpeg"]}
          quality={10}
          blurDataURL={rgbDataURL(0, 0, 0)}
        />
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
