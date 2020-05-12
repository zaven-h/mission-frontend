import { useQuery } from "@apollo/client";
import { Link } from "@reach/router";
import React, { useState } from "react";
import { GET_ORGS } from "../../../queries";
import OrgCreateForm from "../orgCreateForm/OrgCreateForm";
import "./OrgsList.scss";

export default () => {
    const { loading, error, data } = useQuery(GET_ORGS);

    const [formIsShowing, setFormIsShowing] = useState(false);

    if (loading) return "Loading...";
    if (error) return `Error: ${error.messaage}`;

    return (
        <div className="OrgsList">
            <div className="OrgsList-orgs">
                <ul>
                    {data.orgs &&
                        data.orgs.map((org) => (
                            <li key={org._id}>
                                <Link to={`/org/${org._id}`}>{org.properties.name}</Link>
                            </li>
                        ))}
                </ul>
            </div>
            {!formIsShowing ? (
                <button onClick={() => setFormIsShowing(true)}>Create New Org</button>
            ) : (
                <>
                    <OrgCreateForm />
                    <button onClick={() => setFormIsShowing(false)}>Cancel</button>
                </>
            )}
        </div>
    );
};
