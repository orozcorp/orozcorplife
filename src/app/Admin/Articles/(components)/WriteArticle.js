"use client";
import { useState } from "react";
import { button } from "@/components/smallComponents/ButtonComponents";
import InsertArticle from "./InsertArticle";
export default function WriteArticle({ prompts }) {
  const [display, setDisplay] = useState("none");
  return (
    <>
      <InsertArticle
        title="Write an Article"
        display={display}
        setDisplay={setDisplay}
        prompts={prompts}
      />
      <button
        className={`${button({ color: "primary", fontSize: "medium" })}`}
        onClick={() => setDisplay("flex")}
      >
        Write an Article
      </button>
    </>
  );
}
