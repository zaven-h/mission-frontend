import { createMutationHook, gql } from '../helpers';

export const useLogin = createMutationHook(gql`
    mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            _id
            email
        }
    }
`);

export const useSignup = createMutationHook(gql`
    mutation Signup($email: String!, $password: String!, $password2: String!) {
        signup(email: $email, password: $password, password2: $password2)
    }
`);

export const useLogout = createMutationHook(gql`
    mutation Logout {
        logout
    }
`);
