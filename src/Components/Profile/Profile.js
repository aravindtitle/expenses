import React, { useState, useEffect } from "react";
import { updateUserProfile, getUserProfile } from "../Auth";

const ProfileCompletionPage = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    // Fetch user profile data from Firebase upon component mount
    const fetchUserProfileData = async () => {
      try {
        const userProfileData = await getUserProfile();
        if (userProfileData) {
          setName(userProfileData.name || "");
          setAddress(userProfileData.address || "");
          setPhoneNumber(userProfileData.phoneNumber || "");
        }
      } catch (error) {
        console.error("Error fetching user profile data:", error);
      }
    };

    fetchUserProfileData();
  }, []);

  const handleUpdateProfile = async () => {
    try {
      // Call Firebase function to update user profile
      await updateUserProfile({ name, address, phoneNumber });
      // Optionally, show a success message or redirect the user
    } catch (error) {
      // Handle error (e.g., display error message)
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div>
      <h2>Complete Your Profile</h2>
      <form onSubmit={handleUpdateProfile}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="text"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default ProfileCompletionPage;
