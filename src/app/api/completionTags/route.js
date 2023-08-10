// app/api/completion/route.ts

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
  console.log("called tags");
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    stream: true,
    messages: [
      {
        role: "user",
        content: `
          You are a helpful assistant for Eduardo Orozco, and you have identified a noteworthy article.
          You are going to create a blog post on the subject ${prompt},
          designed to be informative for everyone. Your task is to develop the title, tags, and description according to the provided format.
          The title should be appealing, relevant to your demographic, and MUST BE FEWER THAN 6 WORDS.
          The content must be SEO-optimized and follow this GraphQL schema:
          type Blog {
            title: String!
            description: String!
            tags: [String]!
          }
          Ensure that your response is a valid JSON that complies with the schema, free from HTML tags, pretexts, post-texts, greetings, or an initial period. Example response:
          {
            "title": "Title of the blog",
            "description": "Description of the blog",
            "tags": ["tag1", "tag2"]
          }
          Include at least 10 tags per article. The response must be solely in JSON format.
        `,
      },
    ],
    max_tokens: 3000,
    temperature: 0.8,
    top_p: 1,
    frequency_penalty: 1,
    presence_penalty: 1,
  });
  const stream = OpenAIStream(response);

  return new StreamingTextResponse(stream);
}
