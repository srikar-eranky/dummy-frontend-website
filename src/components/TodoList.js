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
      {/* 
        TODO LIST PAGE - Full CRUD operations for todo management
        Purpose: Test todo creation, completion, deletion, filtering, and bug detection
        Initial State: 3 todos (2 active, 1 completed)
      */}

      <h1>Todo List</h1>

      {/* 
        ADD TODO SECTION - Create new todo items
        Expected Behavior:
        - User can type in input field
        - Press Enter or click "Add Todo" to create new todo
        - Input should clear after adding todo
        - New todo should appear in list with unique ID
        - Empty todos should not be added
      */}
      <div style={{ marginBottom: "2rem" }}>
        <h2>Add New Todo</h2>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          {/* 
            NEW TODO INPUT - Text input for creating todos
            Test: Type text, press Enter or click Add Todo, verify todo appears in list
          */}
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter a new todo..."
            data-testid="new-todo-input"
            style={{ flex: 1 }}
          />
          {/* 
            ADD TODO BUTTON - Creates new todo from input text
            Test: Click button, verify todo is added and input clears
          */}
          <button onClick={addTodo} data-testid="add-todo-btn">
            Add Todo
          </button>
        </div>
      </div>

      {/* 
        FILTER SECTION - Filter todos by completion status
        Expected Behavior:
        - "All" shows all todos (default)
        - "Active" shows only uncompleted todos
        - "Completed" shows only completed todos
        - Count in parentheses shows number of todos in each category
        - Active filter button should have "active" class
      */}
      <div style={{ marginBottom: "2rem" }}>
        <h2>Filter Todos</h2>
        <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
          {/* 
            FILTER ALL BUTTON - Shows all todos
            Test: Click button, verify all todos are visible, button has active class
          */}
          <button
            onClick={() => setFilter("all")}
            className={filter === "all" ? "active" : ""}
            data-testid="filter-all-btn"
          >
            All ({todos.length})
          </button>
          {/* 
            FILTER ACTIVE BUTTON - Shows only uncompleted todos
            Test: Click button, verify only uncompleted todos are visible
          */}
          <button
            onClick={() => setFilter("active")}
            className={filter === "active" ? "active" : ""}
            data-testid="filter-active-btn"
          >
            Active ({todos.filter((t) => !t.completed).length})
          </button>
          {/* 
            FILTER COMPLETED BUTTON - Shows only completed todos
            Test: Click button, verify only completed todos are visible
          */}
          <button
            onClick={() => setFilter("completed")}
            className={filter === "completed" ? "active" : ""}
            data-testid="filter-completed-btn"
          >
            Completed ({todos.filter((t) => t.completed).length})
          </button>
        </div>

        {/* 
          DELETE ALL BUTTON - Buggy functionality
          Expected Behavior: Should delete all todos
          Bug: Only deletes completed todos, leaves active todos
          Test: Click button, verify only completed todos are deleted, active todos remain
        */}
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

      {/* 
        TODO ITEMS SECTION - Display and manage individual todos
        Expected Behavior:
        - Each todo shows checkbox, text, and delete button
        - Checkbox toggles completion status
        - Completed todos have strikethrough text and gray color
        - Delete button removes individual todo
        - Empty state shows "No todos found" when no todos match filter
      */}
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
                {/* 
                  TODO CHECKBOX - Toggles completion status
                  Test: Click checkbox, verify todo completion status changes
                  Test: Verify completed todos have strikethrough styling
                */}
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                  data-testid={`todo-checkbox-${todo.id}`}
                />
                {/* 
                  TODO TEXT - Displays todo content
                  Test: Verify text displays correctly
                  Test: Verify completed todos have different styling
                */}
                <span data-testid={`todo-text-${todo.id}`} style={{ flex: 1 }}>
                  {todo.text}
                </span>
                {/* 
                  DELETE TODO BUTTON - Removes individual todo
                  Test: Click delete button, verify todo is removed from list
                */}
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

      {/* 
        STATISTICS SECTION - Shows todo counts
        Expected Behavior:
        - Total todos count updates when todos are added/deleted
        - Completed count shows number of completed todos
        - Active count shows number of uncompleted todos
        - Counts should update in real-time
      */}
      <div
        style={{
          marginTop: "2rem",
          padding: "1rem",
          backgroundColor: "#f8f9fa",
          borderRadius: "4px",
        }}
      >
        <h3>Statistics</h3>
        {/* 
          TOTAL TODOS COUNT - Shows total number of todos
          Test: Add/delete todos, verify count updates correctly
        */}
        <p>
          Total todos: <strong data-testid="total-todos">{todos.length}</strong>
        </p>
        {/* 
          COMPLETED TODOS COUNT - Shows number of completed todos
          Test: Toggle todo completion, verify count updates
        */}
        <p>
          Completed:{" "}
          <strong data-testid="completed-todos">
            {todos.filter((t) => t.completed).length}
          </strong>
        </p>
        {/* 
          ACTIVE TODOS COUNT - Shows number of uncompleted todos
          Test: Toggle todo completion, verify count updates
        */}
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
