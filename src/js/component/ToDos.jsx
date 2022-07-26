import React, { useState } from "react";
import Inputs from "/workspace/ToDoListThree/src/js/component/Inputs.jsx";

const ToDos = () => {
  const [inputValue, setInputValue] = useState("");
  const [tasks, setTasks] = useState([]);

  function handleChange(e) {
    setInputValue(e.target.value);
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
    // if (e.key === "Enter")
    //   return tasks.map((task, index) => {
    //   });
  
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
        console.log("Using get method", data);
        // setTasks(data);
      })
      .catch((error) => {
        //error handling
        console.log(error);
      });
  }

  // function printNewTask(e) {
  //   if (e.key === "Enter") {
  //     setTasks((tasks) => {
  //       return [...tasks, inputValue];
  //     });
  //     setInputValue("");
  //   }
  // }

  // const printList = tasks.map((tasks, inputValue));

  function addNewTask(e) {
    console.log("e.key", e.key);
    if (e.key === "Enter") {
      let newTask = {
        label: inputValue,
        done: false,
      };
      tasks.push(newTask);
      console.log("#task000", tasks);

      fetch("https://assets.breatheco.de/apis/fake/todos/user/usertest21", {
        method: "PUT",
        body: JSON.stringify(tasks),
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
          console.log("Using the PUT method", data); 
          getFetch()
        })
        .catch((error) => {
          //error handling
          console.log(error);
        });
      setInputValue("")
    }
  }

  function clearFetch() {
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
    setTasks([]);
  }

  function deleteTask(id) {
    setTasks((tasks) => {
      return tasks.filter((task, index) => {
        return index != id;
      });
    });
  }
  console.log("tasks", tasks)
  return (
    <div>
      <h1 className="todo-header">Todos</h1>
      <div className="todos-container d-flex flex-column">
        <div className="todos-container-header d-flex flex-row justify-content-center">
          <input
            type="text"
            onChange={handleChange}
            onKeyDown={addNewTask}
            onClick={getFetch}
            value={inputValue}
            placeholder="No task, add a task"
          />
        </div>

        <div className="todos-container-header d-flex flex-row justify-content-center">
          <ul>
            {tasks.map((task, index) => (
              <Inputs
                key={index}
                id={index}
                task={task.label}
                onDelete={deleteTask}
              />
            ))}
          </ul>
        </div>

        <div className="d-flex justify-content-center">
          {/* <span
            type="button"
            className="btn btn-outline-info"
            onClick={createPost}
          >
            Create List
          </span> */}
          {/* <button
            type="button"
            className="btn btn-outline-info"
            onKeyDown={getFetch}
          >
            Get
          </button> */}
          {/* <button
            type="button"
            className="btn btn-outline-info"
            onClick={putTasks}
          >
            Put
          </button> */}
          <button
            type="button"
            className="btn btn-outline-info"
            onClick={clearFetch}
          >
            Delete All
          </button>
        </div>
      </div>
    </div>
  );
};

export default ToDos;
