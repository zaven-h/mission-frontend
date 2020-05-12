import { useQuery, useApolloClient, gql } from "@apollo/client";
import { GET_CURRENT_USER } from "../queries";

const LOGGED_IN = gql`
    {
        isLoggedIn
    }
`;

export default () => {
    const client = useApolloClient();
    const { loading, error, data } = useQuery(GET_CURRENT_USER);

    if (loading || error || !data) {
        client.writeQuery({ query: LOGGED_IN, data: { isLoggedIn: false } });
        return false;
    }

    if (data.currentUser) {
        client.writeQuery({ query: LOGGED_IN, data: { isLoggedIn: true } });
        return data.currentUser;
    } else {
        client.writeQuery({ query: LOGGED_IN, data: { isLoggedIn: false } });
        return false;
    }
};
