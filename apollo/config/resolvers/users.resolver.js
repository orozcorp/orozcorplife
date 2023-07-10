import { ObjectId } from "mongodb";
import { v4 as uuidv4 } from "uuid";

export const usersResolvers = {
  Query: {
    getUserProfile: async (root, { idUser, oldMed }, { db }) => {
      const filterCondition = oldMed
        ? { $lte: ["$$medicamento.fechaFin", new Date()] }
        : { $gte: ["$$medicamento.fechaFin", new Date()] };

      const projection = {
        _id: 1,
        email: 1,
        "profile.name": 1,
        "profile.lastName": 1,
        "profile.picture": 1,
      };

      const user = await db
        .collection("users")
        .findOne({ _id: new ObjectId(idUser) }, { projection });

      return user;
    },
  },
  Mutation: {
    addContact: async (root, { input }, { db }) => {
      try {
        const insert = await db.collection("Contacts").insertOne(input);
        return {
          code: 200,
          success: true,
          message: "Resume added successfully",
          data: insert.insertedId,
        };
      } catch (error) {
        console.error(error);
        return {
          code: 400,
          message: "Error al agregar Contacto",
          success: false,
          data: null,
        };
      }
    },
  },
};
