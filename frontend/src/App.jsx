import React, { useEffect, useState } from "react";
import { v4 as newId } from "uuid";
const App = () => {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [showFinished, setShowFinished] = useState(false);

  useEffect(() => {
    const checkTodoString = localStorage.getItem("todos");
    if (checkTodoString) {
      const todoString = JSON.parse(localStorage.getItem("todos"));
      setTodos(todoString);
    }
  }, []);

  const todoList = (upadted) => {
    localStorage.setItem("todos", JSON.stringify(upadted));
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };
  const handleRemove = (e, id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
    todoList(newTodos);
  };

  const handleAdd = () => {
    const newTodo = [...todos, { id: newId(), todo, isComplited: false }];
    setTodos(newTodo);
    todoList(newTodo);
    setTodo("");
  };

  const handleEdit = (e, id) => {
    const todoFinds = todos.filter((todo) => {
      return todo.id === id;
    });

    setTodo(todoFinds[0].todo);

    const newTodos = todos.filter((todo) => {
      return todo.id !== id;
    });
    setTodos(newTodos);
    todoList(newTodos);
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id == id;
    });
    let newTodos = [...todos];
    newTodos[index].isComplited = !newTodos[index].isComplited;
    setTodos(newTodos);
    todoList(newTodos);
  };
  const togleFinish = () => {
    setShowFinished(() => !showFinished);
  };
  return (
    <div>
      <div>
        <h1>write your task here</h1>
        <input
          type="text"
          placeholder="write todo"
          value={todo}
          onChange={handleChange}
        />
        <button onClick={handleAdd}>Save</button>
      </div>
      <div>
        <input
          type="checkbox"
          id="show"
          onChange={togleFinish}
          checked={showFinished}
        />
        <label htmlFor="show">show finished</label>
      </div>
      <div>
        {todos.length === 0 && <div>No Todos to display</div>}
        {todos.map((item) => {
          return (
            (showFinished || !item.isComplited) && (
              <div key={item.id}>
                <input
                  onChange={handleCheckbox}
                  type="checkbox"
                  checked={item.isComplited}
                  name={item.id}
                />
                <label
                  htmlFor=""
                  style={{
                    textDecoration: item.isComplited ? "line-through" : "",
                  }}
                >
                  {item.todo}
                </label>
                <button onClick={(e) => handleEdit(e, item.id)}>Edit</button>
                <button onClick={(e) => handleRemove(e, item.id)}>
                  remove
                </button>
              </div>
            )
          );
        })}
      </div>
    </div>
  );
};

export default App;
