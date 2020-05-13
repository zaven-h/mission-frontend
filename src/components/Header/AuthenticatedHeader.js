import React from 'react';
import { navigate } from '@reach/router';
import jsCookie from 'js-cookie';

import { useCurrentUser } from '../../graphql/queries/auth';

import './authenticatedHeader.scss';

export default () => {
    const currentUser = useCurrentUser();

    const logout = () => {
        const domain = window.location.host.includes("localhost") ? null : "mission-backend.herokuapp.com";
        jsCookie.remove("access-token", { domain: domain, path: "/" }); // added attrs not helping
        jsCookie.remove("refresh-token");
        navigate("/");
        window.location.reload();
    };

    return (
        <div className="Header">
            <div className="Header__nav">
                <div className="Header__nav-left">
                    <div className="Header__logo">Mission</div>
                </div>
                <div className="Header__nav-right">
                    <div className="Header__account">{currentUser.email}</div>
                    <div className="Header__logout">
                        <button onClick={logout}>Log Out</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
