import "./App.css";
import { useState, useEffect } from "react";
import SignupForm from "./Components/SignupForm";
import SignIn from "./Components/SignIn";
import WelcomePage from "./Components/Welcome";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function App() {
  const [user, setUser] = useState(null);
  const [isNewUser, setIsNewUser] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleSignUp = () => {
    setIsNewUser(true);
  };

  const handleSignIn = () => {
    setIsNewUser(false);
  };

  return (
    <div>
      <h1>Welcome to My App</h1>
      {user ? (
        <WelcomePage user={user} />
      ) : isNewUser ? (
        <SignupForm onSignIn={handleSignIn} />
      ) : (
        <SignIn onSignUp={handleSignUp} />
      )}
    </div>
  );
}

export default App;
