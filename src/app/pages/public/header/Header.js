import { Link, navigate } from "@reach/router";
import React from "react";
import "./Header.scss";

export default () => {
    return (
        <div className="Header">
            <div className="Header__nav">
                <div className="Header__nav-left">
                    <div className="Header__logo" onClick={() => navigate("/")}>
                        Mission
                    </div>
                </div>
                <div className="Header__nav-right">
                    <div>
                        <Link to="login">Log In</Link>
                    </div>
                    <div>
                        <Link to="signup">Sign Up</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
