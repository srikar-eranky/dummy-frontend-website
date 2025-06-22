import React, { useState } from "react";

function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: "Learn React", completed: false },
    { id: 2, text: "Write tests with Playwright", completed: false },
    { id: 3, text: "Find and fix bugs", completed: true },
  ]);
  const [newTodo, setNewTodo] = useState("");
  const [filter, setFilter] = useState("all");

  const addTodo = () => {
    if (newTodo.trim()) {
      const newId =
        todos.length > 0 ? Math.max(...todos.map((t) => t.id)) + 1 : 1;
      setTodos([
        ...todos,
        { id: newId, text: newTodo.trim(), completed: false },
      ]);
      setNewTodo("");
    }
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // BUG: Delete all button doesn't work properly - it only deletes completed todos
  const deleteAll = () => {
    // Intentional bug: should delete all todos, but only deletes completed ones
    setTodos(todos.filter((todo) => !todo.completed));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addTodo();
    }
  };

  return (
    <div className="page">
      <h1>Todo List</h1>

      <div style={{ marginBottom: "2rem" }}>
        <h2>Add New Todo</h2>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter a new todo..."
            data-testid="new-todo-input"
            style={{ flex: 1 }}
          />
          <button onClick={addTodo} data-testid="add-todo-btn">
            Add Todo
          </button>
        </div>
      </div>

      <div style={{ marginBottom: "2rem" }}>
        <h2>Filter Todos</h2>
        <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
          <button
            onClick={() => setFilter("all")}
            className={filter === "all" ? "active" : ""}
            data-testid="filter-all-btn"
          >
            All ({todos.length})
          </button>
          <button
            onClick={() => setFilter("active")}
            className={filter === "active" ? "active" : ""}
            data-testid="filter-active-btn"
          >
            Active ({todos.filter((t) => !t.completed).length})
          </button>
          <button
            onClick={() => setFilter("completed")}
            className={filter === "completed" ? "active" : ""}
            data-testid="filter-completed-btn"
          >
            Completed ({todos.filter((t) => t.completed).length})
          </button>
        </div>

        <button
          onClick={deleteAll}
          data-testid="delete-all-btn"
          style={{ backgroundColor: "#dc3545" }}
        >
          Delete All
        </button>
        <p>
          <small>Bug: Delete All only deletes completed todos</small>
        </p>
      </div>

      <div>
        <h2>Todo Items</h2>
        {filteredTodos.length === 0 ? (
          <p>No todos found.</p>
        ) : (
          <div data-testid="todo-list">
            {filteredTodos.map((todo) => (
              <div
                key={todo.id}
                className={`todo-item ${todo.completed ? "completed" : ""}`}
                data-testid={`todo-item-${todo.id}`}
              >
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                  data-testid={`todo-checkbox-${todo.id}`}
                />
                <span data-testid={`todo-text-${todo.id}`} style={{ flex: 1 }}>
                  {todo.text}
                </span>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  data-testid={`delete-todo-${todo.id}`}
                  style={{
                    backgroundColor: "#dc3545",
                    padding: "0.25rem 0.5rem",
                  }}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div
        style={{
          marginTop: "2rem",
          padding: "1rem",
          backgroundColor: "#f8f9fa",
          borderRadius: "4px",
        }}
      >
        <h3>Statistics</h3>
        <p>
          Total todos: <strong data-testid="total-todos">{todos.length}</strong>
        </p>
        <p>
          Completed:{" "}
          <strong data-testid="completed-todos">
            {todos.filter((t) => t.completed).length}
          </strong>
        </p>
        <p>
          Active:{" "}
          <strong data-testid="active-todos">
            {todos.filter((t) => !t.completed).length}
          </strong>
        </p>
      </div>
    </div>
  );
}

export default TodoList;
