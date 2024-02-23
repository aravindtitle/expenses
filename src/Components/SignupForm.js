import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "./Auth";
import classes from "./SignupForm.module.css";

const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleChangeConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      console.error("Passwords do not match");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("User created:", user);
    } catch (error) {
      console.error("Error creating user:", error.message);
    }

    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <form className={classes.form}>
      <h2>Sign Up</h2>
      <input
        name="email"
        type="text"
        placeholder="Enter your email"
        required
        value={email}
        onChange={handleChangeEmail}
      />
      <br />
      <input
        name="Password"
        type="password"
        placeholder="Enter your password"
        required
        value={password}
        onChange={handleChangePassword}
      />
      <br />
      <input
        name="confirm Password"
        type="password"
        placeholder="Confirm your password"
        required
        value={confirmPassword}
        onChange={handleChangeConfirmPassword}
        autoComplete="new-password" // Use autoComplete instead of autocomplete
      />
      <br />
      <button onClick={handleSubmit}>Sign Up</button>
    </form>
  );
};

export default SignupForm;
