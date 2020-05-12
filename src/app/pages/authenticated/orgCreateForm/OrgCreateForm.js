import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { GET_ORGS } from "../../../queries";

const CREATE_ORG = gql`
    mutation CreateOrg($name: String!) {
        createOrg(name: $name) {
            _id
            properties {
                name
            }
        }
    }
`;

export default () => {
    // const { loading, error, data } = useQuery(GET_ORGS);

    const [formIsShowing, setFormIsShowing] = useState(false);
    const [orgNameInput, setOrgNameInput] = useState("");

    const [createOrgMutation, { error }] = useMutation(CREATE_ORG, {
        refetchQueries: [{ query: GET_ORGS }],
        // onError: (error) => {},
        // onCompleted: () => {
        //     navigate("/orgs");
        // },
    });

    // if (loading || error) return null;

    const createNewOrg = () => {
        createOrgMutation({ variables: { name: orgNameInput } });
    };

    return (
        <div className="OrgCreateForm">
            <div>
                <h3>Create a new organization</h3>
                <input
                    type="text"
                    value={orgNameInput}
                    onChange={(e) => setOrgNameInput(e.target.value)}
                    placeholder="Name of Organization"
                />
                <button onClick={createNewOrg}>Create!</button>
            </div>
        </div>
    );
};
