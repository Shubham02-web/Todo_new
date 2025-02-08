import React, { useEffect, useState } from "react";
import { uuidv4 as newId } from "uuid";
const App = () => {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [showFinished, setShowFinished] = useState(false);

  useEffect(() => {
    const todoString = localStorage.getItem("todos");
    if (todoString) {
      const fetchTodos = JSON.parse(localStorage.getItem("todos"));
      setTodos(fetchTodos);
    }
  });
  const updateTodoList = (updatedTodo) => {
    localStorage.setItem("todos", JSON.stringify(updatedTodo));
  };

  const updateToggle = (params) => {
    setShowFinished(!showFinished);
  };

  const addTodo = () => {
    const newTodo = [...todos, { id: newId(), todo, isComplited: false }];
    setTodos(newTodo);
    updateTodoList(newTodo);
    setTodo("");
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  return <div></div>;
};

export default App;
