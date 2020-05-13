import React, { useState } from 'react';

import { useTaskCreate } from '../../../graphql/mutations/task';
import { GET_ORGANIZATION } from '../../../graphql/queries/organization';

import './taskDetail.scss';

function TaskDetail({ taskObj, isSelected }) {
    const [name, setName] = useState(taskObj.properties.name);
    const [assignees, setAssignees] = useState(taskObj.assignees);

    const [addTask] = useTaskCreate({
        variables: { name: '', orgId: taskObj.orgId },
        refetchQueries: GET_ORGANIZATION,
    });

    return (
        <div className={`Task ${isSelected ? 'selected' : ''}`}>
            <input
                className="Task__name"
                value={name}
                onChange={e => setName(e.target.value)}
            />
            <input
                className="Task__assignees"
                value={assignees.join()}
                onChange={e => setAssignees(e.target.value.split(','))}
            />
            <button onClick={addTask}>Add Task</button>
        </div>
    );
}

export default TaskDetail;
