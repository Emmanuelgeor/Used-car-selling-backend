import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./login.css"; // Import your styles

const Login = () => {
  // Define formData state as an object to hold all form inputs
  const [formData, setFormData] = useState({
    id: "",    // User ID
    pw: "",    // Password
    role: "",  // Role
  });

  const [errorMessage, setErrorMessage] = useState(""); // Error message state
  const navigate = useNavigate(); // Navigation hook

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value, // Dynamically update the field in formData
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    const { id, pw, role } = formData; // Extract data from formData
    try {
      // Normalize role to ensure case-insensitivity
      const normalizedRole = role.trim().toLowerCase();

      // Role-based login logic
      if (normalizedRole === "admin") {
        const response = await axios.post("http://localhost:5006/api/login", { id, pw });
        localStorage.setItem("token", response.data.token);
        alert("Admin login successful!");
        navigate("/dashboardAdmin");
      } else if (normalizedRole === "caragent" || normalizedRole === "car agent") {
        const response = await axios.post("http://localhost:5006/api/logincaragent", { id, pw });
        localStorage.setItem("token", response.data.token);
        alert("Car Agent login successful!");
        navigate("/dashboardCarAgent");
      } else if (normalizedRole === "buyer") {
        const response = await axios.post("http://localhost:5006/api/loginbuyer", { id, pw });
        localStorage.setItem("token", response.data.token);
        alert("Buyer login successful!");
        navigate("/dashboardBuyer");
      } else if (normalizedRole === "seller") {
        const response = await axios.post("http://localhost:5006/api/loginseller", { id, pw });
        localStorage.setItem("token", response.data.token);
        alert("Seller login successful!");
        navigate("/dashboardSeller");
      } else {
        setErrorMessage("Invalid role selected. Please choose 'Admin', 'Car Agent', 'Buyer', or 'Seller'.");
      }
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      setErrorMessage("Invalid ID or password");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <div className="form-group">
          <label htmlFor="id">User ID</label>
          <input
            type="text"
            id="id"
            name="id" // Add name attribute to connect with formData
            value={formData.id} // Bind input value to formData.id
            onChange={handleChange} // Handle changes using handleChange
            placeholder="Enter your User ID"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="pw" // Add name attribute to connect with formData
            value={formData.pw} // Bind input value to formData.pw
            onChange={handleChange} // Handle changes using handleChange
            placeholder="Enter your password"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="role">Role</label>
          <select
            id="role"
            name="role" // Add name attribute to connect with formData
            value={formData.role} // Bind select value to formData.role
            onChange={handleChange} // Handle changes using handleChange
            required
          >
            <option value="" disabled>Select Role</option>
            <option value="Admin">Admin</option>
            <option value="Car agent">Car Agent</option>
            <option value="Buyer">Buyer</option>
            <option value="Seller">Seller</option>
          </select>
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
      <p><a href="/createUser">I don't have an account</a></p>
    </div>
  );
};

export default Login;