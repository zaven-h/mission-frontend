import React from "react";
import "./App.scss";
import { Router } from "@reach/router";

import { useIsLoggedIn } from "./hooks";
import LoginForm from "./cmpts/loginForm/LoginForm";
import SignupForm from "./cmpts/signupForm/SignupForm";
import OrgsList from "./cmpts/orgsList/OrgsList";
import Header from "./cmpts/header/Header";

function App() {
    const isLoggedIn = useIsLoggedIn();

    return (
        <div className="App">
            {!isLoggedIn ? (
                <Router>
                    <LoginForm path="/" />
                    <SignupForm path="signup" />
                </Router>
            ) : (
                <>
                    <Header /> <OrgsList />
                </>
            )}
        </div>
    );
}

export default App;
