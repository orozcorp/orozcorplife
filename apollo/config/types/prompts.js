import { gql } from "@apollo/client";

export const prompts = gql`
  type Prompt {
    _id: ID!
    description: String!
    prompt: String!
  }
  type Query {
    getPrompts: [Prompt!]
  }
`;
