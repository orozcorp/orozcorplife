"use server";
import { fetchFromMongo } from "@/lib/mongoAPI";
import { ObjectId } from "mongodb";
import fetch from "node-fetch";
import AWS from "aws-sdk";
import { blogGetAllNL } from "@/server/blog";
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
async function createText({ message }) {
  const url = "https://api.openai.com/v1/chat/completions";
  const data = {
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: message,
      },
    ],
    temperature: 0.1,
    top_p: 1,
  };
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify(data),
  };
  const response = await fetch(url, options);
  const jsonData = await response.json();
  return jsonData?.choices?.[0]?.message?.content;
}
export async function createImagesBulk() {
  const blogs = await blogGetAllNL();
  for (const blog of blogs) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const facebookBusiness = await createText({
      message: `
          Ayúdanos a resumir este mensaje con el menos texto possible.
          ${blog.content}
          Con el contenido proporcionado, crea una publicación para la página de Facebook de negocios llamada Orozcorp.
          Hazlo como si estuvieras hablando en tercera persona. Un tono muy detallado y serio, pero también amigable.
          El objetivo principal es que la audiencia haga clic en el enlace para leer la publicación completa del blog.
          Siempre utiliza los hashtags #emprendedor #productividad #gestión #luz #led. La publicación debe estar en español de México.

        `,
    });
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const facebookPersonal = await createText({
      message: `       Ayúdame a capturar la esencia de este tema para nuestra comunidad en Facebook desde mi página personal.
          Quiero compartir un resumen intrigante que incite a nuestra audiencia a explorar más sobre nuestro producto/artículo en el blog.
          El mensaje debe ser en primera persona, reflejando una conversación amena, feliz y emocionante con nuestros seguidores.
          Es esencial comunicar el valor y la relevancia del contenido, enfatizando cómo puede beneficiar a los emprendedores en su búsqueda de productividad y eficiencia.
          No olvides incluir los hashtags #emprendedor #productividad #gestión #luz #led para maximizar nuestro alcance.
          La publicación debe ser en español de México, con un toque local que resuene con nuestra audiencia y transmita entusiasmo sobre el producto o artículo.
          Reduciendo al maximo el texto,
          Este es el mensaje que quiero compartir:
          ${blog.content}`,
    });
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const instagramPost = await createText({
      message: `     Ayúdame a crear una publicación para Instagram que sea breve y al punto, dirigida a una audiencia que no está familiarizada con nuestra industria.
          El contenido debe ser muy básico, utilizando palabras simples y evitando tecnicismos.
          Quiero explicar nuestro producto/artículo de una manera que sea fácilmente comprensible para alguien que está aprendiendo sobre el tema.
          El tono debe ser ameno y emocionante, invitando a los seguidores a conocer más sobre lo que ofrecemos.
          La publicación debe tener menos de 300 caracteres, incluyendo hashtags esenciales como #emprendedor #productividad #gestión #luz #led.
          Este es el mensaje que quiero compartir:
          ${blog.content}`,
    });
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const linkedInPost = await createText({
      message: `      Desarrolla una publicación para LinkedIn dirigida a un público experto en nuestra industria.
            Debe ser técnica y precisa, asumiendo que los lectores son conocedores del tema.
            El contenido debe explorar y embellecer los detalles de nuestro producto/artículo, utilizando un lenguaje avanzado y términos específicos del sector.
            El tono debe ser profesional y autoritario, destacando la innovación y el valor que aportamos al mercado.
            Incluye los hashtags #entrepreneur #productivity #management para asegurar visibilidad y engagement con la comunidad empresarial y profesional en LinkedIn.
            Este es el mensaje que quiero compartir:
            ${blog.content}`,
    });
    try {
      const fa = await fetchFromMongo("Blog", "updateOne", {
        filter: { _id: blog._id },
        update: {
          $set: {
            facebookBusiness,
            facebookPersonal,
            instagramPost,
            linkedInPost,
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
}
