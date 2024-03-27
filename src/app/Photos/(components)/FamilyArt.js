"use client";
import { useQuery } from "@tanstack/react-query";
import { getTrabajos } from "@/server/users";
import Trabajo from "./Trabajo";

export default function FamilyArt({ user }) {
  const { data: trabajos } = useQuery({
    queryKey: ["trabajos", { idUser: user._id }],
    queryFn: async () => await getTrabajos({ idUser: user._id }),
    staleTime: 0,
    initialData: [],
  });
  const name = user.label
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  return (
    <div className="mt-4 flex flex-col flex-nowrap w-full">
      <h3 className="w-full text-center my-8">Trabajos de {name}</h3>
      <div className="flex flex-row flex-wrap  justify-between gap-4 items-center w-full ">
        {trabajos.map((trabajo) => (
          <Trabajo key={trabajo._id} trabajo={trabajo} />
        ))}
      </div>
    </div>
  );
}
