import { gql } from "@apollo/client";

export const trabajos = gql`
  type Trabajo {
    _id: ID!
    url: String!
    userId: String!
    userName: String!
    date: Date!
    status: String!
  }
  type Query {
    getTrabajos(idUser: String!): [Trabajo]
  }
`;
