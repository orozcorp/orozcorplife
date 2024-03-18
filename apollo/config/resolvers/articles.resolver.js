import { ObjectId } from "mongodb";
import axios from "axios";
import AWS from "aws-sdk";

const lambda = new AWS.Lambda({
  region: process.env.S3_REGIONL,
  accessKeyId: process.env.S3_ACCESSKEYID,
  secretAccessKey: process.env.S3_SECRETACCESSKEY,
});
export const articleResolvers = {
  Query: {
    chatGetAll: async (parent, args, { db }) => {
      return await db.collection("Chat").find({}).toArray();
    },
    chatGetById: async (parent, { _id }, { db }) => {
      return await db.collection("Chat").findOne({ _id: new ObjectId(_id) });
    },
    blogGetAll: async (root, { limit }, { db }) => {
      try {
        const data = await db
          .collection("Blog")
          .aggregate([{ $sample: { size: limit } }])
          .sort({ "article.publishedTime": -1 })
          .toArray();
        return data;
      } catch (error) {
        return [];
      }
    },
    blogGetById: async (root, { _id }, { db }) => {
      try {
        const data = await db
          .collection("Blog")
          .findOne({ _id: new ObjectId(_id) });
        return data;
      } catch (error) {
        console.log(error);
        return {};
      }
    },
  },
  Mutation: {
    chatInsert: async (parent, { title, prompt }, { db }) => {
      try {
        const chat = {
          date: new Date(),
          active: true,
          title,
          prompt,
          messages: [],
        };
        const chatInserted = await db.collection("Chat").insertOne(chat);

        return {
          success: true,
          message: "Chat created successfully",
          code: 200,
          data: chatInserted.insertedId,
        };
      } catch (error) {
        return {
          success: false,
          message: "Chat NOT create",
          code: 400,
          data: null,
        };
      }
    },
    chatUpdate: async (parent, { _id, message }, { db }) => {
      try {
        const chat = await db
          .collection("Chat")
          .updateOne(
            { _id: new ObjectId(_id) },
            { $push: { messages: message } }
          );
        return {
          success: true,
          message: "Chat updated",
          code: 200,
        };
      } catch (error) {
        return {
          success: false,
          message: "Chat NOT create",
          code: 400,
          data: null,
        };
      }
    },
    blogPublish: async (root, { _id }, { db }) => {
      try {
        const update = await db
          .collection("Blog")
          .updateOne(
            { _id: new ObjectId(_id) },
            { $set: { status: "published" } }
          );
        return {
          code: 200,
          success: true,
          message: "Blog publicado exitosamente",
        };
      } catch (error) {
        console.log(error);
        return {
          code: error.extensions.response.status,
          success: false,
          message: error.extensions.response.body,
        };
      }
    },
    blogRemoveTag: async (root, { _id, tag }, { db }) => {
      try {
        const update = await db.collection("Blog").updateOne(
          {
            _id: new ObjectId(_id),
          },
          {
            $pull: {
              "article.tags": tag,
            },
          }
        );
        return {
          code: 200,
          success: true,
          message: "Blog creado exitosamente",
          data: _id,
        };
      } catch (error) {
        console.log(error);
        return {
          code: error.extensions.response.status,
          success: false,
          message: error.extensions.response.body,
        };
      }
    },
    blogInsert: async (root, { input }, { db }) => {
      try {
        const date = new Date();
        const futureDate = new Date().setFullYear(date.getFullYear() + 20);
        const { title, description, tags, content } = input;
        const toInsert = {
          title,
          content,
          description,
          status: "pending",
          article: {
            publishedTime: date,
            modifiedTime: date,
            expirationTime: futureDate,
            authors: ["Eduardo Orozco Mendoza"],
            tags,
          },
          images: [],
        };
        const { insertedId } = await db.collection("Blog").insertOne(toInsert);
        const update = await db.collection("Chat").updateOne(
          {
            _id: new ObjectId(input.chatId),
            messages: { $elemMatch: { id: input.messageId } },
          },
          {
            $set: {
              "messages.$.transformedToBlog": true,
              "messages.$.dateBlogTransform": date,
              "messages.$.blogCreated": insertedId,
            },
          }
        );
        const lambdaParams = [
          { language: "English", expand: true },
          { language: "Spanish", expand: false },
          { language: "Spanish", expand: true },
        ];

        await Promise.all(
          lambdaParams.map((params) =>
            lambda
              .invoke({
                FunctionName: "Orozcorp-3versions",
                Payload: JSON.stringify({ id: insertedId, ...params }),
              })
              .promise()
          )
        );
        console.log("Lambda invoked");
        return {
          code: 200,
          success: true,
          message: "Blog creado exitosamente",
          data: insertedId,
        };
      } catch (error) {
        console.log(error);
        return {
          code: error.extensions.response.status,
          success: false,
          message: error.extensions.response.body,
        };
      }
    },
    blogUpdate: async (root, { _id, input }, { db }) => {
      try {
        const { title, description, tags } = input;
        const toUpdate = {
          title,
          description,
        };

        const updatedBlog = await db.collection("Blog").updateOne(
          { _id: new ObjectId(_id) },
          {
            $set: {
              title,
              description,
              "article.tags": tags,
              status: "published",
            },
          }
        );

        return {
          code: 200,
          success: true,
          message: "Blog actualizado exitosamente",
          data: updatedBlog?.value,
        };
      } catch (error) {
        console.log(error);
        return {
          code: error.extensions.response.status,
          success: false,
          message: error.extensions.response.body,
        };
      }
    },
    blogUpdateContent: async (root, { _id, content }, { db }) => {
      try {
        const updatedBlog = await db.collection("Blog").updateOne(
          { _id: new ObjectId(_id) },
          {
            $set: {
              content,
              status: "published",
            },
          }
        );
        const blog = await db
          .collection("Blog")
          .findOne({ _id: new ObjectId(_id) });
        const postData = {
          author: `urn:li:person:${process.env.LinkedInUserID}`,
          lifecycleState: "PUBLISHED",
          specificContent: {
            "com.linkedin.ugc.ShareContent": {
              shareCommentary: {
                text: blog.title + "\n\n" + blog.description,
              },
              shareMediaCategory: "ARTICLE",
              media: [
                {
                  status: "READY",
                  description: {
                    text: blog.description,
                  },
                  originalUrl: `https://www.orozcorp.live/Articles/${blog._id}`,
                  title: {
                    text: blog.title,
                  },
                },
              ],
            },
          },
          visibility: {
            "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC",
          },
        };
        // Execute the LinkedIn API request
        const response = await axios.post(
          "https://api.linkedin.com/v2/ugcPosts",
          postData,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${process.env.LinkedInToken}`,
            },
          }
        );
        return {
          code: 200,
          success: true,
          message: "Blog actualizado exitosamente",
          data: updatedBlog?.value,
        };
      } catch (error) {
        console.log(error);
        return {
          code: error.extensions.response.status,
          success: false,
          message: error.extensions.response.body,
        };
      }
    },
    blogImagePrompt: async (root, { title, _id }, { db }) => {
      try {
        const update = await db
          .collection("Blog")
          .updateOne(
            { _id: new ObjectId(_id) },
            { $set: { imagePrompt: "loading" } }
          );

        return {
          code: 200,
          success: true,
          message: "Blog image prompt creado exitosamente",
          data: _id,
        };
      } catch (error) {
        console.log(error);
        return {
          code: error.extensions.response.status,
          success: false,
          message: error.extensions.response.body,
        };
      }
    },
    blogOtherIdeas: async (root, { title, _id }, { db }) => {
      try {
        const update = await db
          .collection("Blog")
          .updateOne(
            { _id: new ObjectId(_id) },
            { $set: { promptIdeas: ["loading"] } }
          );
        return {
          code: 200,
          success: true,
          message: "Blog ideas creadas exitosamente",
          data: _id,
        };
      } catch (error) {
        console.log(error);
        return {
          code: error.extensions.response.status,
          success: false,
          message: error.extensions.response.body,
        };
      }
    },
    blogUpdatePhoto: async (root, { id, url, title }, { db }) => {
      try {
        const update = await db.collection("Blog").updateOne(
          { _id: new ObjectId(id) },
          {
            $set: {
              images: [
                {
                  url,
                  width: 500,
                  height: 500,
                  alt: title,
                },
              ],
            },
          }
        );
        return {
          code: 200,
          success: true,
          message: "Blog ideas creadas exitosamente",
          data: id,
        };
      } catch (error) {
        console.log(error);
        return {
          code: error.extensions.response.status,
          success: false,
          message: error.extensions.response.body,
        };
      }
    },
    blogAddTag: async (root, { _id, tag }, { db }) => {
      try {
        const update = await db
          .collection("Blog")
          .updateOne(
            { _id: new ObjectId(_id) },
            { $push: { "article.tags": tag } }
          );
        return {
          code: 200,
          success: true,
          message: "Blog publicado exitosamente",
        };
      } catch (error) {
        console.log(error);
        return {
          code: error.extensions.response.status,
          success: false,
          message: error.extensions.response.body,
        };
      }
    },
  },
};
