import React, { useState } from "react";

function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // BUG: Email validation is broken - it accepts invalid email formats
  const validateEmail = (email) => {
    // Intentional bug: this regex is too permissive and accepts invalid emails
    const emailRegex = /.*@.*/; // Should be more strict like /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.length < 10) {
      newErrors.message = "Message must be at least 10 characters long";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // BUG: Sometimes the form submission fails randomly
      if (Math.random() < 0.3) {
        // 30% chance of failure
        throw new Error("Random submission failure");
      }

      setIsSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setErrors({});
    } catch (error) {
      setErrors({ submit: "Failed to submit form. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({ name: "", email: "", subject: "", message: "" });
    setErrors({});
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <div className="page">
        {/* 
          SUCCESS PAGE - Shown after successful form submission
          Expected Behavior:
          - Shows success message
          - Provides option to send another message
          - Form data should be cleared
        */}
        <div className="success">
          <h1>Thank you for your message!</h1>
          <p>
            We have received your contact form submission and will get back to
            you soon.
          </p>
          {/* 
            RESET FORM BUTTON - Returns to form for new submission
            Test: Click button, verify form is reset and ready for new input
          */}
          <button onClick={resetForm} data-testid="reset-form-btn">
            Send Another Message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      {/* 
        CONTACT FORM PAGE - Form with validation and intentional bugs
        Purpose: Test form validation, submission, error handling, and bug detection
        Bugs: Email validation accepts invalid formats, 30% random submission failure
      */}

      <h1>Contact Us</h1>
      <p>Fill out the form below to get in touch with us.</p>

      {/* 
        CONTACT FORM - Multi-field form with validation
        Expected Behavior:
        - All fields are required
        - Email should be valid format (but buggy validation)
        - Message must be at least 10 characters
        - Form shows validation errors
        - Submit button shows loading state
        - 30% chance of random submission failure
      */}
      <form onSubmit={handleSubmit} style={{ marginTop: "2rem" }}>
        {/* 
          NAME FIELD - Required text input
          Expected Behavior:
          - Field is required
          - Shows error if empty
          - Error clears when user starts typing
        */}
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="name">Name *</label>
          {/* 
            NAME INPUT - Required text field
            Test: Leave empty and submit, verify error appears
            Test: Type text, verify error disappears
          */}
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            data-testid="name-input"
            className={errors.name ? "error" : ""}
          />
          {/* 
            NAME ERROR - Shows validation error for name field
            Test: Verify error appears when name is empty
          */}
          {errors.name && (
            <div className="error" data-testid="name-error">
              {errors.name}
            </div>
          )}
        </div>

        {/* 
          EMAIL FIELD - Required email input with buggy validation
          Expected Behavior:
          - Field is required
          - Should validate email format (but buggy - accepts invalid formats)
          - Shows error if invalid
          - Bug: Accepts formats like "test@" or "test@test"
        */}
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="email">Email *</label>
          {/* 
            EMAIL INPUT - Required email field with buggy validation
            Test: Enter invalid email like "test@", verify it's accepted (bug)
            Test: Enter valid email, verify it's accepted
          */}
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            data-testid="email-input"
            className={errors.email ? "error" : ""}
          />
          {/* 
            EMAIL ERROR - Shows validation error for email field
            Test: Verify error appears for truly invalid emails
          */}
          {errors.email && (
            <div className="error" data-testid="email-error">
              {errors.email}
            </div>
          )}
          <p>
            <small>
              Bug: Email validation accepts invalid formats like "test@" or
              "test@test"
            </small>
          </p>
        </div>

        {/* 
          SUBJECT FIELD - Required text input
          Expected Behavior:
          - Field is required
          - Shows error if empty
          - Error clears when user starts typing
        */}
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="subject">Subject *</label>
          {/* 
            SUBJECT INPUT - Required text field
            Test: Leave empty and submit, verify error appears
            Test: Type text, verify error disappears
          */}
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            data-testid="subject-input"
            className={errors.subject ? "error" : ""}
          />
          {/* 
            SUBJECT ERROR - Shows validation error for subject field
            Test: Verify error appears when subject is empty
          */}
          {errors.subject && (
            <div className="error" data-testid="subject-error">
              {errors.subject}
            </div>
          )}
        </div>

        {/* 
          MESSAGE FIELD - Required textarea with minimum length
          Expected Behavior:
          - Field is required
          - Must be at least 10 characters
          - Shows error if too short
          - Error clears when user starts typing
        */}
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="message">Message *</label>
          {/* 
            MESSAGE TEXTAREA - Required text area with minimum length
            Test: Enter less than 10 characters, verify error appears
            Test: Enter 10+ characters, verify error disappears
          */}
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="5"
            data-testid="message-input"
            className={errors.message ? "error" : ""}
            placeholder="Your message here..."
          />
          {/* 
            MESSAGE ERROR - Shows validation error for message field
            Test: Verify error appears when message is too short
          */}
          {errors.message && (
            <div className="error" data-testid="message-error">
              {errors.message}
            </div>
          )}
        </div>

        {/* 
          SUBMIT ERROR - Shows general submission errors
          Expected Behavior:
          - Appears when form submission fails
          - Shows "Failed to submit form" message
          - 30% chance of random failure
        */}
        {errors.submit && (
          <div className="error" data-testid="submit-error">
            {errors.submit}
          </div>
        )}
        <p>
          <small>Bug: Form has a 30% chance of failing randomly</small>
        </p>

        {/* 
          FORM BUTTONS - Submit and clear functionality
          Expected Behavior:
          - Submit button shows loading state during submission
          - Clear button resets all form fields
          - Submit button is disabled during submission
        */}
        <div style={{ display: "flex", gap: "1rem" }}>
          {/* 
            SUBMIT BUTTON - Submits form with loading state
            Test: Fill form and click submit, verify loading state
            Test: Verify 30% chance of failure shows error
            Test: Verify 70% chance of success shows success page
          */}
          <button
            type="submit"
            disabled={isSubmitting}
            data-testid="submit-btn"
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
          {/* 
            CLEAR FORM BUTTON - Resets all form fields
            Test: Fill form and click clear, verify all fields are empty
          */}
          <button
            type="button"
            onClick={resetForm}
            data-testid="clear-form-btn"
            style={{ backgroundColor: "#6c757d" }}
          >
            Clear Form
          </button>
        </div>
      </form>

      {/* 
        FORM STATUS SECTION - Real-time validation feedback
        Expected Behavior:
        - Shows checkmark (✓) for valid fields
        - Shows X (✗) for invalid/empty fields
        - Updates in real-time as user types
        - Shows character count for message field
      */}
      <div
        style={{
          marginTop: "2rem",
          padding: "1rem",
          backgroundColor: "#f8f9fa",
          borderRadius: "4px",
        }}
      >
        <h3>Form Status</h3>
        {/* 
          NAME STATUS - Shows if name field is filled
          Test: Type in name field, verify status changes from ✗ to ✓
        */}
        <p>Name: {formData.name ? "✓" : "✗"}</p>
        {/* 
          EMAIL STATUS - Shows if email field is filled
          Test: Type in email field, verify status changes from ✗ to ✓
        */}
        <p>Email: {formData.email ? "✓" : "✗"}</p>
        {/* 
          SUBJECT STATUS - Shows if subject field is filled
          Test: Type in subject field, verify status changes from ✗ to ✓
        */}
        <p>Subject: {formData.subject ? "✓" : "✗"}</p>
        {/* 
          MESSAGE STATUS - Shows if message meets minimum length
          Test: Type message, verify status changes when reaching 10 characters
        */}
        <p>
          Message: {formData.message.length >= 10 ? "✓" : "✗"} (
          {formData.message.length}/10 chars)
        </p>
      </div>
    </div>
  );
}

export default ContactForm;
