import { gql } from "apollo-server-express";
import { DocumentNode } from "graphql";

export const testsType: DocumentNode = gql`
  type Query {
    tests: [Test]
  }
  
  type Test {
    uid: ID!
    text: String!
  }
`;
