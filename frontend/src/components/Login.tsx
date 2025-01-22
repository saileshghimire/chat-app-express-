import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { connectSocket } from "../helper/socket";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // Send login request to backend
      const response = await axios.post("http://192.168.1.122:3000/api/v1/user/login", {
        email,
        password,
      });

      const { access_token, username } = response.data; // Assume the backend sends a token on successful login
      const token = access_token;
      localStorage.setItem("username", username); 
      localStorage.setItem("token", token); // Store the token in localStorage
      // connectSocket(); // Connect to socket server with JWT token
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
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
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
