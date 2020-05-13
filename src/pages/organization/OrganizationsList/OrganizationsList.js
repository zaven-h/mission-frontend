import React, { useState } from 'react';
import { Link } from '@reach/router';

import OrgCreateForm from '../OrganizationCreateForm/OrganizationCreateForm';
import LoadingFallback from '../../../components/LoadingFallback/LoadingFallback';
import { useAllOrgs } from '../../../graphql/queries/organization';

import './organizationsList.scss';

export default () => {
    const [isShowForm, setIsShowForm] = useState(false);
    const { loading, error, data } = useAllOrgs();

    if (loading) return <LoadingFallback />;
    if (error) return `Error: ${error.messaage}`;

    return (
        <div className="OrgsList">
            <div className="OrgsList-orgs">
                <ul>
                    {data.orgs &&
                        data.orgs.map(org => (
                            <li key={org._id}>
                                <Link to={`/org/${org._id}`}>
                                    {org.properties.name}
                                </Link>
                            </li>
                        ))}
                </ul>
            </div>
            {!isShowForm ? (
                <button onClick={() => setIsShowForm(true)}>
                    Create New Org
                </button>
            ) : (
                <>
                    <OrgCreateForm />
                    <button onClick={() => setIsShowForm(false)}>Cancel</button>
                </>
            )}
        </div>
    );
};
