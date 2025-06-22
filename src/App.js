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
      {/* 
        MAIN NAVIGATION - Top navigation bar with routing
        Purpose: Provide navigation between different pages
        Expected Behavior:
        - Shows all available pages as links
        - Active page link has "active" class (blue background)
        - Links navigate to different pages without page reload
        - Navigation state persists across page changes
      */}
      <nav>
        <div className="container">
          <ul>
            {/* 
              HOME NAVIGATION LINK - Links to home page (/)
              Expected Behavior:
              - Shows "Home" text
              - Has "active" class when on home page
              - Clicking navigates to home page
              - URL changes to "/"
            */}
            <li>
              <Link
                to="/"
                className={location.pathname === "/" ? "active" : ""}
              >
                Home
              </Link>
            </li>
            {/* 
              TODO LIST NAVIGATION LINK - Links to todo page (/todos)
              Expected Behavior:
              - Shows "Todo List" text
              - Has "active" class when on todo page
              - Clicking navigates to todo list page
              - URL changes to "/todos"
            */}
            <li>
              <Link
                to="/todos"
                className={location.pathname === "/todos" ? "active" : ""}
              >
                Todo List
              </Link>
            </li>
            {/* 
              CONTACT FORM NAVIGATION LINK - Links to contact page (/contact)
              Expected Behavior:
              - Shows "Contact" text
              - Has "active" class when on contact page
              - Clicking navigates to contact form page
              - URL changes to "/contact"
            */}
            <li>
              <Link
                to="/contact"
                className={location.pathname === "/contact" ? "active" : ""}
              >
                Contact
              </Link>
            </li>
            {/* 
              CALCULATOR NAVIGATION LINK - Links to calculator page (/calculator)
              Expected Behavior:
              - Shows "Calculator" text
              - Has "active" class when on calculator page
              - Clicking navigates to calculator page
              - URL changes to "/calculator"
            */}
            <li>
              <Link
                to="/calculator"
                className={location.pathname === "/calculator" ? "active" : ""}
              >
                Calculator
              </Link>
            </li>
            {/* 
              PROFILE NAVIGATION LINK - Links to profile page (/profile)
              Expected Behavior:
              - Shows "Profile" text
              - Has "active" class when on profile page
              - Clicking navigates to profile page
              - URL changes to "/profile"
            */}
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

      {/* 
        MAIN CONTENT AREA - Container for page content
        Expected Behavior:
        - Contains the current page component based on route
        - Updates when navigation changes
        - Maintains consistent layout across pages
      */}
      <div className="container">
        {/* 
          ROUTE CONFIGURATION - Defines which component to show for each URL
          Expected Behavior:
          - "/" shows Home component
          - "/todos" shows TodoList component
          - "/contact" shows ContactForm component
          - "/calculator" shows Calculator component
          - "/profile" shows Profile component
          - Only one route matches at a time
        */}
        <Routes>
          {/* 
            HOME ROUTE - Root path shows Home component
            Test: Navigate to "/", verify Home component displays
            Test: Click Home link, verify Home component displays
          */}
          <Route path="/" element={<Home />} />
          {/* 
            TODO LIST ROUTE - /todos path shows TodoList component
            Test: Navigate to "/todos", verify TodoList component displays
            Test: Click Todo List link, verify TodoList component displays
          */}
          <Route path="/todos" element={<TodoList />} />
          {/* 
            CONTACT FORM ROUTE - /contact path shows ContactForm component
            Test: Navigate to "/contact", verify ContactForm component displays
            Test: Click Contact link, verify ContactForm component displays
          */}
          <Route path="/contact" element={<ContactForm />} />
          {/* 
            CALCULATOR ROUTE - /calculator path shows Calculator component
            Test: Navigate to "/calculator", verify Calculator component displays
            Test: Click Calculator link, verify Calculator component displays
          */}
          <Route path="/calculator" element={<Calculator />} />
          {/* 
            PROFILE ROUTE - /profile path shows Profile component
            Test: Navigate to "/profile", verify Profile component displays
            Test: Click Profile link, verify Profile component displays
          */}
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
