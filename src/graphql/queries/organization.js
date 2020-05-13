import { createQueryHook, gql } from '../helpers';

export const useCurrentOrg = createQueryHook(gql`
    query GetCurrentOrg {
        currentOrg {
            _id
            email
        }
    }
`);

export const GET_ORGANIZATION = gql`
    query GetTaskTree($orgId: String!) {
        org(orgId: $orgId) {
            _id
            properties {
                name
            }
        }
        tasks: getTaskTree(orgId: $orgId) {
            _id
            parent
            properties {
                name
                isPrivate
            }
            assignees {
                email
            }
        }
    }
`;

export const useOrganization = createQueryHook(GET_ORGANIZATION);

export const GET_ORGANIZATIONS = gql`
    query GetOrgs {
        orgs {
            _id
            properties {
                name
            }
        }
    }
`;

export const useAllOrgs = createQueryHook(GET_ORGANIZATIONS);
