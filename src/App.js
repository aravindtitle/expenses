import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import { Provider } from "react-redux";
import { useState, useEffect } from "react";
import SignupForm from "./Components/SignupForm";
import SignIn from "./Components/SignIn";
import { createStore } from "redux";
import rootReducer from "./Components/Store/RootReducer";
import WelcomePage from "./Components/Welcome";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import ProfileCompletionPage from "./Components/Profile/Profile";
import ProfileCompletionMessage from "./Components/Profile/ProfileComplete";
import { Link } from "react-router-dom";

const store = createStore(rootReducer);

function App() {
  const [user, setUser] = React.useState(null);
  const [isNewUser, setIsNewUser] = React.useState(false);

  React.useEffect(() => {
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
    <Provider store={store}>
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
    </Provider>
  );
}
export default App;
