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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CircleCheck } from "lucide-react";
import * as React from "react";

const ProfileEditComponent = ({ onUpdateSuccess }) => {
  const { data: session } = useSession();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [hourlyRate, setHourlyRate] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [gallery, setGallery] = useState([null, null]); // Limit to two image previews
  const [coachData, setCoachData] = React.useState(null);
  const [statusMessage, setStatusMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [coach, setCoach] = useState(null);



  const [previewImage, setPreviewImage] = useState(null);
  const BASE_URL = process.env.NEXT_PUBLIC_DOMAIN;

  useEffect(() => {
    if (coach?.gallery && coach.gallery.length > 0) {
      // Set the first image as the default selected image
      setSelectedImage(`${BASE_URL}${coach.gallery[0]}`);
    }
  }, [coach, BASE_URL]);

  const handleProfilePhotoChange = (e) => {
    const file = e.target.files[0];
    setProfilePhoto(file);
    setPreviewImage(URL.createObjectURL(file)); // Set preview for the circular image display
  };
  const handleGalleryChange = (e) => {
    const file = e.target.files[0];
    const updatedGallery = [...gallery];
    updatedGallery[0] = gallery[1] || updatedGallery[0]; // Shift previous images
    updatedGallery[1] = file; // Update the second slot with the new image
    updatedGallery[2] = file; // Keep the file in the upload box

    setGallery(updatedGallery);
  };

  React.useEffect(() => {
    if (session?.user?.id) {
      axios
        .get(`/api/coach/${session.user.id}`)
        .then((response) => setCoachData(response.data))
        .catch((error) => console.error("Error fetching coach data:", error));
    }
  }, [session?.user?.id]);
  if (!coachData) {
    return <div>Loading...</div>; // Show a loading state
  }


  const handleChange = (e) => {
    const { name, value } = e.target;
    setCoachData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setStatusMessage("");

    const formData = new FormData();
    if (profilePhoto) formData.append("profilePhoto", profilePhoto);
    if (gallery && Array.isArray(gallery)) {
      gallery.forEach((image) => {
        if (image) {
          formData.append("gallery", image);
        }
      });
    }

    formData.append("firstName", coachData.firstName || "");
    formData.append("lastName", coachData.lastName || "");
    formData.append("email", coachData.email || "");
    formData.append("contact", coachData.contact || "");
    formData.append("title", coachData.title || "");
    formData.append("description", coachData.description || "");
    formData.append("hourlyRate", coachData.hourlyRate || "");

    try {
      const response = await axios.post("/api/coach/update", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 200) {
        toast.success("Profile updated successfully!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          theme: "light",
          icon: <CircleCheck color="#037D40" />,
        });

        // Re-fetch updated data
        const updatedData = await axios.get(`/api/coach/${session.user.id}`);
        setCoachData(updatedData.data);
        setFirstName(updatedData.data.firstName || "");
        setLastName(updatedData.data.lastName || "");
        setEmail(updatedData.data.email || "");
        setContact(updatedData.data.contact || "");
        setTitle(updatedData.data.title || "");
        setDescription(updatedData.data.description || "");
        setHourlyRate(updatedData.data.hourlyRate || "");
        setProfilePhoto(updatedData.data.profilePhoto || null);
        setGallery(updatedData.data.gallery || [null, null]);
      } else {
        toast.error("Failed to update profile.", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          theme: "light",
        });
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(
        "An error occurred while updating the profile. Please try again."
      );
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
                      backgroundImage: `url(${previewImage || `${BASE_URL}${coachData?.image}`})`,
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
                    {!previewImage && !coachData.image &&  (
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
                            backgroundImage: image instanceof Blob || image instanceof File
                              ? `url(${URL.createObjectURL(image)})`
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
                        className="hidden"
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
                    value={coachData?.firstName}
                    onChange={(e) =>
                      setCoachData({ ...coachData, firstName: e.target.value })
                    }
                    placeholder="First Name"
                  />
                </div>

                <div className="flex flex-col gap-[20px]">
                  <label>Last Name</label>
                  <input
                    className="w-[578px] h-[60px] rounded-[5px] border-1 solid padding-[20px] border-[#B0B6D3] px-3"
                    type="text"
                    value={coachData?.lastName}
                    onChange={(e) =>
                      setCoachData({ ...coachData, lastName: e.target.value })
                    }
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
                    value={coachData?.email}
                    onChange={(e) =>
                      setCoachData({ ...coachData, email: e.target.value })
                    }
                    placeholder="Email"
                  />
                </div>

                <div className="flex flex-col gap-[20px]">
                  <label>Contact Number</label>
                  <input
                    className="w-[578px] h-[60px] rounded-[5px] border-1 solid padding-[20px] border-[#B0B6D3] px-3"
                    type="text"
                    value={coachData?.contact}
                    onChange={(e) =>
                      setCoachData({ ...coachData, contact: e.target.value })
                    }
                    placeholder="Contact Number"
                  />
                </div>
              </div>

              <div className="pb-5 text-[18px] font-normal flex flex-col gap-[20px] ">
                <label>Title</label>
                <input
                  className="w-[1176px] h-[60px] rounded-[5px] border-1 solid padding-[20px] border-[#B0B6D3] px-3"
                  type="text"
                  value={coachData?.title}
                  onChange={(e) =>
                    setCoachData({ ...coachData, title: e.target.value })
                  }
                  placeholder="Title"
                />
              </div>

              <div className="pb-5 text-[18px] font-normal flex flex-col gap-[20px]">
                <label>Description</label>

                <textarea
                  className="w-[1176px] pt-4 h-[250px] rounded-[5px] border-1 solid padding-[20px] border-[#B0B6D3] px-3"
                  value={coachData?.description}
                  onChange={(e) =>
                    setCoachData({ ...coachData, description: e.target.value })
                  }
                  placeholder="Description"
                />
              </div>

              <div className="pb-5 text-[18px] font-normal flex flex-col gap-[20px]">
                <label>Hourly Rate</label>
                <input
                  className="w-[1176px] h-[60px] rounded-[5px] border-1 solid padding-[20px] border-[#B0B6D3] px-3"
                  type="number"
                  value={coachData?.hourlyRate}
                  onChange={(e) =>
                    setCoachData({ ...coachData, hourlyRate: e.target.value })
                  }
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
            <ToastContainer />
          </div>
        </Box>
      </div>
    </AppTheme>
  );
};

export default ProfileEditComponent;