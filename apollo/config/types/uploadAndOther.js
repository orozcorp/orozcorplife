import { gql } from "@apollo/client";

export const uploadSchema = gql`
  type ResponseFields {
    key: String
    bucket: String
    xAmzAlgorithm: String
    xAmzCredential: String
    xAmzDate: String
    Policy: String
    xAmzSignature: String
  }
  type ResponseSigner {
    url: String
    fields: ResponseFields
  }
  type Mutation {
    "signFile for upload"
    signFile(key: String!): ResponseSigner!
    "send Contact"
    sendContact(
      email: String!
      name: String!
      message: String!
    ): GeneralResponseDataString!
  }
`;
