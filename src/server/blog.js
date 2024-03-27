"use server";
import { fetchFromMongo } from "@/lib/mongoAPI";
import { ObjectId } from "mongodb";

export async function blogGetById({ id }) {
  try {
    const { document: blog } = await fetchFromMongo("Blog", "findOne", {
      filter: { _id: new ObjectId(id) },
    });
    return blog;
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
