import { ObjectId } from "mongodb";

export const trabajosResolver = {
  Query: {
    getTrabajos: async (root, { idUser }, { db }) => {
      const trabajos = await db
        .collection("Trabajos")
        .find({ userId: idUser })
        .sort({ date: -1 })
        .toArray();
      return trabajos;
    },
  },
};
