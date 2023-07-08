import { gql } from "@apollo/client";

export const resume = gql`
  type Activity {
    dateStarted: Date!
    dateEnded: Date
    position: String!
    activity: String!
    activityDetail: String!
  }
  type Resume {
    _id: ID!
    dateStarted: Date!
    dateEnded: Date
    company: String!
    activity: [Activity!]
    active: Boolean!
  }
  input ActivityInput {
    logo: String!
    dateStarted: Date!

    activity: String!
    activityDetail: String!
  }
  type Query {
    getResume: [Resume!]
    getResumeById(id: ID!): Resume!
  }
  type Mutation {
    addResume(
      logo: String!
      company: String!
      dateStarted: Date!
      dateEnded: Date
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
