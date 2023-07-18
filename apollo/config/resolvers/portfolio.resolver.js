import { ObjectId } from "mongodb";

export const portfolioResolvers = {
  Query: {
    getPortfolios: async (_, __, { db }) => {
      const portfolios = await db.collection("Portfolio").find({}).toArray();
      return portfolios;
    },
    getPortfolioById: async (_, { id }, { db }) => {
      const portfolio = await db
        .collection("Portfolio")
        .findOne({ _id: new ObjectId(id) });
      return portfolio;
    },
  },
  Mutation: {
    addPortfolio: async (_, { input }, { db }) => {
      try {
        const portfolio = await db.collection("Portfolio").insertOne({
          ...input,
          active: true,
        });
        return {
          code: 200,
          success: true,
          message: "Portfolio added successfully",
          data: portfolio.insertedId,
        };
      } catch (error) {
        console.error(error);
        return {
          code: 400,
          message: "Error al agregar Portfolio",
          success: false,
          data: null,
        };
      }
    },
    updatePortfolioImage: async (_, { id, image, action }, { db }) => {
      try {
        const toDo = action === "add" ? "$push" : "$pull";
        const portfolio = await db
          .collection("Portfolio")
          .updateOne({ _id: new ObjectId(id) }, { [toDo]: { images: image } });
        if (portfolio.modifiedCount === 1) {
          return {
            code: 200,
            success: true,
            message: "Portfolio updated successfully",
            data: null,
          };
        }
        return {
          code: 400,
          message: "Error al actualizar Portfolio",
          success: false,
          data: null,
        };
      } catch (error) {
        console.error(error);
        return {
          code: 400,
          message: "Error al agregar Portfolio",
          success: false,
          data: null,
        };
      }
    },
  },
};
