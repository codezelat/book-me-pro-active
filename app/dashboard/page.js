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
      <Box
        sx={{
          position: "fixed",
          position: "absolute",
          left: 0,
          right: 0,
          height: "92px",
          zIndex: 10,
          marginBottom: 50,
        }}
      >
        <DashboardHeader />
      </Box>
      {/* Set up main container with header fixed at the top */}
      <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
        {/* Fixed Header */}

        {/* Main Content below the header */}
        <Box
          sx={{
            display: "flex",
            flexGrow: 1,
            paddingTop: "70px", // Adjust this to match the height of your fixed header
            //overflow: "hidden",
          }}
        >
          {/* Side Menu */}
          <Box
            sx={{
              width: "250px",
              position: "absolute",
              left: 0,
              top: "92px",
              paddingBottom: "50px",
              bottom: 0,
              height: "calc(100vh - 92px)",
              overflowY: "auto",
              borderRight: "1px solid #ddd",
            }}
          >
            <SideMenu session={session} />
          </Box>

          {/* Main Dashboard Content */}
          <Box
            sx={{
              // position: "absolute",
              left: "178px",
              top: "92px",
              right: 0,
              bottom: 0,
              marginLeft: "350px", // Adjust to match the width of the SideMenu
              flexGrow: 1,
              padding: 3,
              paddingLeft: "100px",
              overflow: "auto",
              backgroundColor: "#f7f7f7", // Optional: Match background color
            }}
          >
            <Stack direction="column" spacing={2}>
              {showProfileEdit ? <ProfileEditComponent /> : <MainGrid />}
            </Stack>
          </Box>
        </Box>
      </Box>
    </AppTheme>
  );
}
