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
            Desarrolla una publicación para LinkedIn dirigida a un público experto en nuestra industria.
            Debe ser técnica y precisa, asumiendo que los lectores son conocedores del tema.
            El contenido debe explorar y embellecer los detalles de nuestro producto/artículo, utilizando un lenguaje avanzado y términos específicos del sector.
            El tono debe ser profesional y autoritario, destacando la innovación y el valor que aportamos al mercado.
            Incluye los hashtags #entrepreneur #productivity #management para asegurar visibilidad y engagement con la comunidad empresarial y profesional en LinkedIn.
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
