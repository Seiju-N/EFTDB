import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { HashRouter as Router } from "react-router-dom";

import App from "./App";

import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://api.tarkov.dev/graphql",
  cache: new InMemoryCache(),
});
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Router basename={process.env.PUBLIC_URL}>
        <App />
      </Router>
    </ApolloProvider>
  </React.StrictMode>
);
