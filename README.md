# Dummy Frontend Website

A simple React application designed for Playwright testing with intentional bugs to test both correct and incorrect frontend behavior.

## Features

### 🏠 Home Page

- Interactive counter (buggy - increments by 2 instead of 1)
- Secret button (buggy - only works once, then becomes unresponsive)
- Input field with real-time display
- Navigation overview

### 📝 Todo List

- Add, toggle, and delete todos
- Filter todos by status (All, Active, Completed)
- Delete all functionality (buggy - only deletes completed todos)
- Todo statistics

### 📧 Contact Form

- Form validation with required fields
- Email validation (buggy - accepts invalid formats)
- Random submission failures (30% chance)
- Form status indicators

### 🧮 Calculator

- Basic arithmetic operations (+, -, ×, ÷)
- Calculation history
- Division bugs:
  - Division by zero returns Infinity instead of error
  - Some divisions give slightly wrong results (e.g., 10 ÷ 3)

### 👤 Profile Management

- User profile editing
- Avatar upload
- Preferences management
- Save functionality bugs:
  - 20% chance of random save failure
  - 10% chance of partial profile updates

## Intentional Bugs for Testing

### Home Page Bugs

1. **Counter Bug**: Increment button adds 2 instead of 1
2. **Secret Button Bug**: Only works on first click, then becomes unresponsive

### Todo List Bugs

1. **Delete All Bug**: Only deletes completed todos instead of all todos

### Contact Form Bugs

1. **Email Validation Bug**: Accepts invalid email formats like "test@" or "test@test"
2. **Random Submission Bug**: 30% chance of form submission failure

### Calculator Bugs

1. **Division by Zero Bug**: Returns Infinity instead of throwing an error
2. **Precision Bug**: 10 ÷ 3 returns 3.3333333333333335 instead of 3.3333333333333333

### Profile Bugs

1. **Random Save Failure**: 20% chance of save operation failing
2. **Partial Update Bug**: 10% chance of only updating name and email, skipping age and bio
3. **Email Validation Bug**: Only checks for @ symbol, not proper email format
4. **Age Validation Bug**: Allows 0 as a valid age

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start the development server
npm start
```

The application will be available at `http://localhost:3000`

### Available Scripts

- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests

## Playwright Testing

This application is specifically designed for Playwright testing. Here are some test scenarios you can implement:

### Navigation Tests

- Test navigation between all pages
- Verify active navigation states
- Test browser back/forward functionality

### Functional Tests

- Test all interactive elements (buttons, inputs, forms)
- Verify correct behavior for working features
- Verify expected behavior for buggy features

### Bug Detection Tests

- Test counter increment (should detect it adds 2 instead of 1)
- Test secret button (should detect it becomes unresponsive)
- Test email validation (should detect invalid emails are accepted)
- Test calculator division bugs
- Test random failures in forms and profile saves

### User Flow Tests

- Complete todo management workflow
- Contact form submission workflow
- Profile editing workflow
- Calculator usage workflow

## Data Attributes for Testing

The application includes `data-testid` attributes for easy element selection in Playwright tests:

- `data-testid="counter"` - Counter display
- `data-testid="increment-btn"` - Increment button
- `data-testid="new-todo-input"` - New todo input
- `data-testid="add-todo-btn"` - Add todo button
- `data-testid="name-input"` - Contact form name input
- `data-testid="email-input"` - Contact form email input
- `data-testid="calculator-display"` - Calculator display
- `data-testid="profile-name"` - Profile name input
- And many more...

## Project Structure

```
src/
├── components/
│   ├── Home.js          # Home page with counter and secret button
│   ├── TodoList.js      # Todo management
│   ├── ContactForm.js   # Contact form with validation
│   ├── Calculator.js    # Calculator with arithmetic operations
│   └── Profile.js       # User profile management
├── App.js               # Main app with routing
├── index.js             # App entry point
└── index.css            # Global styles
```

## Technologies Used

- React 18
- React Router DOM
- CSS3 with modern styling
- HTML5 semantic elements

## Testing Recommendations

1. **Start with Happy Path**: Test all features that work correctly
2. **Test Bug Detection**: Verify that your tests can detect the intentional bugs
3. **Test Error Handling**: Test how the app handles various error scenarios
4. **Test User Flows**: Test complete user workflows across multiple pages
5. **Test Responsiveness**: Test on different screen sizes
6. **Test Accessibility**: Ensure the app is accessible to users with disabilities

This dummy application provides a comprehensive testing environment for learning and practicing Playwright automation with both working and intentionally broken features.
