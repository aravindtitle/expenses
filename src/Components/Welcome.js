import React from "react";
import { getUserProfile } from "./Auth";
import { getAuth, signOut } from "firebase/auth";
import VerifyEmailButton from "./Profile/VerifyButton";
import classes from "./Welcome.module.css";
import ExpenseForm from "./Expenses/ExpenseForm";
import ExpenseList from "./Expenses/ExpenseList";

const WelcomePage = ({ user }) => {
  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
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
      <ExpenseForm />
      <ExpenseList />
    </div>
  );
};

export default WelcomePage;
