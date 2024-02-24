import { useState } from "react";
import { getAuth, sendEmailVerification } from "firebase/auth";

const VerifyEmailButton = ({ user }) => {
  const [error, setError] = useState(null);

  const handleVerifyEmail = () => {
    const auth = getAuth();
    sendEmailVerification(auth.currentUser)
      .then(() => {
        // Verification email sent successfully
        console.log("Verification email sent successfully");
      })
      .catch((error) => {
        // Handle errors
        setError(error.message);
      });
  };

  return (
    <div>
      <button onClick={handleVerifyEmail}>Verify Email</button>
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default VerifyEmailButton;
