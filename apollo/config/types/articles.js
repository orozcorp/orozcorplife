import { gql } from "@apollo/client";

export const article = gql`
  type Message {
    id: ID!
    content: String!
    role: String!
    createdAt: Date!
    transformedToBlog: Boolean
    dateBlogTransform: Date
    blogCreated: String
  }
  type Chat {
    _id: ID!
    date: Date!
    active: Boolean!
    title: String!
    prompt: String!
    messages: [Message!]
  }
  input MessageInput {
    id: ID!
    content: String!
    role: String!
    createdAt: Date!
  }
  type Mutation {
    chatInsert(title: String!, prompt: String!): GeneralResponseDataString!
    chatUpdate(_id: ID!, message: MessageInput!): GeneralResponseDataString!
  }
  type Query {
    chatGetAll: [Chat!]
    chatGetById(_id: ID!): Chat!
  }
  type BlogArticle {
    publishedTime: Date!
    modifiedTime: Date!
    expirationTime: Date!
    authors: [String]!
    tags: [String]!
  }
  type BlogImage {
    url: String!
    width: Int!
    height: Int!
    alt: String!
  }
  type Blog {
    _id: ID!
    title: String!
    content: String!
    awsLambda: String
    description: String!
    article: BlogArticle!
    promptIdeas: [String]
    chatId: ID
    messageId: ID
    imagePrompt: String
    status: String
    images: [BlogImage]
  }
  input BlogInput {
    title: String!
    description: String!
    tags: [String]!
    content: String!
    chatId: ID!
    messageId: ID!
  }
  input BlogUpdateInput {
    title: String!
    description: String!
    tags: [String]!
  }
  type Mutation {
    blogInsert(input: BlogInput!): GeneralResponse
    blogUpdate(_id: ID!, input: BlogUpdateInput!): GeneralResponse
    blogImagePrompt(_id: ID!, title: String!): GeneralResponse
    blogOtherIdeas(_id: ID!, title: String!): GeneralResponse
    blogUpdatePhoto(id: ID!, url: String!, title: String!): GeneralResponse
    blogPublish(_id: ID!): GeneralResponse
    blogRemoveTag(_id: ID!, tag: String!): GeneralResponse
    blogAddTag(_id: ID!, tag: String!): GeneralResponse
    blogUpdateContent(_id: ID!, content: String!): GeneralResponse
    blogFix: GeneralResponse
  }
  type Query {
    blogGetAll(limit: Int): [Blog]
    blogGetById(_id: ID!): Blog
  }
`;
