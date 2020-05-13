import React from 'react';
import { Router, Redirect } from '@reach/router';
import { useApolloClient } from '@apollo/client';

import Home from './pages/main/Home/Home';
import LoginForm from './pages/auth/Login/LoginForm';
import SignupForm from './pages/auth/Signup/SignupForm';
import PublicHeader from './components/Header/PublicHeader';
import Header from './components/Header/AuthenticatedHeader';
import OrgsList from './pages/organization/OrganizationsList/OrganizationsList';
import TasksList from './pages/task/TasksList/TasksList';
import LoadingFallback from './components/LoadingFallback/LoadingFallback';

import { useCurrentUser, useIsLoggedIn, LOGGED_IN } from './graphql/queries/auth';

import './styles/setup.scss';

function App() {
    /**
     * At the app level see if there is a user logged in. By requesting the current user from the server
     * the cookies in the request will deliver the userId. If it exists it will return the user. If it
     * returns a user, set the local cache isLoggedIn to true.
     */
    const client = useApolloClient();
    const { loading, error, data } = useCurrentUser();

    if (!loading && !error) {
        if (data.currentUser) {
            console.log('data: ', data);
            client.writeQuery({
                query: LOGGED_IN,
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
                        <TasksList path="/org/:orgId" />
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
