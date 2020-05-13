import { useQuery, useMutation, gql } from '@apollo/client';

export { gql, useQuery };

export function createQueryHook(query) {
    return function (variables) {
        return useQuery(query, { variables });
    };
}

export function createMutationHook(mutation) {
    return function (options) {
        return useMutation(mutation, options);
    };
}
