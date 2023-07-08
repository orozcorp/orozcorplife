"use client";
import { header } from "@/components/smallComponents/TextComponents";
import { button } from "@/components/smallComponents/ButtonComponents";
import { useState } from "react";
import AddToResume from "./AddToResume";
import Table from "./Table";
export default function Resume() {
  const [display, setDisplay] = useState("none");
  return (
    <>
      <AddToResume display={display} setDisplay={setDisplay} />
      <h1 className={`${header({ size: "h1", color: "primary" })} mb-4`}>
        Resume
      </h1>
      <button
        className={`${button({ color: "primary", fontSize: "medium" })}`}
        onClick={() => setDisplay("block")}
      >
        Add to Resume
      </button>
      <Table />
    </>
  );
}
