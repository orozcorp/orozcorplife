"use server";
import { fetchFromMongo } from "@/lib/mongoAPI";
import AWS from "aws-sdk";
const S3_ACCESSKEYID = process.env.S3_ACCESSKEYID;
const S3_SECRETACCESSKEY = process.env.S3_SECRETACCESSKEY;
const S3_REGION = process.env.S3_REGION;

AWS.config.update({
  region: S3_REGION,
  accessKeyId: S3_ACCESSKEYID,
  secretAccessKey: S3_SECRETACCESSKEY,
});

const s3 = new AWS.S3();
const lambda = new AWS.Lambda({
  region: process.env.S3_REGIONL,
  accessKeyId: process.env.S3_ACCESSKEYID,
  secretAccessKey: process.env.S3_SECRETACCESSKEY,
});

export async function generateImage({ imagePrompt, blogId }) {
  try {
    const params = {
      FunctionName: "imageGeneration",
      InvocationType: "Event",
      Payload: JSON.stringify({
        imagePrompt,
        database: process.env.MONGO_DB,
        collection: "Blog",
        blogId,
        location: "orozcorp/blog/images",
      }),
    };
    await lambda.invoke(params).promise();
    return "done";
  } catch (error) {
    console.error("Error in generateImage", error);
    return "";
  }
}

export async function saveToDBBlog({ input, imagePrompt }) {
  const date = new Date();
  const futureDate = new Date().setFullYear(date.getFullYear() + 20);
  const article = {
    publishedTime: date,
    modifiedTime: date,
    expirationTime: futureDate,
    authors: ["Eduardo Orozco Mendoza"],
    tags: input.tags,
  };
  input.article = article;
  input.content = input.blog;
  delete input.blog;
  const { insertedId } = await fetchFromMongo("Blog", "insertOne", {
    document: { ...input, date: new Date() },
  });
  const params = {
    FunctionName: "imageGeneration",
    InvocationType: "Event",
    Payload: JSON.stringify({
      imagePrompt,
      database: process.env.MONGO_DB,
      collection: "Blog",
      blogId: insertedId,
      location: "plasma/blog/images",
    }),
  };
  await lambda.invoke(params).promise();
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

  return insert.insertedId;
}
