const { mergeResolvers } = require("@graphql-tools/merge");

import { uploadsResolver } from "./resolvers/uploadsAndOther";
import { usersResolvers } from "./resolvers/users.resolver";
import { resumeResolvers } from "./resolvers/resume.resolver";
import { portfolioResolvers } from "./resolvers/portfolio.resolver";
import { promptResolvers } from "./resolvers/prompts.resolver";
import { articleResolvers } from "./resolvers/articles.resolver";
import { trabajosResolver } from "./resolvers/trabajos.resolver";
const resolvers = mergeResolvers([
  usersResolvers,
  resumeResolvers,
  uploadsResolver,
  portfolioResolvers,
  promptResolvers,
  articleResolvers,
  trabajosResolver,
]);

export default resolvers;
