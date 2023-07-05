import schema from "../../../apollo/config/schema";
import resolvers from "../../../apollo/config/resolvers";
const typeDefs = schema;
import { context } from "../../../apollo/config/context";

import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginLandingPageDisabled } from "@apollo/server/plugin/disabled";
import { startServerAndCreateNextHandler } from "@as-integrations/next";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  csrfPrevention: true,
  cache: "bounded",
  // plugins: [ApolloServerPluginLandingPageDisabled()],
});

const handler = startServerAndCreateNextHandler(server, { context });

export { handler as GET, handler as POST };
