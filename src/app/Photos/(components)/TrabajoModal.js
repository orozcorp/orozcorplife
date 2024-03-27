import Image from "next/image";
import { rgbDataURL } from "@/lib/helpers/blur";
import { AspectRatio } from "@/components/ui/aspect-ratio";
export default function TrabajoModal({ isOpen, onClose, imageUrl }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 shadow-2xl shadow-slate-700 bg-black bg-opacity-75">
      <Image
        src={imageUrl}
        alt="Modal"
        width={500} // Set your desired dimensions
        height={500} // Set your desired dimensions
        blurDataURL={rgbDataURL(123, 201, 201)}
        placeholder="blur"
        loading="lazy"
        className="rounded-lg"
      />

      <div className="fixed inset-0" onClick={onClose}></div>
    </div>
  );
}
