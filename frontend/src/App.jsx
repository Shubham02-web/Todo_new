import React, { useEffect, useState } from "react";
import { v4 as uniqueId } from "uuid";
const App = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(false);

  useEffect(() => {
    const stringTodos = localStorage.getItem("todos");
    if (stringTodos) {
      const newTodos = JSON.parse(localStorage.getItem("todos"));
      setTodos(newTodos);
    }
  }, []);

  const handleAddTodos = () => {
    const newTodos = [...todos, { id: uniqueId(), todo, isComplited: false }];
    setTodos(newTodos);
    setTodo("");
    saveTols(newTodos);
  };

  const saveTols = (updated) => {
    localStorage.setItem("todos", JSON.stringify(updated));
  };
  const handleEdit = (e, id) => {
    const t = todos.filter((item) => item.id === id);
    setTodo(t[0].todo);
    const newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveTols(newTodos);
  };

  const handleDelete = (e, id) => {
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveTols(newTodos);
  };
  const handleCheck = (e) => {
    const id = e.target.name;
    const indexTodo = todos.findIndex((item) => {
      return item.id === id;
    });
    const newTodos = [...todos];
    newTodos[indexTodo].isComplited = !newTodos[indexTodo].isComplited;
    setTodos(newTodos);
    saveTols(newTodos);
  };

  const toggleFinished = (params) => {
    setShowFinished(!showFinished);
  };
  return (
    <div>
      <h1>Todo App</h1>
      <div>
        <input
          type="text"
          value={todo}
          placeholder="write Todo"
          onChange={(e) => setTodo(e.target.value)}
        />
        <button onClick={handleAddTodos}>Save</button>
      </div>
      <div>
        <input
          type="checkbox"
          name="show"
          id="show"
          checked={showFinished}
          onClick={toggleFinished}
        />
        <label htmlFor="show">Show Complited</label>
      </div>
      {todos.length === 0 && <h3>No Todos To Display</h3>}
      {todos.map((item) => {
        return (
          (showFinished || !item.isComplited) && (
            <div key={item.id}>
              <div>
                <input
                  onChange={handleCheck}
                  type="checkbox"
                  name={item.id}
                  checked={item.isComplited}
                  className={item.isComplited ? "line-through" : ""}
                  id="chechLine"
                />
                <label
                  htmlFor="checkLine"
                  style={{
                    textDecoration: item.isComplited ? "line-through" : "",
                  }}
                >
                  {item.todo}
                </label>

                <button onClick={(e) => handleEdit(e, item.id)}>Edit</button>
                <button onClick={(e) => handleDelete(e, item.id)}>
                  Remove
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
