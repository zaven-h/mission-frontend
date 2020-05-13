import { createMutationHook, gql } from '../helpers';

export const useTaskCreate = createMutationHook(gql`
    mutation AddTask(
        $name: String!
        $parent: String
        $orgId: String!
        $isPrivate: Boolean
    ) {
        addTask(
            name: $name
            parent: $parent
            orgId: $orgId
            isPrivate: $isPrivate
        ) {
            _id
            properties {
                name
            }
            parent
        }
    }
`);
