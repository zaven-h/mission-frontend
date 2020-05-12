import { gql } from "@apollo/client";

export const GET_CURRENT_USER = gql`
    query GetCurrentUser {
        currentUser {
            _id
            email
        }
    }
`;

export const GET_CURRENT_ORG = gql`
    query GetCurrentOrg {
        currentOrg {
            _id
            email
        }
    }
`;

export const GET_ORGS = gql`
    query GetOrgs {
        orgs {
            _id
            properties {
                name
            }
        }
    }
`;
