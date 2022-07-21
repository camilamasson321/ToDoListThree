import React, { useState } from "react";
import Inputs from "./Inputs.jsx";


const ToDos = () => {
  const props = useContext(Context);
  const [inputValue, setInputValue] = useState(""); 

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const passNewTask = (e) => {
    if (e.key === "Enter") {
      props.addTodo(inputValue);
      setInputValue(" ");
    }
  };

  function deleteTask(e) {
    props.removeTodoFromList(e);
  }

  // console.log("todoList5555####", todoList);
  const listItems = props.todoList.map((item, index) => {
    return (
      <li
        key={index}
        className="d-flex flex-row justify-spacing-between"
        onClick={(e) => deleteTask(e)}
      >
        {item}
        <span className="deletebutton"
        type="button">
          <AiOutlineClose  onClick={() => deleteTask(item)} className="icon" />
        </span>
      </li>
    );
  });

  return (
    <div className="app">
      <h1>TO DO</h1>
      <div className="container d-flex flex-column">
      <div className="todos-container-header d-flex flex-row">
        
        <input
          name="todo"
          onChange={handleChange}
          value={inputValue}
          onKeyDown={passNewTask}
          placeholder="No task, add a task"
        />
        </div>
        <div className="todos-container-body flex-grow-1">
                  <ul>{listItems}</ul>
        </div>
      </div>
    </div>
  );
};

export default ToDos;
