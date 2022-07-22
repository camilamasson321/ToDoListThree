import React from "react";

const Inputs = (props) => {
    return (
      <li className="d-flex flex-row justify-spacing-between">
        {props.task}
        <span
          type="button"
          onClick={() => {
            props.onDelete(props.id);
          }}
          className="delete-button"
          placeholder="No task, add a task"
        >
          <i className="fas fa-times"></i>
        </span>
      </li>
    );
  };
  
  export default Inputs;