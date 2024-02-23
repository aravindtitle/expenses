import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import auth from "./Auth";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const changeEmail = (event) => {
    setEmail(event.target.value);
  };

  const changePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Sign-in successful, handle navigation or other actions
    } catch (error) {
      setError(error.message);
    }
  };

  return (
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
      <button type="submit">Sign In</button>
    </form>
  );
};

export default SignIn;
