import React, { useState, useEffect } from "react";

function Profile() {
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    age: "30",
    bio: "Software developer with 5 years of experience.",
    avatar: "https://via.placeholder.com/150",
    preferences: {
      theme: "light",
      notifications: true,
      newsletter: false,
    },
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState("");
  const [tempProfile, setTempProfile] = useState({});

  useEffect(() => {
    setTempProfile(profile);
  }, [profile]);

  const handleInputChange = (field, value) => {
    setTempProfile((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePreferenceChange = (preference, value) => {
    setTempProfile((prev) => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [preference]: value,
      },
    }));
  };

  const validateProfile = () => {
    const errors = [];

    if (!tempProfile.name.trim()) {
      errors.push("Name is required");
    }

    if (!tempProfile.email.trim()) {
      errors.push("Email is required");
    } else if (!tempProfile.email.includes("@")) {
      errors.push("Email must contain @ symbol");
    }

    const age = parseInt(tempProfile.age);
    if (isNaN(age) || age < 0 || age > 150) {
      errors.push("Age must be a valid number between 0 and 150");
    }

    return errors;
  };

  // BUG: Save functionality sometimes fails and doesn't properly update the profile
  const handleSave = async () => {
    const errors = validateProfile();

    if (errors.length > 0) {
      setSaveStatus(`Validation errors: ${errors.join(", ")}`);
      return;
    }

    setIsSaving(true);
    setSaveStatus("");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // BUG: Sometimes the save fails randomly
      if (Math.random() < 0.2) {
        // 20% chance of failure
        throw new Error("Random save failure");
      }

      // BUG: Sometimes the profile doesn't get updated properly
      if (Math.random() < 0.1) {
        // 10% chance of partial update
        setProfile((prev) => ({
          ...prev,
          name: tempProfile.name,
          email: tempProfile.email,
          // Intentionally not updating age and bio
        }));
      } else {
        setProfile(tempProfile);
      }

      setIsEditing(false);
      setSaveStatus("Profile saved successfully!");

      // Clear success message after 3 seconds
      setTimeout(() => setSaveStatus(""), 3000);
    } catch (error) {
      setSaveStatus("Failed to save profile. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setTempProfile(profile);
    setIsEditing(false);
    setSaveStatus("");
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setTempProfile((prev) => ({
          ...prev,
          avatar: e.target.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="page">
      {/* 
        PROFILE PAGE - User profile management with intentional bugs
        Purpose: Test profile editing, form validation, file upload, and bug detection
        Bugs: Random save failures, partial updates, weak email validation, age validation issues
        Initial State: Pre-filled profile with sample data
      */}

      <h1>User Profile</h1>
      <p>Manage your profile information and preferences.</p>

      {/* 
        PROFILE LAYOUT - Two-column layout with profile info and preferences
        Expected Behavior:
        - Left side: Profile information and avatar
        - Right side: Preferences and save functionality
        - Fields are read-only by default, editable in edit mode
      */}
      <div style={{ display: "flex", gap: "2rem", marginTop: "2rem" }}>
        {/* 
          PROFILE INFORMATION SECTION - User details and avatar
          Expected Behavior:
          - Avatar displays current profile image
          - File upload available in edit mode
          - Form fields show current values
          - Fields are disabled when not editing
        */}
        <div style={{ flex: 1 }}>
          {/* 
            AVATAR SECTION - Profile picture display and upload
            Expected Behavior:
            - Shows current avatar image
            - File upload input appears in edit mode
            - Accepts image files only
            - Updates preview when file selected
          */}
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            {/* 
              AVATAR IMAGE - Displays current profile picture
              Test: Verify image displays correctly
              Test: Upload new image, verify preview updates
            */}
            <img
              src={tempProfile.avatar}
              alt="Profile Avatar"
              style={{
                width: "150px",
                height: "150px",
                borderRadius: "50%",
                objectFit: "cover",
                border: "3px solid #ddd",
              }}
              data-testid="profile-avatar"
            />
            {/* 
              AVATAR UPLOAD - File input for changing avatar
              Expected Behavior: Only visible in edit mode
              Test: Click upload, select image file, verify avatar updates
            */}
            {isEditing && (
              <div style={{ marginTop: "1rem" }}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  data-testid="avatar-upload"
                />
              </div>
            )}
          </div>

          {/* 
            NAME FIELD - User's full name
            Expected Behavior:
            - Required field
            - Shows current name
            - Editable in edit mode
            - Validation: cannot be empty
          */}
          <div style={{ marginBottom: "1rem" }}>
            <label htmlFor="name">Name</label>
            {/* 
              NAME INPUT - Text input for user's name
              Test: Enter name, verify it appears in field
              Test: Leave empty and save, verify validation error
            */}
            <input
              type="text"
              id="name"
              value={tempProfile.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              disabled={!isEditing}
              data-testid="profile-name"
            />
          </div>

          {/* 
            EMAIL FIELD - User's email address
            Expected Behavior:
            - Required field
            - Shows current email
            - Editable in edit mode
            - Bug: Weak validation (only checks for @ symbol)
          */}
          <div style={{ marginBottom: "1rem" }}>
            <label htmlFor="email">Email</label>
            {/* 
              EMAIL INPUT - Email input with buggy validation
              Test: Enter invalid email like "test@", verify it's accepted (bug)
              Test: Enter valid email, verify it's accepted
            */}
            <input
              type="email"
              id="email"
              value={tempProfile.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              disabled={!isEditing}
              data-testid="profile-email"
            />
          </div>

          {/* 
            AGE FIELD - User's age
            Expected Behavior:
            - Numeric input
            - Shows current age
            - Editable in edit mode
            - Bug: Allows 0 as valid age
            - Validation: 0-150 range
          */}
          <div style={{ marginBottom: "1rem" }}>
            <label htmlFor="age">Age</label>
            {/* 
              AGE INPUT - Number input for user's age
              Test: Enter age, verify it appears in field
              Test: Enter 0, verify it's accepted (bug)
              Test: Enter negative number, verify validation error
            */}
            <input
              type="number"
              id="age"
              value={tempProfile.age}
              onChange={(e) => handleInputChange("age", e.target.value)}
              disabled={!isEditing}
              min="0"
              max="150"
              data-testid="profile-age"
            />
          </div>

          {/* 
            BIO FIELD - User's biography
            Expected Behavior:
            - Multi-line text area
            - Shows current bio
            - Editable in edit mode
            - No length restrictions
          */}
          <div style={{ marginBottom: "1rem" }}>
            <label htmlFor="bio">Bio</label>
            {/* 
              BIO TEXTAREA - Multi-line input for user's biography
              Test: Enter bio text, verify it appears in field
              Test: Enter long text, verify it's accepted
            */}
            <textarea
              id="bio"
              value={tempProfile.bio}
              onChange={(e) => handleInputChange("bio", e.target.value)}
              disabled={!isEditing}
              rows="4"
              data-testid="profile-bio"
            />
          </div>
        </div>

        {/* 
          PREFERENCES SECTION - User preferences and save functionality
          Expected Behavior:
          - Checkboxes for boolean preferences
          - Dropdown for theme selection
          - Save status messages
          - Edit/Save/Cancel buttons
        */}
        <div style={{ flex: 1 }}>
          <h3>Preferences</h3>

          {/* 
            NOTIFICATIONS PREFERENCE - Toggle for notifications
            Expected Behavior:
            - Checkbox control
            - Shows current setting
            - Editable in edit mode
            - Updates in real-time
          */}
          <div style={{ marginBottom: "1rem" }}>
            <label>
              {/* 
                NOTIFICATIONS CHECKBOX - Toggle notifications on/off
                Test: Click checkbox, verify state changes
                Test: Verify disabled when not editing
              */}
              <input
                type="checkbox"
                checked={tempProfile.preferences.notifications}
                onChange={(e) =>
                  handlePreferenceChange("notifications", e.target.checked)
                }
                disabled={!isEditing}
                data-testid="notifications-toggle"
              />
              Enable Notifications
            </label>
          </div>

          {/* 
            NEWSLETTER PREFERENCE - Toggle for newsletter subscription
            Expected Behavior:
            - Checkbox control
            - Shows current setting
            - Editable in edit mode
            - Updates in real-time
          */}
          <div style={{ marginBottom: "1rem" }}>
            <label>
              {/* 
                NEWSLETTER CHECKBOX - Toggle newsletter subscription
                Test: Click checkbox, verify state changes
                Test: Verify disabled when not editing
              */}
              <input
                type="checkbox"
                checked={tempProfile.preferences.newsletter}
                onChange={(e) =>
                  handlePreferenceChange("newsletter", e.target.checked)
                }
                disabled={!isEditing}
                data-testid="newsletter-toggle"
              />
              Subscribe to Newsletter
            </label>
          </div>

          {/* 
            THEME PREFERENCE - Dropdown for theme selection
            Expected Behavior:
            - Dropdown with 3 options (light, dark, auto)
            - Shows current selection
            - Editable in edit mode
            - Updates in real-time
          */}
          <div style={{ marginBottom: "1rem" }}>
            <label htmlFor="theme">Theme</label>
            {/* 
              THEME SELECT - Dropdown for theme preference
              Test: Select different theme, verify selection changes
              Test: Verify disabled when not editing
            */}
            <select
              id="theme"
              value={tempProfile.preferences.theme}
              onChange={(e) => handlePreferenceChange("theme", e.target.value)}
              disabled={!isEditing}
              data-testid="theme-select"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="auto">Auto</option>
            </select>
          </div>

          {/* 
            SAVE STATUS - Shows save operation results
            Expected Behavior:
            - Success message (green) for successful saves
            - Error message (red) for failed saves
            - Shows validation errors
            - Auto-clears success messages after 3 seconds
          */}
          {saveStatus && (
            <div
              className={
                saveStatus.includes("error") || saveStatus.includes("Failed")
                  ? "error"
                  : "success"
              }
            >
              {saveStatus}
            </div>
          )}

          {/* 
            ACTION BUTTONS - Edit, Save, and Cancel functionality
            Expected Behavior:
            - Edit button shows when not editing
            - Save/Cancel buttons show when editing
            - Save button shows loading state
            - Cancel button resets form to original values
          */}
          <div style={{ marginTop: "2rem" }}>
            {!isEditing ? (
              /* 
                EDIT PROFILE BUTTON - Enables edit mode
                Test: Click edit, verify form becomes editable
                Test: Verify edit button disappears, save/cancel appear
              */
              <button
                onClick={() => setIsEditing(true)}
                data-testid="edit-profile-btn"
              >
                Edit Profile
              </button>
            ) : (
              <div style={{ display: "flex", gap: "1rem" }}>
                {/* 
                  SAVE CHANGES BUTTON - Saves profile with bugs
                  Expected Behavior:
                  - Shows loading state during save
                  - 20% chance of random failure
                  - 10% chance of partial update (skips age/bio)
                  - 70% chance of successful save
                  Test: Click save, verify loading state, verify result
                */}
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  data-testid="save-profile-btn"
                >
                  {isSaving ? "Saving..." : "Save Changes"}
                </button>
                {/* 
                  CANCEL EDIT BUTTON - Cancels editing and resets form
                  Test: Make changes, click cancel, verify form resets to original values
                */}
                <button
                  onClick={handleCancel}
                  data-testid="cancel-edit-btn"
                  style={{ backgroundColor: "#6c757d" }}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>

          {/* 
            PROFILE STATISTICS - Shows profile information metrics
            Expected Behavior:
            - Shows character counts for text fields
            - Shows email domain
            - Shows number of active preferences
            - Updates in real-time as user types
          */}
          <div
            style={{
              marginTop: "2rem",
              padding: "1rem",
              backgroundColor: "#f8f9fa",
              borderRadius: "4px",
            }}
          >
            <h4>Profile Statistics</h4>
            {/* 
              NAME LENGTH - Shows character count for name
              Test: Type in name field, verify character count updates
            */}
            <p>Name length: {tempProfile.name.length} characters</p>
            {/* 
              BIO LENGTH - Shows character count for bio
              Test: Type in bio field, verify character count updates
            */}
            <p>Bio length: {tempProfile.bio.length} characters</p>
            {/* 
              EMAIL DOMAIN - Shows domain part of email
              Test: Change email, verify domain display updates
            */}
            <p>Email domain: {tempProfile.email.split("@")[1] || "N/A"}</p>
            {/* 
              ACTIVE PREFERENCES - Shows count of enabled preferences
              Test: Toggle preferences, verify count updates
            */}
            <p>
              Active preferences:{" "}
              {Object.values(tempProfile.preferences).filter(Boolean).length}/3
            </p>
          </div>
        </div>
      </div>

      {/* 
        BUG DOCUMENTATION - Lists known bugs for testing
        Expected Behavior: Static information about intentional bugs
        Purpose: Guide test development for LLM
      */}
      <div
        style={{
          marginTop: "2rem",
          padding: "1rem",
          backgroundColor: "#fff3cd",
          borderRadius: "4px",
        }}
      >
        <h3>Known Bugs for Testing</h3>
        <ul>
          {/* 
            RANDOM SAVE FAILURE BUG - 20% chance of save failure
            Test: Try to save multiple times, verify some fail randomly
          */}
          <li>Save has 20% chance of failing randomly</li>
          {/* 
            PARTIAL UPDATE BUG - 10% chance of incomplete save
            Test: Save profile, verify sometimes only name/email are updated
          */}
          <li>
            Save has 10% chance of only partially updating the profile (skips
            age and bio)
          </li>
          {/* 
            EMAIL VALIDATION BUG - Weak email validation
            Test: Enter invalid email like "test@", verify it's accepted
          */}
          <li>
            Email validation only checks for @ symbol, not proper email format
          </li>
          {/* 
            AGE VALIDATION BUG - Allows 0 as valid age
            Test: Enter age 0, verify it's accepted as valid
          */}
          <li>Age validation allows 0 as valid age</li>
        </ul>
      </div>
    </div>
  );
}

export default Profile;
