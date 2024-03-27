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
            Genera una publicación de Facebook en primera persona desde mi página personal que capte la esencia de nuestro producto/artículo.
            El mensaje debe ser ameno, feliz y emocionante, incentivando a los seguidores a explorar más sobre el tema en nuestro blog.
            Tiene que ser captivante desde el primer párrafo.
            ###Detalles###
            - La publicación debe reflejar conversación amena y entusiasmo.
            - Debe comunicar el valor y la relevancia del contenido, mostrando cómo beneficia a emprendedores en productividad y eficiencia.
            - Incluir los hashtags #emprendedor #productividad #gestión #luz #led.
            - Ajustarse al español de México con un toque local que resuene con la audiencia.
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
