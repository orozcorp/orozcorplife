import { gql } from "@apollo/client";

export const responses = gql`
  scalar Date
  type GeneralResponse {
    "Similar to HTTP status code, represents the status of the mutation"
    code: Int!
    "Indicates whether the mutation was successful"
    success: Boolean!
    "Human-readable message for the UI"
    message: String!
  }
  type GeneralResponseDataString {
    "Similar to HTTP status code, represents the status of the mutation"
    code: Int!
    "Indicates whether the mutation was successful"
    success: Boolean!
    "Human-readable message for the UI"
    message: String!
    "data as string"
    data: String
  }
  type InputSel {
    value: String
    label: String
  }
  input InputSelect {
    value: String
    label: String
  }
`;
