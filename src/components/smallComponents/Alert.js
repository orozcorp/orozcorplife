import React from "react";

export default function Alert({ color, type, description }) {
  return (
    <div
      class={`p-4 mb-4 text-sm text-${color}-800 rounded-lg bg-${color}-100`}
      role="alert"
    >
      <span class="font-medium">{type}</span> {description}
    </div>
  );
}
