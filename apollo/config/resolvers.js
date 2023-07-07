const { mergeResolvers } = require("@graphql-tools/merge");

import { uploadsResolver } from "./resolvers/uploadsAndOther";
import { usersResolvers } from "./resolvers/users.resolver";
import { resumeResolvers } from "./resolvers/resume.resolver";
const resolvers = mergeResolvers([
  usersResolvers,
  resumeResolvers,
  uploadsResolver,
]);

export default resolvers;
