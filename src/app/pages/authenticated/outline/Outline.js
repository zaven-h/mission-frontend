import React, { useState } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import useCurrentUser from "../../../hooks/useCurrentUser";
import "./Outline.scss";

import Task from "../../../cmpts/task/Task";

const GET_ORG = gql`
    query GetTaskTree($orgId: String!) {
        org(orgId: $orgId) {
            _id
            properties {
                name
            }
        }
        tasks: getTaskTree(orgId: $orgId) {
            _id
            parent
            properties {
                name
                isPrivate
            }
            assignees {
                email
            }
        }
    }
`;

const GET_TASKS = gql`
    query GetTasks($orgId: String!) {
        tasks: getTaskTree(orgId: $orgId) {
            _id
            parent
            properties {
                name
                isPrivate
            }
            assignees {
                email
            }
        }
    }
`;

const ADD_TASK = gql`
    mutation AddTask($name: String!, $parent: String, $orgId: String!, $isPrivate: Boolean) {
        addTask(name: $name, parent: $parent, orgId: $orgId, isPrivate: $isPrivate) {
            _id
            properties {
                name
            }
            parent
        }
    }
`;

export default ({ orgId }) => {
    const currentUser = useCurrentUser();
    const [selNodeId, setSelNodeId] = useState(null);

    const { loading, error, data } = useQuery(GET_ORG, { variables: { orgId: orgId } });
    const [addTask] = useMutation(ADD_TASK, { refetchQueries: GET_ORG });
    if (loading) return "Loading...";
    if (error) return `Error: ${error.message}`;

    const addTaskHandler = () => {
        addTask({ variables: { name: "", orgId: orgId } });
    };

    const updateTaskHandler = () => {};

    return (
        <div className="Outline">
            <h3>{data.org && data.org.properties.name}</h3>
            <div>Tasks:</div>
            <div>
                {data.tasks &&
                    data.tasks.map((task) => (
                        <Task
                            key={task._id}
                            taskObj={task}
                            isSelected={selNodeId === task._id}
                            onClick={() => setSelNodeId(task._id)}
                        />
                    ))}
            </div>
            <button onClick={addTaskHandler}>Add Task</button>
        </div>
    );
};
