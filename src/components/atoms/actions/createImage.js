"use server";
import { fetchFromMongo } from "@/lib/mongoAPI";
import fetch from "node-fetch";
import AWS from "aws-sdk";
const S3_ACCESSKEYID = process.env.S3_ACCESSKEYID;
const S3_SECRETACCESSKEY = process.env.S3_SECRETACCESSKEY;
const S3_BUCKET = process.env.S3_BUCKET;
const S3_REGION = process.env.S3_REGION;

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

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
//HERE TESTING S3 UPLOAD
export async function generateImage({ imagePrompt }) {
  const url = "https://api.openai.com/v1/images/generations";
  const data = {
    model: "dall-e-3",
    prompt: imagePrompt,
    n: 1,
    size: "1024x1024",
  };
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(url, options);
    const jsonData = await response.json();
    const imageUrl = jsonData?.data?.[0]?.url;

    if (!imageUrl) {
      throw new Error("No image URL found in the response");
    }

    const imageResponse = await fetch(imageUrl);
    if (!imageResponse.ok) {
      throw new Error(`Failed to fetch image from URL: ${imageUrl}`);
    }
    const imageBuffer = await imageResponse.buffer();

    // Define the key for the image in S3
    const key = `plasma/blog/images/${Date.now()}.png`;

    const uploadParams = {
      Bucket: S3_BUCKET,
      Key: key,
      Body: imageBuffer,
      ContentType: "image/png", // Adjust if the image type is different
    };

    const uploadResult = await s3.upload(uploadParams).promise();

    return uploadResult.Location; // Return the S3 URL of the uploaded image
  } catch (error) {
    console.error("Error in generateImage", error);
    return "";
  }
}

export async function saveToDBBlog({ input }) {
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
  input.images = [input.image];
  input.content = input.blog;
  delete input.blog;
  const insert = await fetchFromMongo("Blog", "insertOne", {
    document: { ...input, date: new Date() },
  });
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
          Payload: JSON.stringify({ id: insert.insertedId, ...params }),
        })
        .promise()
    )
  );
  return insert.insertedId;
}
