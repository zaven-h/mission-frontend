import React from "react";
import { Link } from "@reach/router";
import "./Home.scss";

function Home() {
    return (
        <div className="Home">
            <h1>Landing Page</h1>
            <div>
                <Link to="login">Log In</Link>
            </div>
            <div>
                <Link to="signup">Sign Up</Link>
            </div>
        </div>
    );
}

export default Home;
