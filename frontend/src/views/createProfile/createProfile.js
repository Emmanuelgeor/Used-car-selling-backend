import React, { useState } from "react";
import "./createProfile.css"; // Importing the CSS file

const CreateProfile = () => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [hp, setHp] = useState("");
  const [preference, setPreference] = useState("");
  const [age, setAge] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    const profileData = { id, name, hp, preference, age };

    try {
      const response = await fetch("http://localhost:5006/api/createProfile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profileData),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Error creating profile");
      }

      setErrorMessage(""); // Clear previous errors
      setSuccessMessage(result.message || "Profile created successfully");
    } catch (error) {
      setSuccessMessage(""); // Clear previous success messages
      setErrorMessage(error.message || "Failed to create profile");
    }
  };

  return (
    <div className="form-container">
      <h2>Create Profile</h2>
      <form id="createProfileForm" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="id">User ID</label>
          <input
            type="text"
            id="id"
            name="id"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="hp">Phone Number</label>
          <input
            type="text"
            id="hp"
            name="hp"
            value={hp}
            onChange={(e) => setHp(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="preference">Preference</label>
          <input
            type="text"
            id="preference"
            name="preference"
            value={preference}
            onChange={(e) => setPreference(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            name="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-btn">
          Create Profile
        </button>
      </form>
      {errorMessage && <div id="errorMessage" className="error-message">{errorMessage}</div>}
      {successMessage && <div id="successMessage" className="success-message">{successMessage}</div>}
    </div>
  );
};

export default CreateProfile;
