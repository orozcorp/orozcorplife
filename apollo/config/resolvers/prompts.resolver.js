import { ObjectId } from "mongodb";

export const promptResolvers = {
  Query: {
    getPrompts: async (_, __, { db }) => {
      return await db.collection("Prompts").find().toArray();
    },
  },
};
