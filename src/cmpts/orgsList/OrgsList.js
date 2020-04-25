import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

const GET_ORGS = gql`
    query GetOrgs {
        orgs {
            _id
            properties {
                name
            }
        }
    }
`;

function OrgsList() {
    const { loading, error, data } = useQuery(GET_ORGS);

    if (loading || error) return null;

    return (
        <div className="OrgsList">
            <header className="OrgsList-header">
                <ul>{data.orgs && data.orgs.map((org, n) => <li key={n}>{org.properties.name}</li>)}</ul>
            </header>
        </div>
    );
}

export default OrgsList;
