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
import { chartsCustomizations, dataGridCustomizations, datePickersCustomizations, treeViewCustomizations } from "@/app/dashboard/theme/customizations";
import Calendar from "./Calendar";
import CustomizedDataGrid from "@/app/myBookings/Theme/customizations/dataGrid";

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
  const [selectedDate, setSelectedDate] = useState(null);
  const [showDataGrid, setShowDataGrid] = useState(false);

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
            minHeight:"100vh",
            justifyContent: "center",
            alignItems: "center",
            marginLeft: "300px",
            
            padding: "20px", // General padding for the main content
            backgroundColor: "white",
            display: "flex",
            flexDirection: "column",
            
          }}
        >
          {/* Calendar Section */}
          <Box
            sx={{
              marginTop:"60px",
              backgroundColor: "white",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Calendar 
              selectedDate={selectedDate} 
              setSelectedDate={setSelectedDate} 
              setShowDataGrid={setShowDataGrid} 
            />
          </Box>

          {/* Data Grid Section */}
          <Box
            sx={{
              width: "100%", // Ensure full width
              maxWidth: "1190px", // Set a consistent max-width
              margin: "0 auto", // Center align
              padding: "20px", // Uniform padding
              borderRadius: "8px", // Optional: Rounded corners
            }}
          >
            {/* Conditionally render the Data Grid below the calendar */}
            {showDataGrid && selectedDate && (
              <div className="mt-4">
                <CustomizedDataGrid selectedDate={selectedDate} />
              </div>
            )}
          </Box>
        </Box>
      </div>
    </AppTheme>
  );
}
