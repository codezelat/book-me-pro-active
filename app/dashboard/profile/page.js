"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";

const ProfileEditComponent = ({ onUpdateSuccess }) => {
  const { data: session } = useSession();

  const [profilePhoto, setProfilePhoto] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [firstName, setFirstName] = useState(session?.user?.firstName || "");
  const [lastName, setLastName] = useState(session?.user?.lastName || "");
  const [email, setEmail] = useState(session?.user?.email || "");
  const [contact, setContact] = useState(session?.user?.contact || "");
  const [title, setTitle] = useState(session?.user?.title || "");
  const [description, setDescription] = useState(session?.user?.description || "");
  const [hourlyRate, setHourlyRate] = useState(session?.user?.hourlyRate || "");
  const [statusMessage, setStatusMessage] = useState("");
  const [name, setName] = useState(session?.user?.name || "");

  const handleProfilePhotoChange = (e) => setProfilePhoto(e.target.files[0]);
  const handleGalleryChange = (e) => setGallery([...e.target.files]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setStatusMessage("");

    const formData = new FormData();
    if (profilePhoto) formData.append("profilePhoto", profilePhoto);
    gallery.forEach((file) => formData.append("gallery", file));
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("contact", contact);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("hourlyRate", hourlyRate);
    formData.append("name", name);

    

    try {
      const response = await axios.post("/api/coach/update", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 200) {
        setStatusMessage("Profile updated successfully!");
       
      } else {
        setStatusMessage("Failed to update profile.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setStatusMessage("An error occurred.");
    }
  };

  return (
    <form onSubmit={handleUpdate} className="p-4 max-w-lg mx-auto">
      <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
      {statusMessage && <p className="mb-4">{statusMessage}</p>}

      {/* Profile Photo Upload */}
      <div className="mb-4">
        <label>Profile Photo</label>
        <input type="file" onChange={handleProfilePhotoChange} />
      </div>

      {/* Gallery Upload */}
      <div className="mb-4">
        <label>Gallery</label>
        <input type="file" multiple onChange={handleGalleryChange} />
      </div>

      {/* Other Fields */}
      <input type="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
      <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First Name" />
      <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" />
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input type="text" value={contact} onChange={(e) => setContact(e.target.value)} placeholder="Contact Number" />
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
      <input type="number" value={hourlyRate} onChange={(e) => setHourlyRate(e.target.value)} placeholder="Hourly Rate" />

      <button type="submit" className="bg-green-500 p-2 rounded mt-4">Save Changes</button>
    </form>
  );
};

export default ProfileEditComponent;