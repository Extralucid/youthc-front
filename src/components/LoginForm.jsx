import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import googleIcon from "../assets/google-icon.png";
import githubIcon from "../assets/github-icon.png";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hook";
import { login } from "../slices/auth.slice";

const LoginForm = ({ darkMode }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loading = useAppSelector((state) => state.auth.loading);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(login({ email, password })).unwrap();
      navigate("/"); // go to protected area
    } catch (err) {
      alert(err?.response?.data?.message || "Login failed");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`login-form ${darkMode ? "dark" : ""}`}
    >
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <div className="password-input">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <span onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? "🙈" : "👁️"}
        </span>
      </div>
      <button type="submit" disabled={loading}>
        {loading ? "Loading..." : "Login"}
      </button>

      <div className="social-login">
        <p>Or sign in with:</p>
        <div className="social-icons">
          <button type="button" className="google-btn">
            <img src={googleIcon} alt="Google" /> Google
          </button>
          <button type="button" className="github-btn">
            <img src={githubIcon} alt="GitHub" /> GitHub
          </button>
        </div>
      </div>

      <div className="links">
        <a href="/forgot-password">Forgot Password?</a>
        <a href="/signup">Create Account</a>
      </div>
    </form>
  );
};

export default LoginForm;
