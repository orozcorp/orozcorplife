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
          Crea una publicación de Facebook para Orozcorp que resuma el contenido proporcionado en el prompt, utilizando un tono detallado, serio y amigable, hablando en tercera persona.
          El objetivo es incentivar a la audiencia a hacer clic en el enlace para leer la publicación completa del blog.
          Incluye los hashtags #emprendedor #productividad #gestión #luz #led.
          La publicación debe ser en español de México.
          Hazlo captivamente desde el primer párrafo.
          ###Contexto###
          Orozcorp es una empresa que se enfoca en GPT
          Orozcorp se especializa en el desarrollo web, desarrollo de aplicaciones móviles y de consultoría, ofreciendo servicios como WhatsBlast para mensajería masiva, WhatsCRM para integración de CRM con WhatsApp, y ChatDigest para resúmenes de conversaciones. La empresa se posiciona como un socio estratégico en tecnología, con un enfoque en la innovación, resultados de negocio, y soporte continuo..
          El contenido que necesitamos resumir es: ${prompt}
        `,
      },
    ],
    temperature: 0.1,
    top_p: 1,
  });
  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}
