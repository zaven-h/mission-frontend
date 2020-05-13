import React, { useState } from 'react';

import LoadingFallback from '../../../components/LoadingFallback/LoadingFallback';
import TaskDetail from '../TaskDetail/TaskDetail';
import {
    GET_ORGANIZATION,
    useOrganization,
} from '../../../graphql/queries/organization';
import { useTaskCreate } from '../../../graphql/mutations/task';

import './tasksList.scss';

function TasksList({ orgId }) {
    const [selNodeId, setSelNodeId] = useState(null);

    const { loading, error, data } = useOrganization({ orgId });
    const [addTask] = useTaskCreate({
        variables: { name: '', orgId: orgId },
        refetchQueries: GET_ORGANIZATION,
    });

    if (loading) return <LoadingFallback />;
    if (error) return `Error: ${error.message}`;

    return (
        <div className="Outline">
            <h3>{data.org && data.org.properties.name}</h3>
            <div>Tasks:</div>
            <div>
                {data.tasks &&
                    data.tasks.map(task => (
                        <TaskDetail
                            key={task._id}
                            taskObj={task}
                            isSelected={selNodeId === task._id}
                            onClick={() => setSelNodeId(task._id)}
                        />
                    ))}
            </div>
            <button onClick={addTask}>Add Task</button>
        </div>
    );
}

export default TasksList;
