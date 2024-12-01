"use client";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import axios from "axios";
import AppTheme from "@/app/shared-theme/AppTheme";
import DashboardHeader from "@/components/DashboardHeader";
import SideMenu from "@/components/SideMenu";
import Box from "@mui/material/Box";
import { SquarePen, Upload } from "lucide-react";

const ProfileEditComponent = ({ onUpdateSuccess }) => {
  const { data: session } = useSession();

  const [profilePhoto, setProfilePhoto] = useState(null);
  const [gallery, setGallery] = useState([null, null, null]); // Updated to hold three images, with last as upload box
  const [firstName, setFirstName] = useState(session?.user?.firstName || "");
  const [lastName, setLastName] = useState(session?.user?.lastName || "");
  const [email, setEmail] = useState(session?.user?.email || "");
  const [contact, setContact] = useState(session?.user?.contact || "");
  const [title, setTitle] = useState(session?.user?.title || "");
  const [description, setDescription] = useState(
    session?.user?.description || ""
  );
  const [hourlyRate, setHourlyRate] = useState(session?.user?.hourlyRate || "");
  const [statusMessage, setStatusMessage] = useState("");
  const [name, setName] = useState(session?.user?.name || "");
  const [previewImage, setPreviewImage] = useState(null);

  const handleProfilePhotoChange = (e) => {
    const file = e.target.files[0];
    setProfilePhoto(file);
    setPreviewImage(URL.createObjectURL(file)); // Set preview for the circular image display
  };

  const handleGalleryChange = (e) => {
    const file = e.target.files[0];
    const updatedGallery = [...gallery];
    if (updatedGallery[0]) {
      updatedGallery[1] = updatedGallery[0]; // Shift the first image to the second slot
    }
    updatedGallery[0] = file; // Set the new image as the primary image
    updatedGallery[2] = null; // Keep the last slot as the upload box placeholder
    setGallery(updatedGallery);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setStatusMessage("");

    const formData = new FormData();
    if (profilePhoto) formData.append("profilePhoto", profilePhoto);
    gallery.forEach((file, index) => {
      if (file instanceof File) {
        formData.append(`gallery${index}`, file);
      }
    });
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

      setStatusMessage(
        response.status === 200
          ? "Profile updated successfully!"
          : "Failed to update profile."
      );
    } catch (error) {
      console.error("Error updating profile:", error);
      setStatusMessage("An error occurred.");
    }
  };

  return (
    <AppTheme>
      <CssBaseline enableColorScheme />
      <div className="h-full w-full m-0 p-0">
        {/* Top Header */}
        <Box
          sx={{
            position: "fixed",
            left: 0,
            right: 0,
            paddingTop: "10px",
            paddingLeft: "20px",
            paddingRight: "20px",
            height: "82px",
            zIndex: 10,
            backgroundColor: "white",
          }}
        >
          <DashboardHeader />
        </Box>

        {/* Sidebar */}
        <Box
          sx={{
            width: "250px",
            position: "fixed",
            top: "92px",
            left: 0,
            bottom: 0,
            overflowY: "auto",
            zIndex: 5,
            backgroundColor: "#f4f4f4",
            borderRight: "1px solid #ddd",
          }}
        >
          <SideMenu session={session} />
        </Box>

        {/* Main Content Area */}
        <Box
          sx={{
            marginLeft: "150px",
            overflow: "auto",
            backgroundColor: "white",
            minHeight: "100vh",
          }}
        >
          {/* form */}
          <div className="w-[1236px] h-[1234px] rounded-[5px] pt-32">
            <form
              onSubmit={handleUpdate}
              className="p-4 max-w-lg mx-auto pb-10 "
            >
              <h2 className=" font-bold text-[22px] landing-[26.4px] text-[#037D40] mb-4">
                Profile Details
              </h2>
              {statusMessage && <p className="mb-4">{statusMessage}</p>}

              {/* Profile Photo Upload */}
              <div className="flex gap-40">
                <div className="flex flex-col items-center mb-4">
                  <label className="font-normal text-[22px] pb-[15px]">
                    Profile Photo
                  </label>
                  <div
                    className="relative w-32 h-32 rounded-full overflow-hidden bg-[#E6F2EC] flex justify-center items-center"
                    style={{
                      backgroundImage: `url(${
                        previewImage || session?.user?.profilePhoto
                      })`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    <input
                      type="file"
                      onChange={handleProfilePhotoChange}
                      accept="image/*"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                    {!previewImage && (
                      <SquarePen className="text-primary text-4xl absolute " />
                    )}
                  </div>
                </div>

                {/* Gallery Upload Section */}
                {/* Gallery Upload Section */}
                <div className="flex flex-col  mb-4">
                  <label className="font-normal text-[22px] pb-[15px] ">
                    Gallery
                  </label>
                  <div className="flex gap-4 mb-4">
                    {gallery.slice(0, 2).map((image, index) => (
                      <div key={index} className="flex flex-col items-center">
                        <div
                          className="w-32 h-32 bg-[#E6F2EC] flex justify-center items-center overflow-hidden rounded"
                          style={{
                            backgroundImage: image
                              ? image instanceof File
                                ? `url(${URL.createObjectURL(image)})`
                                : `url(${image})` // Use server URL if it's not a File
                              : "none",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                          }}
                        />
                        {index === 0 && (
                          <span className="text-primary text-sm mt-1">
                            Primary Image
                          </span>
                        )}
                      </div>
                    ))}
                    <label className="w-32 h-32 bg-[#E6F2EC] flex justify-center items-center cursor-pointer rounded">
                      <Upload className="text-primary text-4xl" />
                      <input
                        type="file"
                        onChange={handleGalleryChange}
                        accept="image/*"
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* Other Fields */}
              {/* <input
                type="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
              /> */}
              <div className="flex gap-6 pb-5 text-[18px] font-normal">
                <div className="flex flex-col gap-[20px]">
                  <label>First Name</label>
                  <input
                    className="w-[578px] h-[60px] rounded-[5px] border-1 solid padding-[20px] border-[#B0B6D3] px-3"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First Name"
                  />
                </div>

                <div className="flex flex-col gap-[20px]">
                  <label>Last Name</label>
                  <input
                    className="w-[578px] h-[60px] rounded-[5px] border-1 solid padding-[20px] border-[#B0B6D3] px-3"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last Name"
                  />
                </div>
              </div>

              <div className="flex gap-6 pb-5 text-[18px] font-normal">
                <div className="flex flex-col gap-[20px]">
                  <label>Email</label>
                  <input
                    className="w-[578px] h-[60px] rounded-[5px] border-1 solid padding-[20px] border-[#B0B6D3] px-3"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                  />
                </div>

                <div className="flex flex-col gap-[20px]">
                  <label>Contact Number</label>
                  <input
                    className="w-[578px] h-[60px] rounded-[5px] border-1 solid padding-[20px] border-[#B0B6D3] px-3"
                    type="text"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder="Contact Number"
                  />
                </div>
              </div>

              <div className="pb-5 text-[18px] font-normal flex flex-col gap-[20px] ">
                <label>Title</label>
                <input
                  className="w-[1176px] h-[60px] rounded-[5px] border-1 solid padding-[20px] border-[#B0B6D3] px-3"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Title"
                />
              </div>

              <div className="pb-5 text-[18px] font-normal flex flex-col gap-[20px]">
                <label>Description</label>

                <textarea
                  className="w-[1176px] pt-4 h-[250px] rounded-[5px] border-1 solid padding-[20px] border-[#B0B6D3] px-3"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Description"
                />
              </div>

              <div className="pb-5 text-[18px] font-normal flex flex-col gap-[20px]">
                <label>Hourly Rate</label>
                <input
                  className="w-[1176px] h-[60px] rounded-[5px] border-1 solid padding-[20px] border-[#B0B6D3] px-3"
                  type="number"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(e.target.value)}
                  placeholder="Hourly Rate"
                />
              </div>

              <button
                type="submit"
                className="bg-primary w-[90px] h-[34px] pt-[8px] pl-[20px] pr-[20px] pb-[8px] rounded mt-4  text-white"
              >
                Upload
              </button>
            </form>
          </div>
        </Box>
      </div>
    </AppTheme>
  );
};

export default ProfileEditComponent;
