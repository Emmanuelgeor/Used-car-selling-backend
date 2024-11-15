import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Import your styles

const Login = () => {
  const [id, setId] = useState(""); // Input field for ID
  const [pw, setPassword] = useState(""); // Input field for Password
  const [role, setRole] = useState(""); // Input field for Role selection
  const [errorMessage, setErrorMessage] = useState(""); // Error message state
  const navigate = useNavigate(); // Navigation hook

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
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
          <label htmlFor="id">ID</label>
          <input
            type="text"
            id="id"
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="Enter your ID"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={pw}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="role">Role</label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
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
    </div>
  );
};

export default Login;
