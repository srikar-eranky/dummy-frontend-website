import React, { useState } from "react";

function Home() {
  const [count, setCount] = useState(0);
  const [showSecret, setShowSecret] = useState(false);
  const [inputValue, setInputValue] = useState("");

  // BUG: Counter doesn't work properly - it increments by 2 instead of 1
  const handleIncrement = () => {
    setCount(count + 2); // Intentional bug: should be count + 1
  };

  const handleDecrement = () => {
    setCount(count - 1);
  };

  const handleReset = () => {
    setCount(0);
  };

  // BUG: Secret button only works on first click, then becomes unresponsive
  const handleSecretClick = () => {
    if (!showSecret) {
      setShowSecret(true);
      // Intentional bug: this prevents future clicks
      setTimeout(() => {
        setShowSecret(false);
      }, 1000);
    }
  };

  return (
    <div className="page">
      {/* 
        HOME PAGE - Main landing page with interactive elements and intentional bugs
        Purpose: Test basic user interactions, counter functionality, and bug detection
      */}

      <h1>Welcome to Dummy Frontend Website</h1>
      <p>
        This is a simple React app designed for Playwright testing with
        intentional bugs.
      </p>

      {/* 
        COUNTER SECTION - Interactive counter with intentional bug
        Expected Behavior: 
        - Increment button should add 1 to counter (but adds 2 due to bug)
        - Decrement button should subtract 1 from counter (works correctly)
        - Reset button should set counter to 0 (works correctly)
        - Counter display should update in real-time
      */}
      <div style={{ marginTop: "2rem" }}>
        <h2>Interactive Counter (Buggy)</h2>
        <p>
          Current count: <strong data-testid="counter">{count}</strong>
        </p>
        {/* 
          INCREMENT BUTTON - Should add 1 but adds 2 due to intentional bug
          Test: Click increment, verify counter increases by 2 instead of 1
        */}
        <button onClick={handleIncrement} data-testid="increment-btn">
          Increment
        </button>
        {/* 
          DECREMENT BUTTON - Works correctly, subtracts 1
          Test: Click decrement, verify counter decreases by 1
        */}
        <button onClick={handleDecrement} data-testid="decrement-btn">
          Decrement
        </button>
        {/* 
          RESET BUTTON - Works correctly, sets counter to 0
          Test: Click reset, verify counter becomes 0
        */}
        <button onClick={handleReset} data-testid="reset-btn">
          Reset
        </button>
        <p>
          <small>Bug: Increment adds 2 instead of 1</small>
        </p>
      </div>

      {/* 
        SECRET BUTTON SECTION - Button with intentional bug
        Expected Behavior:
        - First click should show secret message for 1 second
        - After first click, button should become unresponsive
        - Secret message should disappear after 1 second
        Bug: Button only works once, then becomes unresponsive
      */}
      <div style={{ marginTop: "2rem" }}>
        <h2>Secret Button (Buggy)</h2>
        {/* 
          SECRET BUTTON - Only works on first click, then becomes unresponsive
          Test: Click once, verify message appears, click again, verify no response
        */}
        <button onClick={handleSecretClick} data-testid="secret-btn">
          Click me for a secret!
        </button>
        {/* 
          SECRET MESSAGE - Appears for 1 second after first button click
          Test: Verify message appears after first click, disappears after 1 second
        */}
        {showSecret && (
          <div className="success" data-testid="secret-message">
            🎉 You found the secret! But this button is now broken...
          </div>
        )}
        <p>
          <small>Bug: Button only works once, then becomes unresponsive</small>
        </p>
      </div>

      {/* 
        INPUT FIELD SECTION - Real-time input display
        Expected Behavior:
        - User can type in input field
        - Text should display in real-time below input
        - Input should be cleared when page loads
      */}
      <div style={{ marginTop: "2rem" }}>
        <h2>Input Field</h2>
        {/* 
          TEXT INPUT - Real-time input field
          Test: Type text, verify it appears in display below
        */}
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type something here..."
          data-testid="home-input"
        />
        {/* 
          INPUT DISPLAY - Shows what user typed in real-time
          Test: Verify display updates as user types
        */}
        <p>
          You typed: <span data-testid="input-display">{inputValue}</span>
        </p>
      </div>

      {/* 
        NAVIGATION OVERVIEW SECTION - Information about other pages
        Purpose: Guide users to other pages for testing
        Expected Behavior: Static information display
      */}
      <div style={{ marginTop: "2rem" }}>
        <h2>Navigation Test</h2>
        <p>Use the navigation menu above to explore different pages:</p>
        <ul>
          <li>
            <strong>Todo List:</strong> Add and manage todo items
          </li>
          <li>
            <strong>Contact Form:</strong> Submit contact information
          </li>
          <li>
            <strong>Calculator:</strong> Perform basic calculations
          </li>
          <li>
            <strong>Profile:</strong> View and edit user profile
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Home;
