"use client";
import { useState } from "react";

export default function TextArea({ values, setValues, name, width }) {
  const handleChange = (e) => {
    const inputValue = e.target.value;
    setValues({
      ...values,
      [e.target.name]: inputValue,
    });
  };
  return (
    <div className={`relative z-0  mb-6 group ${width}`}>
      <label
        htmlFor="message"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {name}
      </label>
      <textarea
        id="message"
        rows="4"
        name={name}
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={`${name}....`}
        value={values[name]}
        onChange={handleChange}
      ></textarea>
    </div>
  );
}
