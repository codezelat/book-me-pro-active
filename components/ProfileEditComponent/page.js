"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const ProfileEditComponent = ({ coachData = {}, onUpdateSuccess }) => {
  const router = useRouter(); // Add the useRouter hook here

  const [profilePhoto, setProfilePhoto] = useState(coachData.image || "");
  const [gallery, setGallery] = useState(coachData.gallery || []);
  const [firstName, setFirstName] = useState(coachData.firstName || "");
  const [lastName, setLastName] = useState(coachData.lastName || "");
  const [email, setEmail] = useState(coachData.email || "");
  const [contact, setContact] = useState(coachData.contact || "");
  const [title, setTitle] = useState(coachData.title || "");
  const [description, setDescription] = useState(coachData.description || "");
  const [hourlyRate, setHourlyRate] = useState(coachData.hourlyRate || "");

  const [statusMessage, setStatusMessage] = useState(""); // Success/Error message state

  const handleProfilePhotoChange = (e) => {
    setProfilePhoto(e.target.files[0]);
  };

  const handleGalleryChange = (e) => {
    const files = Array.from(e.target.files);
    setGallery((prevGallery) => [...prevGallery, ...files]);
  };

  const removeGalleryImage = (index) => {
    setGallery((prevGallery) => prevGallery.filter((_, i) => i !== index));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setStatusMessage("");

    const formData = new FormData();
    formData.append("profilePhoto", profilePhoto);
    gallery.forEach((file, index) => formData.append(`gallery[${index}]`, file));
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("contact", contact);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("hourlyRate", hourlyRate);

    try {
      const res = await fetch("/api/coach/update", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        setStatusMessage("Profile updated successfully!");
        onUpdateSuccess(); // Refresh parent component data
      } else {
        setStatusMessage("Failed to update profile. Please try again.");
      }
    } catch (error) {
      setStatusMessage("An error occurred. Please try again.");
    }
  };

  return (
    <form onSubmit={handleUpdate} className="p-4 max-w-lg mx-auto">
      <h2 className="text-xl font-semibold mb-4">Profile Details</h2>

      {/* Display Status Message */}
      {statusMessage && (
        <p className={`text-center ${statusMessage.includes("successfully") ? "text-green-500" : "text-red-500"} mb-4`}>
          {statusMessage}
        </p>
      )}

      {/* Profile Photo Section */}
      <div className="mb-4">
        <label>Profile Photo</label>
        <div className="relative w-24 h-24 mb-2">
          {profilePhoto ? (
            <Image src={URL.createObjectURL(profilePhoto)} alt="Profile Photo" layout="fill" objectFit="cover" />
          ) : (
            <div className="w-24 h-24 bg-gray-200 flex items-center justify-center">No Image</div>
          )}
        </div>
        <input type="file" onChange={handleProfilePhotoChange} />
      </div>

      {/* Gallery Section */}
      <div className="mb-4">
        <label>Gallery</label>
        <div className="flex space-x-2">
          {gallery.map((image, index) => (
            <div key={index} className="relative w-24 h-24">
              <Image src={URL.createObjectURL(image)} alt="Gallery Image" layout="fill" objectFit="cover" />
              <button onClick={() => removeGalleryImage(index)} className="absolute top-0 right-0 bg-red-500 text-white p-1">X</button>
            </div>
          ))}
        </div>
        <input type="file" multiple onChange={handleGalleryChange} className="mt-2" />
      </div>

      {/* Basic Details */}
      <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First Name" className="input" />
      <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" className="input" />
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="input" />
      <input type="text" value={contact} onChange={(e) => setContact(e.target.value)} placeholder="Contact Number" className="input" />
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="input" />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" className="input" />
      <input type="number" value={hourlyRate} onChange={(e) => setHourlyRate(e.target.value)} placeholder="Hourly Rate" className="input" />

      {/* Update and Dashboard Buttons */}
      <div className="flex space-x-4 mt-4">
        <button type="submit" className="btn-primary">Update</button>
        <button
          type="button"
          onClick={() => router.push('/dashboard/profile', { scroll: false })}
          className="btn-secondary"
        >
          Dashboard
        </button>
      </div>
    </form>
  );
};

export default ProfileEditComponent;
