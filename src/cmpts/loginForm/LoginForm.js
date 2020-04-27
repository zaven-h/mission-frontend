import React, { useState } from "react";
import { Link } from "@reach/router";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { GET_CURRENT_USER } from "../../queries";
import "./LoginForm.scss";

const LOGIN = gql`
    mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            _id
            email
        }
    }
`;

function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loginMutation, loginMutatioResp] = useMutation(LOGIN, {
        refetchQueries: [{ query: GET_CURRENT_USER }],
    });

    return (
        <div className="LoginForm">
            <h1>Log In</h1>
            <div className="LoginForm__login">
                <input type="text" id="email" placeholder="email..." value={email} onChange={(e) => setEmail(e.target.value)} />
                <input
                    type="password"
                    id="password"
                    placeholder="password..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={() => loginMutation({ variables: { email, password } })}>Log In</button>
            </div>
            <div className="LoginForm__signup">
                <Link to="signup">Create Account</Link>
            </div>
        </div>
    );
}

export default LoginForm;
