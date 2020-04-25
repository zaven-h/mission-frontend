import React, { useState } from "react";
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
        </div>
    );
}

export default LoginForm;
