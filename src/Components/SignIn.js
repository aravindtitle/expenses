import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import auth from "./Auth";
import { createUserWithEmail, sendPasswordResetEmail } from "./Auth";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const changeEmail = (event) => {
    setEmail(event.target.value);
  };

  const changePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      // Sign-in successful, handle navigation or other actions
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    try {
      setLoading(true);
      await sendPasswordResetEmail(auth, email);
      // Password reset email sent successfully
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Your Email"
          value={email}
          onChange={changeEmail}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={changePassword}
        />
        {error && <p>{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? "Signing In..." : "Sign In"}
        </button>
        <button type="button" onClick={handleForgotPassword} disabled={loading}>
          Forgot Password
        </button>
      </form>
    </div>
  );
};

export default SignIn;
