import React from "react";
import ReactDOM from "react-dom";

import { ApolloClient, InMemoryCache, HttpLink, ApolloProvider, gql } from "@apollo/client";

import App from "./app/App";
// Set up initial global css vars, mixins, resets, fonts, and styles

// import "./index.css";
// import "./styles/setup.scss";

/**
 * Create a new connection/client session for GraphQl
 */
const cache = new InMemoryCache();
const link = new HttpLink({
    uri: () => {
        if (process.env.NODE_ENV === "production") {
            return "https://mission-backend.herokuapp.com/graphql";
        }
        return "http://localhost:8080/graphql";
    },
    credentials: "include",
});

const client = new ApolloClient({
    cache,
    link,
});

const LOGGED_IN = gql`
    {
        isLoggedIn
    }
`;
client.writeQuery({ query: LOGGED_IN, data: { isLoggedIn: false } });

ReactDOM.render(
    <ApolloProvider client={client}>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </ApolloProvider>,
    document.getElementById("root")
);
