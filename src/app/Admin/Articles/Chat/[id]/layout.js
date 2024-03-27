import { BlogContainer } from "@/providers/blogProvider";

export default function Layout({ children }) {
  return <BlogContainer>{children}</BlogContainer>;
}
