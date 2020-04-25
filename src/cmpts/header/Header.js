import React from "react";
import { useQuery } from "@apollo/react-hooks";
import jsCookie from "js-cookie";
import { GET_CURRENT_USER } from "../../queries";

function Header() {
    const { loading, error, data } = useQuery(GET_CURRENT_USER);

    const logout = async () => {
        jsCookie.remove("access-token");
        jsCookie.remove("refresh-token");
        window.location.reload();
    };

    if (loading || error) return null;

    return (
        <div className="Header">
            <span>{data.currentUser.email}</span>
            <button onClick={logout}>Log Out</button>
        </div>
    );
}

export default Header;
