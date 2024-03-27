"use server";
import { fetchFromMongo } from "@/lib/mongoAPI";
export async function getResume() {
  try {
    const { documents: resume } = await fetchFromMongo("Resume", "find", {
      filter: {},
    });
    return resume;
  } catch (error) {
    console.error(error);
    return [];
  }
}
