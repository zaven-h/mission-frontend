import { createMutationHook, gql } from '../helpers';

export const useCreateOrganization = createMutationHook(gql`
    mutation CreateOrg($name: String!) {
        createOrg(name: $name) {
            _id
            properties {
                name
            }
        }
    }
`);
