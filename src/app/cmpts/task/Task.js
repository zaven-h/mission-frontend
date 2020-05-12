import React, { useState } from "react";
import "./Task.scss";

export default ({ taskObj, isSelected }) => {
    const [name, setName] = useState(taskObj.properties.name);

    return (
        <div className={`Task ${isSelected ? "selected" : ""}`}>
            <input className="Task__name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
    );
};
