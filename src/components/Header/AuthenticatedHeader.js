import React from 'react';
import { useApolloClient } from '@apollo/client';
import { navigate } from '@reach/router';

import { useCurrentUser, LOGGED_IN } from '../../graphql/queries/auth';
import { useLogout } from '../../graphql/mutations/auth';

import './authenticatedHeader.scss';

export default () => {
    const client = useApolloClient();
    const currentUser = useCurrentUser();
    const [logout] = useLogout({
        onCompleted: () => {
            client.writeQuery({
                query: LOGGED_IN,
                data: { isLoggedIn: false },
            });
            navigate('/');
            window.location.reload();
        },
    });

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
