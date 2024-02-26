import React from "react";
import { getAuth, signOut } from "firebase/auth";
import VerifyEmailButton from "./Profile/VerifyButton";

const WelcomePage = ({ user }) => {
  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Log out successful, you may want to redirect the user to the login page
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };

  return (
    <div>
      <h2>Welcome back, {user.email}!</h2>
      <p>Welcome to Expense Tracker.</p>
      {!user.emailVerified && <VerifyEmailButton />}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default WelcomePage;
