import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const updateUserProfile = async (user, profileData) => {
  try {
    await updateProfile(user, profileData);
    console.log("User profile updated successfully");
  } catch (error) {
    console.error("Error updating user profile:", error.message);
    throw error;
  }
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
const createUserWithEmail = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await sendEmailVerification(auth.currentUser);
    console.log("Verification email sent successfully");
    return userCredential.user;
  } catch (error) {
    console.error("Error creating user:", error.message);
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
export { updateUserProfile, getUserProfile, createUserWithEmail };
export default auth;
