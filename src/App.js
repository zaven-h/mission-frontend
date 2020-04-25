import React from "react";
import "./App.scss";
import LoginForm from "./cmpts/loginForm/LoginForm";
import OrgsList from "./cmpts/orgsList/OrgsList";
import { useIsLoggedIn } from "./hooks";
import Header from "./cmpts/header/Header";

function App() {
    const isLoggedIn = useIsLoggedIn();

    return (
        <div className="App">
            {!isLoggedIn ? (
                <LoginForm />
            ) : (
                <>
                    <Header /> <OrgsList />
                </>
            )}
        </div>
    );
}

export default App;
