import { useApolloClient } from '@apollo/client';
import { createQueryHook, gql } from '../helpers';

export const GET_CURRENT_USER = gql`
    query GetCurrentUser {
        currentUser {
            _id
            email
        }
    }
`;

export const useCurrentUser = createQueryHook(GET_CURRENT_USER);

export const useCurrentOrg = createQueryHook(gql`
    query GetCurrentOrg {
        currentOrg {
            _id
            email
        }
    }
`);

export const LOGGED_IN = gql`
    {
        isLoggedIn
    }
`;

export const useIsLoggedIn = () => {
    const client = useApolloClient();

    const data = client.readQuery({
        query: gql`
            {
                isLoggedIn
            }
        `,
    });
    return data.isLoggedIn;
};