import { useApolloClient, gql } from "@apollo/client";

export default () => {
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
