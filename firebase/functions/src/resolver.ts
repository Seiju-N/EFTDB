import * as admin from "firebase-admin";

export const resolvers = {
  Query: {
    async tests() {
      const tests = await admin.firestore().collection("tests").get();
      return tests.docs.map((test) => test.data());
    },
  },
};
