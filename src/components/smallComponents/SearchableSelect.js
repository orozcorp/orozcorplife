"use client";
import { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
const SearchableSelect = ({ options = [], value, onChange }) => {
  const [search, setSearch] = useState(value?.label || "");
  const [isOpen, setIsOpen] = useState(false);
  const filteredOptions = (options || []).filter(
    (option) =>
      typeof option?.label === "string" &&
      option.label.toLowerCase().includes(search?.toLowerCase())
  );

  const handleOptionClick = (option) => {
    onChange(option);
    setSearch(option.label);
    setIsOpen(false);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexFlow: "row wrap",
          justifyContent: "flex-start",
          alignItems: "center",

          width: "100%",
          minWidth: "380px",
        }}
      >
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onClick={() => {
            setIsOpen(true);
            setSearch("");
          }}
          className="bg-gray-50 border text-left border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/4 p-2.5 "
          onBlur={() => setTimeout(() => setIsOpen(false), 200)}
        />
        <span>
          <AiOutlineDelete
            style={{
              width: "30px",
              height: "30px",
            }}
            className="my-icon hover:bg-blue-800 hover:text-white m-2 rounded"
            onClick={() => {
              setSearch("");
            }}
          />
        </span>
      </div>
      {isOpen && (
        <div
          style={{
            maxHeight: "200px",
            overflowY: "scroll",
          }}
          py={1}
        >
          {filteredOptions?.map((option) => (
            <div
              key={option?.value}
              className="mt-2 w-3/4
              bg-blue-100 text-blue-800 text-sm
              hover:bg-blue-800 hover:text-white
              font-medium mr-2 px-2.5 py-0.5 rounded"
              onClick={() => handleOptionClick(option)}
            >
              <div style={{ fontSize: "12px" }}>{option?.label}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchableSelect;
