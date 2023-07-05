const { mergeResolvers } = require("@graphql-tools/merge");

import { medicosResolvers } from "./resolvers/medicos.resolver";
import { uploadsResolver } from "./resolvers/uploadsAndOther";
import { usersResolvers } from "./resolvers/users.resolver";

const resolvers = mergeResolvers([
  usersResolvers,
  uploadsResolver,
  medicosResolvers,
]);

export default resolvers;
