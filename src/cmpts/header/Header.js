import React from "react";
import { useQuery } from "@apollo/react-hooks";
import jsCookie from "js-cookie";
import { GET_ORGS } from "../../queries";
import "./Header.scss";
import { useCurrentUser } from "../../hooks";

function Header() {
    const currentUser = useCurrentUser();

    const orgsQuery = useQuery(GET_ORGS);

    // TODO - LOGOUT STILL NOT WORKING IN PRODUCTION
    const logout = () => {
        const domain = window.location.host.includes("localhost") ? null : "mission-backend.herokuapp.com";
        jsCookie.remove("access-token", { domain: domain, path: "/" }); // added attrs not helping
        jsCookie.remove("refresh-token");
        window.location.reload();
    };

    if (orgsQuery.loading || orgsQuery.error) return null;
    const { data } = orgsQuery;

    return (
        <div className="Header">
            <div className="Header__nav">
                <div className="Header__nav-left">
                    <div className="Header__logo">Mission</div>
                </div>
                <div className="Header__nav-right">
                    <div className="Header__orgs">
                        {!data.orgs.length ? (
                            <a href="/orgs/create">Start New Org</a>
                        ) : (
                            <ul>
                                {data.orgs.map((org, n) => (
                                    <li>{org.name}</li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <div className="Header__account">{currentUser.email}</div>
                    <div className="Header__logout">
                        <button onClick={logout}>Log Out</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
