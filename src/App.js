import React from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import Home from "./components/Home";
import TodoList from "./components/TodoList";
import ContactForm from "./components/ContactForm";
import Calculator from "./components/Calculator";
import Profile from "./components/Profile";

function App() {
  const location = useLocation();

  return (
    <div className="App">
      <nav>
        <div className="container">
          <ul>
            <li>
              <Link
                to="/"
                className={location.pathname === "/" ? "active" : ""}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/todos"
                className={location.pathname === "/todos" ? "active" : ""}
              >
                Todo List
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className={location.pathname === "/contact" ? "active" : ""}
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                to="/calculator"
                className={location.pathname === "/calculator" ? "active" : ""}
              >
                Calculator
              </Link>
            </li>
            <li>
              <Link
                to="/profile"
                className={location.pathname === "/profile" ? "active" : ""}
              >
                Profile
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/todos" element={<TodoList />} />
          <Route path="/contact" element={<ContactForm />} />
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
