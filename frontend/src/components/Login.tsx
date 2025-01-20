import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { connectSocket } from "../helper/socket";

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // Send login request to backend
      const response = await axios.post("http://localhost:3000/api/v1/login", {
        username,
        password,
      });

      const { token } = response.data; // Assume the backend sends a token on successful login
      localStorage.setItem("token", token); // Store the token in localStorage
      connectSocket(token); // Connect to socket server with JWT token
      navigate("/chat"); // Redirect to chat page
    } catch (err) {
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <div className="error">{error}</div>}
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
