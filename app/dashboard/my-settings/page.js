"use client"; 

import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import ProfileEditComponent from "/components/ProfileEditComponent/page";
import DashboardHeader from "@/components/DashboardHeader";
import SideMenu from "@/components/SideMenu";
import Button from "@mui/material/Button";
import AppTheme from "@/app/shared-theme/AppTheme";

import {
  chartsCustomizations,
  dataGridCustomizations,
  datePickersCustomizations,
  treeViewCustomizations,
} from "@/app/dashboard/theme/customizations";
import AdminCalendar from "@/components/Availability";

const xThemeComponents = {
  ...chartsCustomizations,
  ...dataGridCustomizations,
  ...datePickersCustomizations,
  ...treeViewCustomizations,
};


export default function Dashboard(props) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [passwordType, setPasswordType] = useState("password");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordType, setConfirmPasswordType] = useState("password");
  const [error, setError] = useState(""); 
  
  const handlePasswordFocus = () => setPasswordType("text");
  const handlePasswordBlur = () => setPasswordType("password");

  const handleConfirmPasswordFocus = () => setConfirmPasswordType("text");
  const handleConfirmPasswordBlur = () => setConfirmPasswordType("password");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }


  // const handleDateClick = (date) => {
  //   setSelectedDate(date); // Store the selected date
  //   setShowDataGrid(true); // Show the data grid
  // };

  // const handleProfileClick = () => setShowProfileEdit(true);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset error state before submission
    try{

    // if (newPassword !== confirmPassword) {
    //   setError("New password and confirm password do not match.");
    //   toast.error("New password and confirm password do not match.");
    //   return;
    // }

    const response = await fetch("/api/auth/update-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, oldPassword, newPassword }),
    });

    const data = await response.json();

    if (response.ok) {
      toast.success("Password updated successfully!", {
        position: "top-right",
        autoClose: 3000, // Closes after 3 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setEmail(""); // Clear form fields
      setOldPassword("");
      setNewPassword("");
    } else {
      toast.error(data.message || "Failed to update password.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  } catch (error) {
    toast.error("Something went wrong. Please try again later.", {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
  console.error("Error in handleSubmit:", error);
  }
};

  return (
    <AppTheme {...props} themeComponents={xThemeComponents}>
      <CssBaseline enableColorScheme />
      <div className="h-full w-full m-0 p-0">
        {/* Top Header */}
        <Box
          sx={{
            position: "fixed",
            left: 0,
            right: 0,
            paddingTop: "10px",
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
            top: "92px", // Positioned below header
            left: 0,
            bottom: 0,
            overflowY: "auto",
            zIndex: 5, // Ensure sidebar stays above main content
            backgroundColor: "#f4f4f4",
            borderRight: "1px solid #ddd",
          }}
        >
          <SideMenu session={session} />
        </Box>

        {/* Main Content Area */}
        <Box
          sx={{
            minHeight: "50vh",
            justifyContent: "center",
            alignItems: "center",
            marginLeft: "300px",

            padding: "10px", // General padding for the main content
            backgroundColor: "white",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <form onSubmit={handleSubmit} className="px-10 py-10">
            <div className="font-kanit font-bold text-[22px] text-[#037D40] pb-10">
              Account Settings
            </div>
            <div className="pb-5">
              <label>User Name</label>
              <div className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-[1176px] h-[60px] rounded-[5px] border bg-white border-[#B0B6D3] px-3" 
                />
              </div>
            </div>

            <div className="flex gap-5">
              <div>
                <label>Old Password</label>
                <div className="flex">
                  <input
                    type="password"
                    value={oldPassword}
                    className="w-[578px] h-[60px] rounded-[5px] border bg-white border-[#B0B6D3] px-3"
                    onFocus={handlePasswordFocus}
                    onBlur={handlePasswordBlur}
                    onChange={(e) => setOldPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div>
                <label>New Password</label>
                <div className="flex">
                  <input
                    type="password" 
                    value={newPassword}
                    className="w-[578px] h-[60px] rounded-[5px] border bg-white border-[#B0B6D3] px-3"
                    onFocus={handleConfirmPasswordFocus}
                    onBlur={handleConfirmPasswordBlur}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              {/* <div>
                <label>Confirm Password</label>
                <div className="flex">
                  <input
                    type="password" 
                    value={confirmPassword}
                    className="w-[578px] h-[60px] rounded-[5px] border bg-white border-[#B0B6D3] px-3"
                    onFocus={handleConfirmPasswordFocus}
                    onBlur={handleConfirmPasswordBlur}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              </div> */}
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <button
              type="submit"
              className="bg-primary w-[90px] h-[34px]  rounded mt-4  text-white"
            >
              Update 
            </button>
          </form>
          <ToastContainer />
        </Box>


        <Box
          sx={{
            minHeight: "60vh",
            justifyContent: "center",
            alignItems: "center",
            marginLeft: "300px",
            padding: "10px", // Reduced top padding
            backgroundColor: "white",
            display: "flex",
            flexDirection: "column",
           }}
        >
         
          <AdminCalendar />
        </Box>
      </div>
    </AppTheme>
  );
}
