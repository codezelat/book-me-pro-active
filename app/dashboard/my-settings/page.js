// page.js
"use client"; // Mark this as a Client Component

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import ProfileEditComponent from "/components/ProfileEditComponent/page";
import DashboardHeader from "@/components/DashboardHeader";
import SideMenu from "@/components/SideMenu";
import AppTheme from "@/app/shared-theme/AppTheme";
import {
  chartsCustomizations,
  dataGridCustomizations,
  datePickersCustomizations,
  treeViewCustomizations,
} from "@/app/dashboard/theme/customizations";


const xThemeComponents = {
  ...chartsCustomizations,
  ...dataGridCustomizations,
  ...datePickersCustomizations,
  ...treeViewCustomizations,
};

export default function Dashboard(props) {
  const { data: session, status } = useSession();
  const router = useRouter();

  // State for managing the selected date and whether to show the data grid
  

  const [passwordType, setPasswordType] = useState("password");
  const [confirmPasswordType, setConfirmPasswordType] = useState("password");

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

  const handleDateClick = (date) => {
    setSelectedDate(date); // Store the selected date
    setShowDataGrid(true); // Show the data grid
  };

  const handleProfileClick = () => setShowProfileEdit(true);

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
            minHeight: "100vh",
            justifyContent: "center",
            alignItems: "center",
            marginLeft: "300px",

            padding: "20px", // General padding for the main content
            backgroundColor: "white",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div className="px-10 py-10">
            <div className="font-kanit font-bold text-[22px] text-[#037D40] pb-10">
              Account Settings
            </div>
            <div className="pb-5">
              <label>User Name</label>
              <div className="flex">
                <input className="w-[1176px] h-[60px] rounded-[5px] border bg-white border-[#B0B6D3] px-3" />
              </div>
            </div>

            <div className="flex gap-5">
              <div>
                <label>Password</label>
                <div className="flex">
                  <input
                    type={passwordType}
                    className="w-[578px] h-[60px] rounded-[5px] border bg-white border-[#B0B6D3] px-3"
                    onFocus={handlePasswordFocus}
                    onBlur={handlePasswordBlur}
                  />
                </div>
              </div>
              <div>
                <label>Confirm Password</label>
                <div className="flex">
                  <input
                    type={confirmPasswordType}
                    className="w-[578px] h-[60px] rounded-[5px] border bg-white border-[#B0B6D3] px-3"
                    onFocus={handleConfirmPasswordFocus}
                    onBlur={handleConfirmPasswordBlur}
                  />
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="bg-primary w-[90px] h-[34px]  rounded mt-4  text-white"
            >
              Upload
            </button>
          </div>
        </Box>
      </div>
    </AppTheme>
  );
}
