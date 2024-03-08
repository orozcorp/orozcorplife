import { Configuration, OpenAIApi } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";

export const runtime = "edge";

const apiConfig = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(apiConfig);

export async function POST(req) {
  // Extract the `prompt` from the body of the request
  const { prompt } = await req.json();
  const response = await openai.createChatCompletion({
    model: "gpt-4-turbo-preview",
    stream: true,
    messages: [
      {
        role: "user",
        content: `
          Given the following content, transform the text into HTML, adhering to modern SEO guidelines.
          Do not use the tags <head>, <html>, <body>, or <h1>.
          The content must be properly structured using HTML5 semantic tags, but without altering the original text.
          The response should be in one line without line breaks. Add as many different tags as you need.
          Content: ${prompt}
        `,
      },
    ],
    temperature: 0.1,
    top_p: 1,
  });

  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}
