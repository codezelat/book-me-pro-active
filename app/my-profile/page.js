"use client";
import { useState } from "react";
import { useSession, getSession } from "next-auth/react";
import Image from "next/image";
import axios from "axios";

export default function MyProfile() {
  const { data: session, update } = useSession(); // Fetch and update session data
  const [editMode, setEditMode] = useState(false); // Toggle edit mode
  const [name, setName] = useState(session?.user?.name || ""); // Profile name
  const [contact, setContact] = useState(session?.user?.contact || ""); // Profile contact
  const [loading, setLoading] = useState(false); // Loading state for save button

  // Function to handle profile update
  const handleProfileUpdate = async () => {
    setLoading(true);
    try {
      const response = await axios.put("/api/user/update", { name, contact });
      if (response.status === 200) {
        alert("Profile updated successfully");
        updateSession(); // Refresh session after update
        setEditMode(false); // Exit edit mode after saving
      }
    } catch (error) {
      alert("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  // Function to refresh session after profile update
  const updateSession = async () => {
    const updatedSession = await getSession(); // Fetch updated session
    update(updatedSession); // Update session state
  };

  if (!session) {
    return <p>Loading...</p>; // Show loading state while session is being fetched
  }

  return (
    <div className="container mt-24 py-24 mx-auto px-20">
      <div className="">
        {/* Welcome message and profile details */}
        <h1 className="text-black text-4xl mb-4">Welcome, {session.user.name}</h1>
        
        <div className="w-1/3 mb-6">
          <Image
            src={session.user.image || "/images/coach/coach.png"} // Default profile image if none exists
            width={1000}
            height={500}
            layout="responsive"
            alt="Profile"
          />
        </div>

        {!editMode ? (
          // Show profile details with an Edit button
          <div>
            <p className="text-black text-xl">Email: {session.user.email}</p>
            <p className="text-black text-xl">Contact Number: {session.user.contact || "N/A"}</p>
            <button
              onClick={() => setEditMode(true)}
              className="bg-blue-600 text-white p-2 rounded mt-4"
            >
              Edit Profile
            </button>
          </div>
        ) : (
          // Edit mode form for updating profile details
          <div>
            <label className="block text-black mb-2">Name:</label>
            <input
              className="border rounded p-2 mb-4 w-full"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <label className="block text-black mb-2">Contact Number:</label>
            <input
              className="border rounded p-2 mb-4 w-full"
              type="text"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />

            <button
              onClick={handleProfileUpdate}
              className="bg-green-600 text-white p-2 rounded mr-4"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
            <button
              onClick={() => setEditMode(false)}
              className="bg-red-600 text-white p-2 rounded"
            >
              Cancel
            </button>
          </div>
        )}

        {/* Logout button */}
        <button
          
          className="bg-blue-600 text-white p-2 rounded mt-4"
        >
          Back to dashboard
        </button>
      </div>
    </div>
  );
}
