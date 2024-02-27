import React, { useState, useEffect } from "react";
import { getAuth, signOut } from "firebase/auth";
import VerifyEmailButton from "./Profile/VerifyButton";
import classes from "./Welcome.module.css";
import ExpenseForm from "./Expenses/ExpenseForm";
import ExpenseList from "./Expenses/ExpenseList";

const WelcomePage = ({ user }) => {
  const [isProfileCompleted, setIsProfileCompleted] = useState(false);

  useEffect(() => {
    // Logic to check if profile is completed
    const checkProfileCompletion = () => {
      // Implement your logic to check if the profile is completed
      // For example, you can fetch user data and check if the necessary fields are filled
      // If profile is completed, update state
      setIsProfileCompleted(true);
    };

    checkProfileCompletion();
  }, []);

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Log out successful, you may want to redirect the user to the login page
        // Clear idToken from local storage
        localStorage.removeItem("idToken");
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };

  return (
    <div className={classes.welcome}>
      <h2>Welcome back, {user.email}!</h2>
      <p>Welcome to Expense Tracker.</p>
      {!user.emailVerified && <VerifyEmailButton />}
      <button onClick={handleLogout} className={classes.logout}>
        Logout
      </button>
      {isProfileCompleted ? (
        <>
          <ExpenseForm />
          <ExpenseList />
        </>
      ) : (
        <p>Your profile is already complete.</p>
      )}
    </div>
  );
};

export default WelcomePage;
