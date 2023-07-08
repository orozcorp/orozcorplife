import { ObjectId } from "mongodb";

export const resumeResolvers = {
  Query: {
    getResume: async (_, __, { db }) => {
      const resume = await db.collection("resume").find({}).toArray();
      return resume;
    },
    getResumeById: async (_, { id }, { db }) => {
      const resume = await db
        .collection("resume")
        .findOne({ _id: new ObjectId(id) });
      return resume;
    },
  },
  Mutation: {
    addResume: async (_, { logo, company, dateStarted, dateEnded }, { db }) => {
      try {
        const resume = await db.collection("Resume").insertOne({
          dateStarted,
          dateEnded,
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
              dateStarted,
              dateEnded,
              activity,
              active,
            },
          }
        );
        console.log(resume);
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
  },
};
