import React, { useEffect, useRef, useState } from 'react'

const App = () => {

  const taskInputRef = useRef(null);
  const [tasks, setTasks] = useState([]);

  const fromHandler = (e) => {
    e.preventDefault();
    let currentTaskValue = taskInputRef.current.value;

    if (currentTaskValue !== "") {
      setTasks([...tasks, currentTaskValue])
      taskInputRef.current.value = "";
    }
  }

  useEffect(() => {
    const sendData = async () => {
      try {
        const response = await fetch("http://localhost:8000", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(tasks),
        });

        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };

    sendData();
  }, [tasks]);

  return (
    <div className="flex justify-center items-center h-screen">

      <form action="" onSubmit={fromHandler} className=" bg-gray-100 w-1/3 h-2/3 p-4 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-gray-800 text-center">To-Do List</h1>
        <div className="w-full flex gap-2">
          <input ref={taskInputRef} type="text" placeholder="Enter a task..." className="bg-gray-200 w-full text-gray-700 placeholder:text-gray-500 border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 shrink-0 active:scale-95 text-white font-bold py-2 px-4 rounded-md">Add Task</button>
        </div>

        <div className="">
          <div className="mt-4 flex justify-between items-center text-sm text-gray-500 border-t pt-4">
            <span>Total Tasks: 1</span>
            <button type='button' className="text-red-400 hover:text-red-600">Clear All</button>
          </div>

          {/* Task list will go here */}

          <ul className="mt-6 space-y-3 overflow-y-auto max-h-64">
            <li className="flex justify-between items-center bg-white p-3 rounded-md shadow-sm border border-gray-200">
              <span className="text-gray-700">Example Task</span>
              <div className="flex gap-5">
                <button type='button' className="text-blue-500 hover:text-blue-700 font-medium">Edit</button>
                <button type='button' className="text-red-500 hover:text-red-700 font-medium">Delete</button>
              </div>
            </li>
          </ul>

        </div>
      </form>

    </div>
  )
}

export default App  