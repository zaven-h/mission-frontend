import React from "react";
import { useQuery } from "@apollo/react-hooks";
import jsCookie from "js-cookie";
import { GET_CURRENT_USER } from "../../queries";
import "./Header.scss";

function Header() {
    const { loading, error, data } = useQuery(GET_CURRENT_USER);

    const logout = () => {
        const domain = window.location.host.includes("localhost") ? null : "mission-backend.herokuapp.com";
        jsCookie.remove("access-token", { domain: domain });
        jsCookie.remove("refresh-token");
        console.log("foo");
        // window.location.reload();
    };

    if (loading || error) return null;

    return (
        <div className="Header">
            <span>{data.currentUser.email}</span>
            <div>You're logged in</div>
            <button onClick={logout}>Log Out</button>
        </div>
    );
}

export default Header;
