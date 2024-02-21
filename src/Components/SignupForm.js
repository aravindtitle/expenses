import React, { useState } from "react";
import classes from "./SignupForm.module.css";

const SignupForm = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmpassword, setConfirmPassword] = useState();
  const changeEmail = (event) => {
    setEmail(event.target.value);
  };
  const changePassword = (event) => {
    setPassword(event.target.value);
  };
  const changeConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = {
      email: event.target.elements.email.value,
      password: event.target.elements.password.value,
      confirmPassword: event.target.elements.confirmPassword.value,
    };

    console.log("Form submitted:", formData);
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
        onChange={changeEmail}
      />
      <br></br>
      <input
        name="Password"
        type="password"
        placeholder="Enter your password"
        required
        value={password}
        onChange={changePassword}
      />
      <br></br>
      <input
        name="confirm Password"
        type="password"
        placeholder="confirm your password"
        required
        value={confirmpassword}
        onChange={changeConfirmPassword}
      />
      <br></br>
      <button onClick={handleSubmit}>Sign Up</button>
    </form>
  );
};

export default SignupForm;
