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

export async function blogGetAll({ limit }) {
  try {
    const props = {
      pipeline: [
        { $sample: { size: limit } },
        { $sort: { "article.publishedTime": -1 } },
      ],
    };
    const { documents: blogs } = await fetchFromMongo(
      "Blog",
      "aggregate",
      props
    );
    return blogs;
  } catch (error) {
    console.error(error);
    return {
      code: 400,
      message: "Error al obtener Resume",
      success: false,
      data: null,
    };
  }
}
