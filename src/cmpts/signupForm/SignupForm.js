import React, { useState } from "react";
import { Link } from "@reach/router";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { GET_CURRENT_USER } from "../../queries";
import "./SignupForm.scss";

const SIGNUP = gql`
    mutation Signup($email: String!, $password: String!) {
        signup(email: $email, password: $password)
    }
`;

function SignupForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [passwordMatchError, setPasswordMatchError] = useState(false);
    const [signupMutation, signupMutatioResp] = useMutation(SIGNUP);

    const handleSignup = (e) => {
        if (password !== password2) {
            setPasswordMatchError(true);
            return;
        }
        setPasswordMatchError(false);
        signupMutation({ variables: { email, password } });
    };

    return (
        <div className="SignupForm">
            <h1>Sign Up</h1>
            <div className="SignupForm__signup">
                <input type="text" id="email" placeholder="email..." value={email} onChange={(e) => setEmail(e.target.value)} />
                <input
                    type="password"
                    id="password"
                    placeholder="password..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {passwordMatchError ? <div>Passwords do not match</div> : null}
                <input
                    type="password"
                    id="password2"
                    placeholder="re-enter password..."
                    value={password2}
                    onChange={(e) => setPassword2(e.target.value)}
                />
                <button onClick={handleSignup}>Sign Up</button>
            </div>
        </div>
    );
}

export default SignupForm;
