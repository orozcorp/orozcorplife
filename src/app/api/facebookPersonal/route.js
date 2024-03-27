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
          Ayúdame a capturar la esencia de este tema para nuestra comunidad en Facebook desde mi página personal.
          Quiero compartir un resumen intrigante que incite a nuestra audiencia a explorar más sobre nuestro producto/artículo en el blog.
          El mensaje debe ser en primera persona, reflejando una conversación amena, feliz y emocionante con nuestros seguidores.
          Es esencial comunicar el valor y la relevancia del contenido, enfatizando cómo puede beneficiar a los emprendedores en su búsqueda de productividad y eficiencia.
          No olvides incluir los hashtags #emprendedor #productividad #gestión #luz #led para maximizar nuestro alcance.
          La publicación debe ser en español de México, con un toque local que resuene con nuestra audiencia y transmita entusiasmo sobre el producto o artículo.
          Reduciendo al maximo el texto,
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
