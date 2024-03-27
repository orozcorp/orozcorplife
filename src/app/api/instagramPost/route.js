import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

export const runtime = "edge";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  const { prompt } = await req.json();
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    stream: true,
    messages: [
      {
        role: "user",
        content: `
          Ayúdame a crear una publicación para Instagram que sea breve y al punto, dirigida a una audiencia que no está familiarizada con nuestra industria.
          El contenido debe ser muy básico, utilizando palabras simples y evitando tecnicismos.
          Quiero explicar nuestro producto/artículo de una manera que sea fácilmente comprensible para alguien que está aprendiendo sobre el tema.
          El tono debe ser ameno y emocionante, invitando a los seguidores a conocer más sobre lo que ofrecemos.
          La publicación debe tener menos de 300 caracteres, incluyendo hashtags esenciales como #emprendedor #productividad #gestión #luz #led.
          Este es el mensaje que quiero compartir:
          ${prompt}


        `,
      },
    ],
    temperature: 0.1,
    top_p: 1,
  });
  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}
