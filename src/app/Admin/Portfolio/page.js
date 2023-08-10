"use client";
import { header } from "@/components/smallComponents/TextComponents";
import { button } from "@/components/smallComponents/ButtonComponents";
import Table from "./Table";
import AddToPortfolio from "./AddToPortfolio";
import { useState } from "react";

export default async function Portfolio() {
  const [display, setDisplay] = useState("none");
  return (
    <>
      <AddToPortfolio display={display} setDisplay={setDisplay} />
      <h1 className={`${header({ size: "h1", color: "primary" })} mb-4`}>
        Portfolio
      </h1>
      <button
        className={`${button({ color: "primary", fontSize: "medium" })}`}
        onClick={() => setDisplay("block")}
      >
        Add Project to Portfolio
      </button>
      <Table />
    </>
  );
}
