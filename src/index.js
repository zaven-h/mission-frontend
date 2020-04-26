import React from "react";
import ReactDOM from "react-dom";

import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import { ApolloProvider } from "@apollo/react-hooks";
// import gql from "graphql-tag";

import App from "./App";
// Set up initial global css vars, mixins, resets, fonts, and styles

import "./index.css";
// import "./styles/setup.scss";

/**
 * Create a new connection/client session for GraphQl
 */
const cache = new InMemoryCache();
const link = new createHttpLink({
    uri: () => {
        if (process.env.NODE_ENV === "production") {
            return "https://mission-backend.herokuapp.com:13042/graphql";
        }
        return "http://localhost:8080/graphql";
    },
    credentials: "include",
});

const client = new ApolloClient({
    cache,
    link,
});

ReactDOM.render(
    <ApolloProvider client={client}>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </ApolloProvider>,
    document.getElementById("root")
);
