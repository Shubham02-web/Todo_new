import React, { useEffect, useState } from "react";
import axios from "axios";
const App = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [showFinished, setShowFinished] = useState(false);

  const url = "http://localhost:5000/todos";

  const fetchTodos = async () => {
    const newTodos = await axios.get(url);
    setTodos(newTodos.data.todos);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleAddTodos = async (todo) => {
    await axios.post(url, { todo });
    setTodo("");
    fetchTodos();
  };

  const setEditingOption = (id, text) => {
    setEditingId(id);
    setEditingText(text);
  };
  const handleEdit = async (e, id) => {
    await axios.put(`${url}/${id}`, {
      todo,
    });
    fetchTodos();
  };

  const handleDelete = async (e, id) => {
    await axios.delete(`${url}/${id}`);
    fetchTodos();
    setTodo("");
  };
  const handleCheck = async (e, isComplited) => {
    const id = e.target.name;
    await axios.put(`${url}/${id}`, { isComplited: !isComplited });
    fetchTodos();
  };
  const toggleFinished = (params) => {
    setShowFinished(!showFinished);
  };
  const handleChanges = async (id) => {
    await axios.put(`${url}/${id}`, { todo: editingText });
    setEditingId("");
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
        <button onClick={() => handleAddTodos(todo)}>Save</button>
      </div>
      <div>
        <input
          type="checkbox"
          name="show"
          id="show"
          checked={showFinished}
          onChange={toggleFinished}
        />
        <label htmlFor="show">Show Complited</label>
      </div>
      {todos.length === 0 && <h3>No Todos To Display</h3>}
      {todos.map((item) => {
        return (
          (showFinished || !item.isComplited) && (
            <div key={item._id}>
              <div>
                <input
                  onChange={(e) => handleCheck(e, item.isComplited)}
                  type="checkbox"
                  name={item._id}
                  checked={item.isComplited}
                  className={item.isComplited ? "line-through" : ""}
                  id="chechLine"
                />
                {editingId === item._id ? (
                  <>
                    <input
                      type="text"
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                    />
                    <button onClick={() => handleChanges(item._id)}>
                      Save Change
                    </button>
                    <button onClick={() => setEditingId(null)}>Cancel</button>
                  </>
                ) : (
                  <>
                    <label
                      htmlFor="checkLine"
                      style={{
                        textDecoration: item.isComplited ? "line-through" : "",
                      }}
                    >
                      {item.todo}
                    </label>
                    <button
                      onClick={() => setEditingOption(item._id, item.todo)}
                    >
                      Edit
                    </button>
                    <button onClick={(e) => handleDelete(e, item._id)}>
                      Remove
                    </button>
                  </>
                )}
              </div>
            </div>
          )
        );
      })}
    </div>
  );
};

export default App;
