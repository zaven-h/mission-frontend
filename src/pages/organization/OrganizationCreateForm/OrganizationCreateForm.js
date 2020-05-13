import React, { useState } from 'react';

import { GET_ORGANIZATIONS } from '../../../graphql/queries/organization';
import { useCreateOrganization } from '../../../graphql/mutations/organization';

export default () => {
    const [orgNameInput, setOrgNameInput] = useState('');
    const [createOrganization] = useCreateOrganization({
        variables: { name: orgNameInput },
        refetchQueries: [{ query: GET_ORGANIZATIONS }],
    });

    return (
        <div className="OrgCreateForm">
            <div>
                <h3>Create a new organization</h3>
                <input
                    type="text"
                    value={orgNameInput}
                    onChange={e => setOrgNameInput(e.target.value)}
                    placeholder="Name of Organization"
                />
                <button onClick={createOrganization}>Create!</button>
            </div>
        </div>
    );
};
