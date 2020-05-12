import { useApolloClient, gql } from "@apollo/client";
// import { useQuery } from "@apollo/client";
// // import { GET_CURRENT_USER } from "../queries";

// const GET_CURRENT_ORG = "";

// export default () => {
//     let { loading, error, data } = useQuery(GET_CURRENT_ORG);

//     if (loading || error) {
//         return null;
//     }

//     if (data.currentOrg) {
//         return data.currentOrg;
//     } else {
//         return false;
//     }
// };

export default () => {
    const client = useApolloClient();

    const data = client.readQuery({
        query: gql`
            {
                currentOrg
            }
        `,
    });
    return data.currentOrg;
};
