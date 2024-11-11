"use client";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import ProfileEditComponent from "/components/ProfileEditComponent/page";
import DashboardHeader from "@/components/DashboardHeader";
import SideMenu from "@/components/SideMenu";
import AppTheme from "@/app/shared-theme/AppTheme";
import MainGrid from "@/components/MainGrid";
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
  const [showProfileEdit, setShowProfileEdit] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  const handleProfileClick = () => {
    setShowProfileEdit(true);
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
            marginLeft: "250px", // Adjusts main content to start after sidebar
           // paddingTop: "60px", // Adjusts main content to start after header
            overflow: "auto",
            backgroundColor: "#f7f7f7",
            minHeight: "100vh",
            
          }}
        >
          <Stack direction="column" spacing={2} padding={3}>
            {showProfileEdit ? <ProfileEditComponent /> : <MainGrid />}
          </Stack>
        </Box>
      </div>
    </AppTheme>
  );
}
