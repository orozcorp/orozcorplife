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
          Ayúdanos a resumir este mensaje con el menos texto possible.
          ${prompt}
          Con el contenido proporcionado, crea una publicación para la página de Facebook de negocios llamada Orozcorp.
          Hazlo como si estuvieras hablando en tercera persona. Un tono muy detallado y serio, pero también amigable.
          El objetivo principal es que la audiencia haga clic en el enlace para leer la publicación completa del blog.
          Siempre utiliza los hashtags #emprendedor #productividad #gestión #luz #led. La publicación debe estar en español de México.

        `,
      },
    ],
    temperature: 0.1,
    top_p: 1,
  });
  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}
