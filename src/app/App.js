import React from "react";
import "./styles/setup.scss";
import { Router, Redirect } from "@reach/router";

import useIsLoggedIn from "./hooks/useIsLoggedIn";
import Home from "./pages/public/home/Home";
import LoginForm from "./pages/public/loginForm/LoginForm";
import SignupForm from "./pages/public/signupForm/SignupForm";
import PublicHeader from "./pages/public/header/Header";
import LoadingFallback from "./cmpts/LoadingFallback/LoadingFallback";

import Header from "./pages/authenticated/header/Header";
import OrgsList from "./pages/authenticated/orgsList/OrgsList";
import Outline from "./pages/authenticated/outline/Outline";

import { GET_CURRENT_USER } from "./queries";
import { useQuery, useApolloClient, gql } from "@apollo/client";

function App() {
    /**
     * At the app level see if there is a user logged in. By requesting the current user from the server
     * the cookies in the request will deliver the userId. If it exists it will return the user. If it
     * returns a user, set the local cache isLoggedIn to true.
     */
    const client = useApolloClient();
    const { loading, error, data } = useQuery(GET_CURRENT_USER);
    if (!loading && !error) {
        if (data.currentUser) {
            client.writeQuery({
                query: gql`
                    {
                        isLoggedIn
                    }
                `,
                data: { isLoggedIn: true },
            });
        }
    }
    const isLoggedIn = useIsLoggedIn();

    return loading ? 
        <LoadingFallback /> : (
        <div className="App">
            {/* Set up primary navigation for authenticated or public */}
            {!isLoggedIn ? (
                <>
                    <PublicHeader />
                    <Router>
                        <LoginForm path="/login" />
                    </Router>
                </>
            ) : (
                <>
                    <Header />
                    <Router>
                        <Redirect from="/login" to="/orgs" noThrow />
                        <OrgsList path="/orgs" />
                        <Outline path="/org/:orgId" />
                    </Router>
                </>
            )}

            {/* Public nav should always be available */}
            <Router>
                <Home path="/" />
                <SignupForm path="/signup" />
            </Router>
        </div>
    );
}

export default App;
