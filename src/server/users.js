"use server";
import { fetchFromMongo } from "@/lib/mongoAPI";
import { ObjectId } from "mongodb";

export async function getFamily({ id }) {
  try {
    const { document: familia } = await fetchFromMongo("users", "findOne", {
      filter: { _id: new ObjectId(id) },
      projection: { "profile.familias": 1 },
    });
    const idFamilia = familia.profile.familias.find(
      (familia) => familia.nuclear === true
    );
    const { documents: familyMembers } = await fetchFromMongo("users", "find", {
      filter: { "profile.familias._id": idFamilia._id },
    });
    return familyMembers;
  } catch (error) {
    return [];
  }
}

export async function getTrabajos({ idUser }) {
  try {
    const { documents: trabajos } = await fetchFromMongo("Trabajos", "find", {
      filter: { userId: idUser },
    });
    return trabajos;
  } catch (error) {
    return [];
  }
}
