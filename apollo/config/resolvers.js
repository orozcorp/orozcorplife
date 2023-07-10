const { mergeResolvers } = require("@graphql-tools/merge");

import { uploadsResolver } from "./resolvers/uploadsAndOther";
import { usersResolvers } from "./resolvers/users.resolver";
import { resumeResolvers } from "./resolvers/resume.resolver";
import { portfolioResolvers } from "./resolvers/portfolio.resolver";
const resolvers = mergeResolvers([
  usersResolvers,
  resumeResolvers,
  uploadsResolver,
  portfolioResolvers,
]);

export default resolvers;
