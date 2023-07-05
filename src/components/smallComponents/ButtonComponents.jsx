import { tv } from "tailwind-variants";

export const button = tv({
  base: "font-semibold  text-base p-2 px-4 rounded-full active:opacity-80 text-xs text-center",
  variants: {
    color: {
      primary: "bg-sky-800 text-white hover:bg-sky-600",
      secondary: "bg-sky-400 text-white hover:bg-sky-200 hover:text-sky-800",
      transparent:
        "bg-transparent text-sky-800 hover:bg-sky-800 hover:text-white",
      danger: "bg-red-800 text-white hover:bg-red-600",
    },
    fontSize: {
      small: "text-xs",
      medium: "text-base",
      large: "text-lg",
    },
  },
});

export const pill = tv({
  base: "font-light  text-xs py-1 px-4 rounded-full active:opacity-80",
  variants: {
    color: {
      primary: "bg-sky-800 text-white hover:bg-sky-600",
      secondary: "bg-sky-400 text-white hover:bg-sky-200 hover:text-sky-800",
      transparent:
        "bg-transparent text-sky-800 hover:bg-sky-800 hover:text-white",
    },
    weight: {
      light: "font-light",
      normal: "font-normal",
      bold: "font-bold",
    },
  },
});
