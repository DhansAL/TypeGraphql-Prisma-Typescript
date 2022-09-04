import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { PrismaClient } from "@prisma/client";
import { __prod__ } from "./constants";
import { buildSchema } from "type-graphql";

// Custom resolvers
import { SampleCustomResolver } from "./Resolvers/SampleCustom.resolver";

// autogenrerated resolvers by type-graphql
// import { resolvers } from "../prisma/generated/type-graphql";

async function main() {
  const prisma = new PrismaClient({ log: !__prod__ ? ["query"] : undefined });
  const app = express();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [
        SampleCustomResolver,
        // emitSchemaFile: path.resolve(__dirname, "./generated-schema.graphql"), //generates a graphql SDL
      ],
      // resolvers,//  , comment above and pass if you want all autogen resolvers, or select the one you want. read docs.
      validate: false, // default schema validation, set false for typegraphql to work properly.
    }),
    context: () => ({ prisma }),
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.info("info", "SERVER STARTED @ 4000");
  });
}
main().catch((e) => {
  console.error("error-occured:", e.message);
});
