import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import SignupForm from "./Components/SignupForm";
import SignIn from "./Components/SignIn";
import WelcomePage from "./Components/Welcome";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import ProfileCompletionPage from "./Components/Profile/Profile";
import ProfileCompletionMessage from "./Components/Profile/ProfileComplete";
import { Link } from "react-router-dom";

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

  const incompleteProfile = user && !user.profileComplete;

  return (
    <div>
      <h1>Welcome to My App</h1>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
                {user ? (
                  <>
                    <WelcomePage user={user} />
                    {incompleteProfile && (
                      <Link to="/update-profile">Complete now</Link>
                    )}
                  </>
                ) : isNewUser ? (
                  <SignupForm onSignIn={handleSignIn} />
                ) : (
                  <SignIn onSignUp={handleSignUp} />
                )}
              </>
            }
          />
          <Route path="/update-profile" element={<ProfileCompletionPage />} />
        </Routes>
      </Router>
    </div>
  );
}
export default App;
