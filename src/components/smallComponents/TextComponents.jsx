import { tv } from "tailwind-variants";

export const header = tv({
  base: "font-bold",
  variants: {
    size: {
      h1: "text-3xl",
      h2: "text-2xl",
      h3: "text-xl",
      h4: "text-lg",
    },
    color: {
      primary: "text-zinc-800",
      secondary: "text-zinc-400",
      danger: "text-red-700",
      white: "text-white",
    },
  },
});

export const text = tv({
  base: "text-base",
  variants: {
    color: {
      primary: "text-zinc-800",
      secondary: "text-zinc-400",
      danger: "text-red-700",
      white: "text-white",
    },
    weight: {
      light: "font-light",
      normal: "font-normal",
      bold: "font-bold",
    },
  },
});
