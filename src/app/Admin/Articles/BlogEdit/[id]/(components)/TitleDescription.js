"use client";
import { useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import TitleDescriptionEdit from "./TitleDescriptionEdit";
export default function TitleDescription({ id, title, description, tags }) {
  const [edit, setEdit] = useState(false);
  const [info, setInfo] = useState({
    title,
    description,
    tags,
  });
  return (
    <div className="my-4 w-full">
      {edit ? (
        <TitleDescriptionEdit
          info={info}
          setInfo={setInfo}
          id={id}
          setEdit={setEdit}
        />
      ) : (
        <>
          <h1 className="text-3xl">{title}</h1>
          <div>{description}</div>
          <button
            className="
              flex flex-row flex-wrap items-center justify-center
              gap-4 mt-4 mr-2 mb-2
              text-gray-900 bg-amber-400 hover:bg-gradient-to-br
              focus:ring-4 focus:outline-none focus:ring-green-300
              font-medium rounded-lg text-sm px-5 py-2.5 text-center "
            onClick={() => setEdit(true)}
          >
            <div>Editar</div>
            <div>
              <AiOutlineEdit />
            </div>
          </button>
        </>
      )}
    </div>
  );
}
