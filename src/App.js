import "./App.css";
import SignupForm from "./Components/SignupForm";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBvfI765RzQerwARKTJwziACEhKtAt03Cg",
  authDomain: "expenses-tracker-2f825.firebaseapp.com",
  projectId: "expenses-tracker-2f825",
  storageBucket: "expenses-tracker-2f825.appspot.com",
  messagingSenderId: "241432493087",
  appId: "1:241432493087:web:9e45793d4e2586c131a92a",
  measurementId: "G-77E9SZ69CK",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

function App() {
  return (
    <div>
      <h1>
        <strong>Sign Up Page</strong>
      </h1>
      <SignupForm />
    </div>
  );
}

export default App;
