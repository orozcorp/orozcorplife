/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

const BlogContext = createContext();
export function BlogContainer({ children }) {
  const { toast } = useToast();

  const [blogData, setBlogData] = useState({
    apiEndPoint: "/api/completion", //Cambiar a blog cuando se haga el cambio
    loadingGeneralState: false,
    loadingGenerating: false,
    generativeState: "chat",
    state: "initialChat",
    error: null,
    message: "",
    toastTitle: "",
    blogId: "",
  });
  useEffect(() => {
    if (blogData.message) {
      toast({
        title: blogData.toastTitle,
        description: blogData.message,
      });
    }
  }, [blogData.message, blogData.toastTitle]);
  return (
    <BlogContext.Provider value={{ blogData, setBlogData }}>
      {children}
    </BlogContext.Provider>
  );
}

export function useBlog() {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error("useBlog must be used within a BlogContainer");
  }
  return context;
}
