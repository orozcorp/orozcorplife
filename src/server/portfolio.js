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

export async function getPortfolioById({ id }) {
  try {
    const { document: portfolio } = await fetchFromMongo(
      "Portfolio",
      "findOne",
      {
        filter: { _id: new ObjectId(id) },
      }
    );
    return portfolio;
  } catch (error) {
    console.error(error);
    return {
      code: 400,
      message: "Error al obtener Portfolio",
      success: false,
      data: null,
    };
  }
}
