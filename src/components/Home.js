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
      <h1>Welcome to Dummy Frontend Website</h1>
      <p>
        This is a simple React app designed for Playwright testing with
        intentional bugs.
      </p>

      <div style={{ marginTop: "2rem" }}>
        <h2>Interactive Counter (Buggy)</h2>
        <p>
          Current count: <strong data-testid="counter">{count}</strong>
        </p>
        <button onClick={handleIncrement} data-testid="increment-btn">
          Increment
        </button>
        <button onClick={handleDecrement} data-testid="decrement-btn">
          Decrement
        </button>
        <button onClick={handleReset} data-testid="reset-btn">
          Reset
        </button>
        <p>
          <small>Bug: Increment adds 2 instead of 1</small>
        </p>
      </div>

      <div style={{ marginTop: "2rem" }}>
        <h2>Secret Button (Buggy)</h2>
        <button onClick={handleSecretClick} data-testid="secret-btn">
          Click me for a secret!
        </button>
        {showSecret && (
          <div className="success" data-testid="secret-message">
            🎉 You found the secret! But this button is now broken...
          </div>
        )}
        <p>
          <small>Bug: Button only works once, then becomes unresponsive</small>
        </p>
      </div>

      <div style={{ marginTop: "2rem" }}>
        <h2>Input Field</h2>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type something here..."
          data-testid="home-input"
        />
        <p>
          You typed: <span data-testid="input-display">{inputValue}</span>
        </p>
      </div>

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
