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
      <h1>Calculator</h1>
      <p>A simple calculator with some intentional bugs for testing.</p>

      <div style={{ display: "flex", gap: "2rem", marginTop: "2rem" }}>
        <div style={{ flex: 1 }}>
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

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "0.5rem",
            }}
          >
            <button
              onClick={clear}
              data-testid="clear-btn"
              style={{ backgroundColor: "#dc3545" }}
            >
              C
            </button>
            <button
              onClick={() => performOperation("/")}
              data-testid="divide-btn"
            >
              ÷
            </button>
            <button
              onClick={() => performOperation("*")}
              data-testid="multiply-btn"
            >
              ×
            </button>
            <button
              onClick={() => performOperation("-")}
              data-testid="subtract-btn"
            >
              −
            </button>

            <button onClick={() => inputDigit(7)} data-testid="digit-7">
              7
            </button>
            <button onClick={() => inputDigit(8)} data-testid="digit-8">
              8
            </button>
            <button onClick={() => inputDigit(9)} data-testid="digit-9">
              9
            </button>
            <button
              onClick={() => performOperation("+")}
              data-testid="add-btn"
              style={{ gridRow: "span 2" }}
            >
              +
            </button>

            <button onClick={() => inputDigit(4)} data-testid="digit-4">
              4
            </button>
            <button onClick={() => inputDigit(5)} data-testid="digit-5">
              5
            </button>
            <button onClick={() => inputDigit(6)} data-testid="digit-6">
              6
            </button>

            <button onClick={() => inputDigit(1)} data-testid="digit-1">
              1
            </button>
            <button onClick={() => inputDigit(2)} data-testid="digit-2">
              2
            </button>
            <button onClick={() => inputDigit(3)} data-testid="digit-3">
              3
            </button>
            <button
              onClick={equals}
              data-testid="equals-btn"
              style={{ gridRow: "span 2" }}
            >
              =
            </button>

            <button
              onClick={() => inputDigit(0)}
              data-testid="digit-0"
              style={{ gridColumn: "span 2" }}
            >
              0
            </button>
            <button onClick={inputDecimal} data-testid="decimal-btn">
              .
            </button>
          </div>

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

        <div style={{ flex: 1 }}>
          <h3>Calculation History</h3>
          <button
            onClick={clearHistory}
            data-testid="clear-history-btn"
            style={{ marginBottom: "1rem" }}
          >
            Clear History
          </button>

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
          <li>Basic arithmetic: 5 + 3 = 8</li>
          <li>
            Division bug: 10 ÷ 3 should be 3.3333333333333333 but returns
            3.3333333333333335
          </li>
          <li>Division by zero: 5 ÷ 0 should error but returns Infinity</li>
          <li>Decimal operations: 3.5 + 2.5 = 6</li>
          <li>Clear functionality: Should reset calculator state</li>
          <li>History tracking: Should record all calculations</li>
        </ul>
      </div>
    </div>
  );
}

export default Calculator;
