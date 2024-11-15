// src/components/CreateUser.js
import React, { useState } from 'react';
import './createUser.css'; // Make sure the CSS file is in the same directory

const CreateUser = () => {
  const [formData, setFormData] = useState({
    id: '',
    email: '',
    pw: '',
    role: 'admin', // Default role can be set
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Add the form data submission logic here (API call, form validation, etc.)
      console.log(formData);
      // Example API call for creating a user (adjust URL and data structure as needed)
      const response = await fetch('/api/createUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        // Handle success (e.g., redirect or display success message)
        alert('User created successfully!');
      } else {
        // Handle error
        alert(result.message || 'Something went wrong.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error creating account.');
    }
  };

  return (
    <div className="create-user-container">
      <div className="create-user-card">
        <h2>Create an Account</h2>
        <form id="createUserForm" onSubmit={handleSubmit}>
          <label htmlFor="id">ID:</label>
          <input
            type="text"
            id="id"
            name="id"
            placeholder="Enter user ID"
            value={formData.id}
            onChange={handleChange}
            required
          />

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="pw">Password:</label>
          <input
            type="password"
            id="pw"
            name="pw"
            placeholder="Enter password"
            value={formData.pw}
            onChange={handleChange}
            required
          />

          <label htmlFor="role">Role:</label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="admin">Buyer</option>
            <option value="user">Seller</option>
            <option value="agent">Agent</option>
            <option value="admin">Admin</option>
          </select>

          <button type="submit">Create Account</button>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;