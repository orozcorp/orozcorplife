import { gql } from "@apollo/client";

export const resume = gql`
  type Activity {
    dateStarted: Date!
    logo: String!
    company: String!
    position: String!
    activity: String!
    activityDetail: String!
  }
  type Resume {
    id: ID!
    dateStarted: Date!
    dateEnded: Date
    activity: [Activity!]
    active: Boolean!
  }
  input ActivityInput {
    logo: String!
    dateStarted: Date!
    company: String!
    position: String!
    activity: String!
    activityDetail: String!
  }
  type Query {
    getResume: [Resume!]
    getResumeById(id: ID!): Resume!
  }
  type Mutation {
    addResume(
      dateStarted: Date!
      dateEnded: Date
      activity: [ActivityInput!]
      active: Boolean!
    ): GeneralResponseDataString!
    updateResume(
      id: ID!
      dateStarted: Date!
      dateEnded: Date
      activity: [ActivityInput!]
      active: Boolean!
    ): GeneralResponseDataString!
  }
`;
