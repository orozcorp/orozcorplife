"use client";
import { useState, useEffect, useRef } from "react";
import Mockup from "@/components/smallComponents/Mockup";

export default function Carousel({ images, title }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);

  useEffect(() => {
    if (images && images.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [images]);

  useEffect(() => {
    const carouselElement = carouselRef.current;
    if (carouselElement) {
      const maxScrollLeft =
        carouselElement.scrollWidth - carouselElement.clientWidth;
      if (currentIndex === images.length) {
        setCurrentIndex(0);
        carouselElement.scrollTo({ left: 0, behavior: "auto" });
      } else {
        carouselElement.scrollTo({
          left: currentIndex * carouselElement.offsetWidth,
          behavior: "smooth",
        });
      }
    }
  }, [currentIndex, images.length]);

  return (
    <div
      className="overflow-x-scroll flex gap-4"
      style={{ scrollBehavior: "smooth" }}
      ref={carouselRef}
    >
      {images?.map((image, index) => (
        <Mockup key={index} img={image} title={title} />
      ))}
    </div>
  );
}
