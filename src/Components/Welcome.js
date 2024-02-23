import React from "react";

const WelcomePage = ({ user }) => {
  return (
    <div>
      <h2>Welcome to Expense Tracker, {user.email}!</h2>
    </div>
  );
};

export default WelcomePage;
