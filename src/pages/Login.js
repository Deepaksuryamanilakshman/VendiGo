import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Login.css'; // optional CSS

function Login() {
  const [role, setRole] = useState("admin");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Simple validation
    if (!username || !password) {
      alert("Please enter username and password");
      return;
    }

    // Navigate based on role
    if (role === "admin") {
      navigate("/admin/dashboard");
    } else if (role === "retailer") {
      navigate("/retailer/dashboard");
    } else if (role === "supplier") {
      navigate("/supplier/dashboard"); // create this route if needed
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login</h2>

        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
          />
        </label>

        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
        </label>

        <label>
          Role:
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="admin">Admin</option>
            <option value="retailer">Retailer</option>
            <option value="supplier">Supplier</option>
          </select>
        </label>

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
