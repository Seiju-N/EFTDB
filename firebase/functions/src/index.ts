import { ApolloServer } from "apollo-server-express";
import { resolvers } from "./resolver";
import { testsType } from "./types/tests";
import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import express from "express";

admin.initializeApp();

const app = express();

// サーバーを起動する
const server = new ApolloServer({
  typeDefs: testsType,
  resolvers,
  introspection: true,
});

server
  .start()
  .then(() => {
    server.applyMiddleware({ app, path: "/" });
  });

exports.graphql = functions.https.onRequest(app);
