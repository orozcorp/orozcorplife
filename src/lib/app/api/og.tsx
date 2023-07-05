import { ImageResponse } from "@vercel/og";
import React from "react";

export const runtime = "edge";

export default async function handler() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          fontSize: 40,
          color: "white",
          background: "rgb(30 64 175)",
          width: "100%",
          height: "100%",
          textAlign: "center",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <p>Eduardo Orozco</p>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
