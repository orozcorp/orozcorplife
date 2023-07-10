import { gql } from "@apollo/client";

export const usersSchema = gql`
  enum AllowedRoles {
    admin
    superAdmin
    client
    familiar
  }
  type UserProfile {
    name: String!
    lastName: String!
    roles: [AllowedRoles!]!
    picture: String
  }
  type User {
    _id: ID!
    createdAt: Date!
    email: String!
    emailVerified: Date
    profile: UserProfile
  }
  type Contacts {
    _id: ID!
    email: String!
    firstName: String!
    lastName: String!
    phone: String!
    company: String!
  }
  input ContactInput {
    email: String!
    firstName: String!
    lastName: String!
    phone: String!
    company: String!
  }
  type Query {
    getUserProfile(idUser: String!, oldMed: Boolean!): User
  }
  type Mutation {
    addContact(input: ContactInput!): GeneralResponseDataString!
  }
`;
