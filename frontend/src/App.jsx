import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
const App = () => {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [showFinished, setShowFinished] = useState(false);
  useEffect(() => {
    const stringTodo = localStorage.getItem("todos");
    if (stringTodo) {
      const todoString = JSON.parse(localStorage.getItem("todos"));
      setTodos(todoString);
    }
  }, []);

  const todolist = (updated) => {
    localStorage.setItem("todos", JSON.stringify(updated));
  };

  const handleToggle = () => {
    setShowFinished(!showFinished);
  };
  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleEdit = (e, id) => {
    const editTodo = todos.filter((todo) => todo.id == id);
    setTodo(editTodo[0].todo);
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
    todolist(newTodos);
  };

  const handleAdd = () => {
    const newTodos = [...todos, { id: uuidv4(), todo, isComplited: false }];
    setTodos(newTodos);
    todolist(newTodos);
    setTodo("");
  };
  const handleDelete = (e, id) => {
    const newTodos = todos.filter((todo) => {
      return todo.id !== id;
    });
    setTodos(newTodos);
    todolist(newTodos);
  };

  const handleCheck = (e) => {
    const id = e.target.name;
    const index = todos.findIndex((item) => {
      return item.id === id;
    });
    let newTodos = [...todos];
    newTodos[index].isComplited = !newTodos[index].isComplited;
    setTodos(newTodos);
    todolist(newTodos);
  };
  return (
    <div>
      <h1>Write your todos here </h1>
      <input
        type="text"
        placeholder="write"
        value={todo}
        onChange={handleChange}
      />
      <button onClick={handleAdd}>Save</button>

      {todos.length === 0 && <h3>No Todos To display</h3>}
      <div>
        <input
          type="checkbox"
          onChange={handleToggle}
          checked={showFinished}
          id="show"
        />
        <label htmlFor="show">Show Finished</label>
      </div>
      {todos.map((item) => {
        return (
          (showFinished || !item.isComplited) && (
            <div key={item.id}>
              <div>
                <input
                  type="checkbox"
                  name={item.id}
                  id="checkForComplete"
                  onChange={handleCheck}
                  checked={item.isComplited}
                />
                <label
                  htmlFor="checkForComplete"
                  style={{
                    textDecoration: item.isComplited ? "line-through" : "",
                  }}
                >
                  {item.todo}
                </label>
                <button onClick={(e) => handleEdit(e, item.id)}>edit</button>
                <button onClick={(e) => handleDelete(e, item.id)}>
                  remove
                </button>
              </div>
            </div>
          )
        );
      })}
    </div>
  );
};

export default App;
