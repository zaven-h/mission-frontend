import React, { useState } from 'react';
import { Link, navigate } from '@reach/router';

import { useLogin } from '../../../graphql/mutations/auth';
import { GET_CURRENT_USER } from '../../../graphql/queries/auth';

import './loginForm.scss';

function LoginForm () {
    const [userInfo, setUserInfo] = useState({
        email: '',
        password: '',
    });
    const [doLogin, { error }] = useLogin({
        variables: userInfo,
        refetchQueries: [{ query: GET_CURRENT_USER }],
        onError: (error) => {},
        onCompleted: () => navigate('/orgs'),
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserInfo({
            ...userInfo,
            [name]: value
        });
    }

    return (
        <div className="LoginForm">
            <h1>Log In</h1>
            {error && 
                error.graphQLErrors.map(({ message }, i) => (
                    <div key={i} className="error">
                        {message}
                    </div>
                ))
            }
            <div className="LoginForm__login">
                <input type="email" name="email" placeholder="email..." value={userInfo.email} onChange={handleChange} />
                <input
                    type="password"
                    name="password"
                    placeholder="password..."
                    value={userInfo.password}
                    onChange={handleChange}
                />
                <button onClick={doLogin}>Log In</button>
            </div>
            <div className="LoginForm__signup">
                <Link to="/signup">Create Account</Link>
            </div>
        </div>
    );
}

export default LoginForm;