import { gql } from "@apollo/client";

export const SIGN_UPLOAD = gql`
  mutation Mutation($key: String!) {
    signFile(key: $key) {
      url
      fields {
        key
        bucket
        xAmzAlgorithm
        xAmzCredential
        xAmzDate
        Policy
        xAmzSignature
      }
    }
  }
`;
