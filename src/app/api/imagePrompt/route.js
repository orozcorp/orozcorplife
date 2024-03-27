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
          Lee detenidamente el artículo proporcionado (${prompt}) y crea un prompt para DALL-E que resuma visualmente los puntos clave del artículo.
          Identifica los temas principales, personajes, entornos y objetos significativos mencionados en el texto.
          Utiliza esta información para construir una descripción detallada que guíe a DALL-E en la generación de una imagen que represente fielmente el contenido y el mensaje del artículo.
          Asegúrate de incluir elementos específicos que capturen la esencia y los detalles cruciales del artículo, como el ambiente, la tecnología, las interacciones y las emociones involucradas
        `,
      },
    ],
    temperature: 0.1,
    top_p: 1,
  });
  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}
