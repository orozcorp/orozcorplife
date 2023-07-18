import { gql } from "@apollo/client";

export const portfolio = gql`
  type Portfolio {
    _id: ID!
    project: String!
    company: String!
    description: String!
    date: Date!
    images: [String!]
    active: Boolean!
  }
  input PortfolioInput {
    project: String!
    company: String!
    description: String!
    date: Date!
    images: [String!]
  }
  type Query {
    getPortfolios: [Portfolio!]
    getPortfolioById(id: ID!): Portfolio!
  }
  type Mutation {
    addPortfolio(input: PortfolioInput!): GeneralResponseDataString!
    updatePortfolioImage(
      id: ID!
      image: String!
      action: String!
    ): GeneralResponseDataString!
  }
`;
