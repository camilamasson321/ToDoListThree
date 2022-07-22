import React, { useState } from "react";
import Inputs from "/workspace/react-hello/src/js/component/Inputs.jsx";


const ToDos = () => {
  const [todoEntered, setTodoEntered] = useState("");
  const [tasks, setTasks] = useState([]);

  function inputValue(e) {
    const itemValue = e.target.value;
    setTodoEntered(itemValue);
  }

  function createPost() {
    //FETCH USING POST METHOD
    fetch("https://assets.breatheco.de/apis/fake/todos/user/usertest21", {
      method: "POST",
      body: JSON.stringify({}),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        console.log(resp.ok); // will be true if the response is successfull
        console.log(resp.status); // the status code = 200 or code = 400 etc.
        return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
      })
      .then((data) => {
        //here is were your code should start after the fetch finishes
        console.log(data); //this will print on the console the exact object received from the server
      })
      .catch((error) => {
        //error handling
        console.log(error);
      });
  }

  function getFetch() {
    //FETCH USING GET METHOD
    fetch("https://assets.breatheco.de/apis/fake/todos/user/usertest21", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        console.log(resp.ok); // will be true if the response is successfull
        console.log(resp.status); // the status code = 200 or code = 400 etc.
        return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
      })
      .then((data) => {
        //here is were your code should start after the fetch finishes
        console.log("Using get method", data); //this will print on the console the exact object received from the server
      })
      .catch((error) => {
        //error handling
        console.log(error);
      });
  }

  function addNewTask(e) {
    if (e.key === "Enter") {
      setTasks((current) => {
        return [...current, todoEntered];
      });
      setTodoEntered("");
    }
  }

  
  function putTasks() {
    //MAPPING OBJECTS
    const todos = tasks.map((item) => {
      return {
        label: item,
        done: false,
      };
    });

    //
    //FETCH USING PUT METHOD
    fetch("https://assets.breatheco.de/apis/fake/todos/user/usertest21", {
      method: "PUT",
      body: JSON.stringify(todos),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        console.log(resp.ok); // will be true if the response is successfull
        console.log(resp.status); // the status code = 200 or code = 400 etc.
        return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
      })
      .then((data) => {
        //here is were your code should start after the fetch finishes
        console.log("Using the PUT method", data); //this will print on the console the exact object received from the server
      })
      .catch((error) => {
        //error handling
        console.log(error);
      });
  }


  function clearFetch(){
    fetch("https://assets.breatheco.de/apis/fake/todos/user/usertest21", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        console.log(resp.ok); // will be true if the response is successfull
        console.log(resp.status); // the status code = 200 or code = 400 etc.
        return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
      })
      .then((data) => {
        //here is were your code should start after the fetch finishes
        console.log("Using the PUT method", data); //this will print on the console the exact object received from the server
      })
      .catch((error) => {
        //error handling
        console.log(error);
      });
      setTasks([])
  }

  function deleteTask(id) {
    setTasks((current) => {
      return current.filter((item, index) => {
        return index != id;
      });
    });
  }

  return (
    <div>
      <button onClick={createPost}>Post</button>
      <button onClick={getFetch}>Get</button>
      <button onClick={putTasks}>Put</button>
      <button onClick={clearFetch}>Clear All</button>
      <h1 className="todo-header">Todos</h1>
      <div className="todos-container d-flex flex-column">
        <div className="todos-container-header d-flex flex-row">
          <span className="me-3">Tasks</span>
          <input
            type="text"
            onChange={inputValue}
            onKeyDown={addNewTask}
            value={todoEntered}
          />
        </div>

        <div className="todos-container-body flex-grow-1">
          <ul>
            {tasks.map((task, index) => (
              <Inputs
                key={index}
                id={index}
                task={task}
                onDelete={deleteTask}
              />
            ))}
          </ul>
        </div>

        <div className="flex-grow-1">
          {tasks.length === 0
            ? "No tasks, add a task"
            : `Number of Tasks: ${tasks.length}`}
        </div>
      </div>
    </div>
  );
};

export default ToDos;

