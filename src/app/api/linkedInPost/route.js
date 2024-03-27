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
          ###Instrucción###
          Crea una publicación de LinkedIn dirigida a un público experto en nuestra industria, que describa en detalle nuestro producto/artículo. Utiliza un lenguaje técnico y específico del sector, y un tono profesional y autoritario para resaltar la innovación y el valor que aportamos al mercado.
          ###Detalles###
          - La publicación debe ser técnica, precisa y en un lenguaje avanzado.
          - Asumir que los lectores son expertos en el tema y conocedores del sector.
          - Enfatizar la innovación y el valor de mercado de nuestro producto/artículo.
          - Incluir hashtags #entrepreneur #productivity #management.
          ###Mensaje###
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
