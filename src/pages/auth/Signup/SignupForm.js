import React, { useState } from 'react';
import { Link, navigate } from '@reach/router';

import { useSignup } from '../../../graphql/mutations/auth';

import './signupForm.scss'

export default () => {
    const [userInfo, setUserInfo] = useState({
        email: '',
        password: '',
        password2: '',
    });
    const [doSignup, { error }] = useSignup({
        variables: { ...userInfo },
        onError: (error) => {},
        onCompleted: (data) => {
            if (data.signup) {
                navigate('/login');
            }
        },
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setUserInfo({ ...userInfo, [name]: value });
    };

    return (
        <div className="SignupForm">
            <h1>Sign Up</h1>
            {error && error.graphQLErrors.map(({ message }, i) => (
                <div key={i} className="error">
                    {message}
                </div>
            ))}
            <div className="SignupForm__signup">
                <input type="email" name="email" placeholder="email..." value={userInfo.email} onChange={handleChange} />
                <input
                    type="password"
                    name="password"
                    placeholder="password..."
                    value={userInfo.password}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="password2"
                    placeholder="re-enter password..."
                    value={userInfo.password2}
                    onChange={handleChange}
                />
                <button onClick={doSignup}>Sign Up</button>
            </div>
            <div className="SignupForm__login">
                <Link to="/login">Log In</Link>
            </div>
        </div>
    );
};
