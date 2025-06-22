import React, { useState } from "react";

function Calculator() {
  const [display, setDisplay] = useState("0");
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [history, setHistory] = useState([]);

  const inputDigit = (digit) => {
    if (waitingForOperand) {
      setDisplay(String(digit));
      setWaitingForOperand(false);
    } else {
      setDisplay(display === "0" ? String(digit) : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay("0.");
      setWaitingForOperand(false);
      return;
    }

    if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  const clear = () => {
    setDisplay("0");
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const performOperation = (nextOperation) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);

      // Add to history
      const historyEntry = `${currentValue} ${operation} ${inputValue} = ${newValue}`;
      setHistory((prev) => [...prev, historyEntry]);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  // BUG: Division by zero doesn't handle properly and division sometimes gives wrong results
  const calculate = (firstValue, secondValue, operation) => {
    switch (operation) {
      case "+":
        return firstValue + secondValue;
      case "-":
        return firstValue - secondValue;
      case "*":
        return firstValue * secondValue;
      case "/":
        // Intentional bug: division by zero should throw error, but it returns Infinity
        // Also, sometimes division gives wrong results due to floating point precision
        if (secondValue === 0) {
          return Infinity; // Should throw an error instead
        }
        // Intentional bug: sometimes returns wrong result for certain divisions
        if (firstValue === 10 && secondValue === 3) {
          return 3.3333333333333335; // Should be 3.3333333333333333
        }
        return firstValue / secondValue;
      default:
        return secondValue;
    }
  };

  const equals = () => {
    if (!operation || previousValue === null) {
      return;
    }

    const inputValue = parseFloat(display);
    const newValue = calculate(previousValue, inputValue, operation);

    setDisplay(String(newValue));
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(true);

    // Add to history
    const historyEntry = `${previousValue} ${operation} ${inputValue} = ${newValue}`;
    setHistory((prev) => [...prev, historyEntry]);
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return (
    <div className="page">
      {/* 
        CALCULATOR PAGE - Basic arithmetic calculator with intentional bugs
        Purpose: Test arithmetic operations, history tracking, and bug detection
        Bugs: Division by zero returns Infinity, some divisions have precision errors
      */}

      <h1>Calculator</h1>
      <p>A simple calculator with some intentional bugs for testing.</p>

      {/* 
        CALCULATOR LAYOUT - Two-column layout with calculator and history
        Expected Behavior:
        - Left side: Calculator display and buttons
        - Right side: Calculation history
        - Calculator should perform basic arithmetic operations
      */}
      <div style={{ display: "flex", gap: "2rem", marginTop: "2rem" }}>
        {/* 
          CALCULATOR SECTION - Main calculator interface
          Expected Behavior:
          - Display shows current number or result
          - Number buttons input digits
          - Operation buttons perform calculations
          - Clear button resets calculator
          - Decimal button adds decimal point
        */}
        <div style={{ flex: 1 }}>
          {/* 
            CALCULATOR DISPLAY - Shows current number or calculation result
            Expected Behavior:
            - Shows "0" initially
            - Updates as user types numbers
            - Shows result after calculations
            - Right-aligned text
          */}
          <div
            style={{
              backgroundColor: "#f8f9fa",
              padding: "1rem",
              border: "1px solid #ddd",
              borderRadius: "4px",
              marginBottom: "1rem",
              textAlign: "right",
              fontSize: "1.5rem",
              minHeight: "3rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
            data-testid="calculator-display"
          >
            {display}
          </div>

          {/* 
            CALCULATOR BUTTONS - Grid layout of calculator buttons
            Expected Behavior:
            - Number buttons (0-9) input digits
            - Operation buttons (+, -, ×, ÷) perform calculations
            - Clear button (C) resets calculator
            - Equals button (=) completes calculation
            - Decimal button (.) adds decimal point
          */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "0.5rem",
            }}
          >
            {/* 
              CLEAR BUTTON - Resets calculator to initial state
              Test: Perform calculation, click clear, verify display shows "0"
            */}
            <button
              onClick={clear}
              data-testid="clear-btn"
              style={{ backgroundColor: "#dc3545" }}
            >
              C
            </button>
            {/* 
              DIVIDE BUTTON - Performs division operation
              Test: Enter numbers, click divide, verify calculation
              Test: Divide by zero, verify returns Infinity (bug)
            */}
            <button
              onClick={() => performOperation("/")}
              data-testid="divide-btn"
            >
              ÷
            </button>
            {/* 
              MULTIPLY BUTTON - Performs multiplication operation
              Test: Enter numbers, click multiply, verify calculation
            */}
            <button
              onClick={() => performOperation("*")}
              data-testid="multiply-btn"
            >
              ×
            </button>
            {/* 
              SUBTRACT BUTTON - Performs subtraction operation
              Test: Enter numbers, click subtract, verify calculation
            */}
            <button
              onClick={() => performOperation("-")}
              data-testid="subtract-btn"
            >
              −
            </button>

            {/* 
              NUMBER BUTTONS (7-9) - Input digits
              Test: Click number buttons, verify they appear in display
            */}
            <button onClick={() => inputDigit(7)} data-testid="digit-7">
              7
            </button>
            <button onClick={() => inputDigit(8)} data-testid="digit-8">
              8
            </button>
            <button onClick={() => inputDigit(9)} data-testid="digit-9">
              9
            </button>
            {/* 
              ADD BUTTON - Performs addition operation (spans 2 rows)
              Test: Enter numbers, click add, verify calculation
            */}
            <button
              onClick={() => performOperation("+")}
              data-testid="add-btn"
              style={{ gridRow: "span 2" }}
            >
              +
            </button>

            {/* 
              NUMBER BUTTONS (4-6) - Input digits
              Test: Click number buttons, verify they appear in display
            */}
            <button onClick={() => inputDigit(4)} data-testid="digit-4">
              4
            </button>
            <button onClick={() => inputDigit(5)} data-testid="digit-5">
              5
            </button>
            <button onClick={() => inputDigit(6)} data-testid="digit-6">
              6
            </button>

            {/* 
              NUMBER BUTTONS (1-3) - Input digits
              Test: Click number buttons, verify they appear in display
            */}
            <button onClick={() => inputDigit(1)} data-testid="digit-1">
              1
            </button>
            <button onClick={() => inputDigit(2)} data-testid="digit-2">
              2
            </button>
            <button onClick={() => inputDigit(3)} data-testid="digit-3">
              3
            </button>
            {/* 
              EQUALS BUTTON - Completes calculation (spans 2 rows)
              Test: Enter calculation, click equals, verify result
            */}
            <button
              onClick={equals}
              data-testid="equals-btn"
              style={{ gridRow: "span 2" }}
            >
              =
            </button>

            {/* 
              ZERO BUTTON - Inputs digit 0 (spans 2 columns)
              Test: Click zero, verify it appears in display
            */}
            <button
              onClick={() => inputDigit(0)}
              data-testid="digit-0"
              style={{ gridColumn: "span 2" }}
            >
              0
            </button>
            {/* 
              DECIMAL BUTTON - Adds decimal point
              Test: Click decimal, verify decimal point appears
              Test: Verify only one decimal point allowed per number
            */}
            <button onClick={inputDecimal} data-testid="decimal-btn">
              .
            </button>
          </div>

          {/* 
            BUG INFORMATION - Documents intentional bugs
            Expected Behavior: Static information about known bugs
          */}
          <div style={{ marginTop: "1rem" }}>
            <p>
              <small>
                Bug: Division by zero returns Infinity instead of error
              </small>
            </p>
            <p>
              <small>
                Bug: Some divisions give slightly wrong results (e.g., 10 ÷ 3)
              </small>
            </p>
          </div>
        </div>

        {/* 
          HISTORY SECTION - Shows calculation history
          Expected Behavior:
          - Lists all completed calculations
          - Shows "No calculations yet" when empty
          - Clear history button removes all entries
          - Scrollable when many calculations
        */}
        <div style={{ flex: 1 }}>
          <h3>Calculation History</h3>
          {/* 
            CLEAR HISTORY BUTTON - Removes all history entries
            Test: Perform calculations, click clear history, verify history is empty
          */}
          <button
            onClick={clearHistory}
            data-testid="clear-history-btn"
            style={{ marginBottom: "1rem" }}
          >
            Clear History
          </button>

          {/* 
            HISTORY LIST - Displays calculation history
            Expected Behavior:
            - Shows each calculation in format "a + b = result"
            - Empty state shows "No calculations yet"
            - Scrollable when many entries
          */}
          <div
            style={{
              backgroundColor: "#f8f9fa",
              padding: "1rem",
              border: "1px solid #ddd",
              borderRadius: "4px",
              maxHeight: "300px",
              overflowY: "auto",
            }}
            data-testid="history-list"
          >
            {history.length === 0 ? (
              <p>No calculations yet</p>
            ) : (
              history.map((entry, index) => (
                <div
                  key={index}
                  style={{
                    padding: "0.5rem 0",
                    borderBottom: "1px solid #ddd",
                  }}
                >
                  {entry}
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* 
        TEST CASES SECTION - Documentation of test scenarios
        Expected Behavior: Static information about test cases
        Purpose: Guide test development for LLM
      */}
      <div
        style={{
          marginTop: "2rem",
          padding: "1rem",
          backgroundColor: "#e7f3ff",
          borderRadius: "4px",
        }}
      >
        <h3>Test Cases for Playwright</h3>
        <ul>
          {/* 
            BASIC ARITHMETIC TEST - Simple addition
            Test: Enter 5, click +, enter 3, click =, verify result is 8
          */}
          <li>Basic arithmetic: 5 + 3 = 8</li>
          {/* 
            DIVISION PRECISION BUG TEST - Specific division with precision error
            Test: Enter 10, click ÷, enter 3, click =, verify result is 3.3333333333333335 (bug)
          */}
          <li>
            Division bug: 10 ÷ 3 should be 3.3333333333333333 but returns
            3.3333333333333335
          </li>
          {/* 
            DIVISION BY ZERO BUG TEST - Division by zero handling
            Test: Enter 5, click ÷, enter 0, click =, verify result is Infinity (bug)
          */}
          <li>Division by zero: 5 ÷ 0 should error but returns Infinity</li>
          {/* 
            DECIMAL OPERATIONS TEST - Decimal arithmetic
            Test: Enter 3.5, click +, enter 2.5, click =, verify result is 6
          */}
          <li>Decimal operations: 3.5 + 2.5 = 6</li>
          {/* 
            CLEAR FUNCTIONALITY TEST - Reset calculator
            Test: Perform calculation, click C, verify display shows "0"
          */}
          <li>Clear functionality: Should reset calculator state</li>
          {/* 
            HISTORY TRACKING TEST - Calculation history
            Test: Perform calculations, verify they appear in history
            Test: Click clear history, verify history is empty
          */}
          <li>History tracking: Should record all calculations</li>
        </ul>
      </div>
    </div>
  );
}

export default Calculator;
