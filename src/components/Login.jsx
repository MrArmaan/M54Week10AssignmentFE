import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/login.css";

function Login({ setLoggedIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5001/users/login", {
        username,
        password,
      });
      console.log("Login successful:", response.data);
      setLoggedIn(true);
      setLoggedInUser(username);
      setUsername("");
      setPassword("");
    } catch (error) {
      console.error("Error logging in:", error);
      setError(
        error.response.data.message || "An error occurred during login."
      );
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Login</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Username:</label>
          <input
            type="text"
            value={username}
            onChange={handleUsernameChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Password:</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            className="form-input"
            required
          />
        </div>
        <button type="submit" className="submit-button">
          Login
        </button>
        {error && <p className="error-message">{error}</p>}
        {loggedInUser && (
          <p className="success-message">
            You have successfully logged in as {loggedInUser}. Happy
            Photoboxing!
          </p>
        )}
      </form>
      <Link to="/reset-password" className="link">
        Forgot Password?
      </Link>
    </div>
  );
}

export default Login;
