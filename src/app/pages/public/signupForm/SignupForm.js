import React, { useState } from "react";
import { Link, navigate } from "@reach/router";
import { useMutation, gql } from "@apollo/client";
import "./SignupForm.scss";

const SIGNUP = gql`
    mutation Signup($email: String!, $password: String!, $password2: String!) {
        signup(email: $email, password: $password, password2: $password2)
    }
`;

export default () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [signupMutation, { data, error }] = useMutation(SIGNUP, {
        onError: (error) => {},
        onCompleted: (data) => {
            if (data.signup) {
                navigate("/login");
            }
        },
    });

    return (
        <div className="SignupForm">
            <h1>Sign Up</h1>
            {error &&
                error.graphQLErrors.map(({ message }, i) => (
                    <div key={i} className="error">
                        {message}
                    </div>
                ))}
            <div className="SignupForm__signup">
                <input type="text" id="email" placeholder="email..." value={email} onChange={(e) => setEmail(e.target.value)} />
                <input
                    type="password"
                    id="password"
                    placeholder="password..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    type="password"
                    id="password2"
                    placeholder="re-enter password..."
                    value={password2}
                    onChange={(e) => setPassword2(e.target.value)}
                />
                <button onClick={() => signupMutation({ variables: { email, password, password2 } })}>Sign Up</button>
            </div>
            <div className="SignupForm__login">
                <Link to="/login">Log In</Link>
            </div>
        </div>
    );
};
