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
        <div className="success">
          <h1>Thank you for your message!</h1>
          <p>
            We have received your contact form submission and will get back to
            you soon.
          </p>
          <button onClick={resetForm} data-testid="reset-form-btn">
            Send Another Message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <h1>Contact Us</h1>
      <p>Fill out the form below to get in touch with us.</p>

      <form onSubmit={handleSubmit} style={{ marginTop: "2rem" }}>
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="name">Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            data-testid="name-input"
            className={errors.name ? "error" : ""}
          />
          {errors.name && (
            <div className="error" data-testid="name-error">
              {errors.name}
            </div>
          )}
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            data-testid="email-input"
            className={errors.email ? "error" : ""}
          />
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

        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="subject">Subject *</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            data-testid="subject-input"
            className={errors.subject ? "error" : ""}
          />
          {errors.subject && (
            <div className="error" data-testid="subject-error">
              {errors.subject}
            </div>
          )}
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="message">Message *</label>
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
          {errors.message && (
            <div className="error" data-testid="message-error">
              {errors.message}
            </div>
          )}
        </div>

        {errors.submit && (
          <div className="error" data-testid="submit-error">
            {errors.submit}
          </div>
        )}
        <p>
          <small>Bug: Form has a 30% chance of failing randomly</small>
        </p>

        <div style={{ display: "flex", gap: "1rem" }}>
          <button
            type="submit"
            disabled={isSubmitting}
            data-testid="submit-btn"
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
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

      <div
        style={{
          marginTop: "2rem",
          padding: "1rem",
          backgroundColor: "#f8f9fa",
          borderRadius: "4px",
        }}
      >
        <h3>Form Status</h3>
        <p>Name: {formData.name ? "✓" : "✗"}</p>
        <p>Email: {formData.email ? "✓" : "✗"}</p>
        <p>Subject: {formData.subject ? "✓" : "✗"}</p>
        <p>
          Message: {formData.message.length >= 10 ? "✓" : "✗"} (
          {formData.message.length}/10 chars)
        </p>
      </div>
    </div>
  );
}

export default ContactForm;
