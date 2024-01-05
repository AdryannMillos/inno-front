import { useState } from "react";
import { Link } from "react-router-dom";
import apiService from "../../services/apiService";

function LoginCard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await apiService.post("/users/login", {
        email: email,
        password,
      });

      localStorage.setItem("accessToken", response);
      alert("Welcome!");
      window.location.href = "/";
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setLoading(false);

    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleLogin}>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Link className="redirect-to-register" to="/register">
            Do not have an account? Register here
          </Link>
          <button type="submit" disabled={loading}>
            {loading ? (
              <span>Loading...</span>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginCard;
