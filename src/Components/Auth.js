import { initializeApp } from "firebase/app";
import { getAuth, updateProfile } from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const updateUserProfile = (user, profileData) => {
  // Update the user's profile
  return updateProfile(user, profileData);
};

const getUserProfile = async (user) => {
  try {
    // Fetch the user's profile data from your Firebase database or Firestore
    // You need to implement this function based on your database structure
    // For example:
    // const userProfileRef = doc(db, "users", user.uid);
    // const userProfileSnap = await getDoc(userProfileRef);
    // return userProfileSnap.data();
    return {}; // Placeholder until implemented
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};

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

const auth = getAuth(app);
export { updateUserProfile, getUserProfile };
export default auth;
