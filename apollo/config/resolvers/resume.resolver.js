import { ObjectId } from "mongodb";

export const resumeResolvers = {
  Query: {
    getResume: async (_, __, { db }) => {
      console.log("hitting the resolver");
      const resume = await db.collection("Resume").find({}).toArray();
      console.log(resume);
      return resume;
    },
    getResumeById: async (_, { id }, { db }) => {
      const resume = await db
        .collection("Resume")
        .findOne({ _id: new ObjectId(id) });
      return resume;
    },
  },
  Mutation: {
    addResume: async (_, { logo, company, dateStarted, dateEnded }, { db }) => {
      try {
        const resume = await db.collection("Resume").insertOne({
          dateStarted: new Date(dateStarted),
          dateEnded: new Date(dateEnded),
          logo,
          company,
          activity: [],
          active: true,
        });
        return {
          code: 200,
          success: true,
          message: "Resume added successfully",
          data: resume.insertedId,
        };
      } catch (error) {
        console.error(error);
        return {
          code: 400,
          message: "Error al agregar Resume",
          success: false,
          data: null,
        };
      }
    },
    updateResume: async (
      _,
      { id, dateStarted, dateEnded, activity, active },
      { db }
    ) => {
      try {
        const resume = await db.collection("Resume").updateOne(
          { _id: new ObjectId(id) },
          {
            $set: {
              dateStarted: new Date(dateStarted),
              dateEnded: new Date(dateEnded),
              activity,
              active,
            },
          }
        );
        return {
          code: 200,
          success: true,
          message: "Resume added successfully",
          data: "1",
        };
      } catch (error) {
        console.error(error);
        return {
          code: 400,
          message: "Error al agregar Resume",
          success: false,
          data: null,
        };
      }
    },
    addActivity: async (_, { id, activity }, { db }) => {
      try {
        const resume = await db.collection("Resume").updateOne(
          { _id: new ObjectId(id) },
          {
            $push: {
              activity,
            },
          }
        );
        return {
          code: 200,
          success: true,
          message: "Activity added successfully",
          data: "1",
        };
      } catch (error) {
        console.error(error);
        return {
          code: 400,
          message: "Error al agregar Activity",
          success: false,
          data: null,
        };
      }
    },
  },
};
