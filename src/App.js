import React from "react";
import "./App.scss";
import { Router } from "@reach/router";

import { useIsLoggedIn } from "./hooks";
import Home from "./cmpts/home/Home";
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
                    <Home path="/" />
                    <LoginForm path="/login" />
                    <SignupForm path="/signup" />
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
