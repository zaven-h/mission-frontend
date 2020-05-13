import React from 'react';
import ReactDOM from 'react-dom';
import {
    ApolloClient,
    InMemoryCache,
    HttpLink,
    ApolloProvider,
} from '@apollo/client';

import App from './App';
import { LOGGED_IN } from './graphql/queries/auth';
// Set up initial global css vars, mixins, resets, fonts, and styles

// import './index.css';
// import './styles/setup.scss';

/**
 * Create a new connection/client session for GraphQl
 */
const cache = new InMemoryCache();
const link = new HttpLink({
    uri: () => {
        if (process.env.NODE_ENV === 'production') {
            return process.env.REACT_APP_PROD_API_HOST;
        }
        return process.env.REACT_APP_DEV_API_HOST;
    },
    credentials: 'include',
});
const client = new ApolloClient({
    cache,
    link,
});

client.writeQuery({ query: LOGGED_IN, data: { isLoggedIn: false } });

ReactDOM.render(
    <ApolloProvider client={client}>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </ApolloProvider>,
    document.getElementById("root")
);
