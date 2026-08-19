import React, { useState } from "react";
import "./Login.css";
import logo from "../../assets/logo.png";
import { signIn, signUp } from "../../firebase";
import { useNavigate } from "react-router-dom";
import netflix_spinner from "../../assets/netflix_spinner.gif";

const Login = () => {
  const [signState, setSignState] = useState("Sign In");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const user_auth = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (signState === "Sign In") {
        await signIn(email, password);
      } else {
        if (password !== confirmPassword) {
          alert("Passwords do not match!");
          setLoading(false);
          return;
        }

        await signUp(name, email, password);
      }

      navigate("/");
    } catch (error) {
      console.error("Authentication Error:", error);
      alert(error.message);
      setLoading(false);
    }
  };

  return loading ? (
    <div className="login-spinner">
      <img src={netflix_spinner} alt="Loading..." />
    </div>
  ) : (
    <div className="login">
      <img
        src={logo}
        alt="Netflix Logo"
        className="login-logo"
      />

      <div className="login-form">
        <h1>{signState}</h1>

        <form onSubmit={user_auth}>
          {signState === "Sign Up" && (
            <input
              type="text"
              placeholder="Enter your name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}

          <input
            type="email"
            placeholder="Enter your email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Enter your password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {signState === "Sign Up" && (
            <input
              type="password"
              placeholder="Confirm your password..."
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
              required
            />
          )}

          <button type="submit">{signState}</button>

          <div className="form-help">
            <div className="remember">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">
                Remember me
              </label>
            </div>

            <p>Need Help?</p>
          </div>
        </form>

        <div className="form-switch">
          {signState === "Sign In" ? (
            <p>
              New to Netflix?{" "}
              <span
                onClick={() => setSignState("Sign Up")}
              >
                Sign Up Now
              </span>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <span
                onClick={() => setSignState("Sign In")}
              >
                Sign In Here
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;