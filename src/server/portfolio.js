"use server";
import { fetchFromMongo } from "@/lib/mongoAPI";
import { ObjectId } from "mongodb";

export async function getPortfolios() {
  try {
    const { documents: resume } = await fetchFromMongo("Portfolio", "find", {
      filter: {},
    });
    return resume;
  } catch (error) {
    console.error(error);
    return [];
  }
}
