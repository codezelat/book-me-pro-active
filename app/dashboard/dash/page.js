"use client";


import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { alpha } from "@mui/material/styles";
import ProfileEditComponent from "/components/ProfileEditComponent/page";
import OptionsMenu from "/components/OptionsMenu";
import React, { useState, useEffect } from 'react'; 

import DashboardHeader from "@/components/DashboardHeader";
import SideMenu from "@/components/SideMenu";
import AppNavbar from "@/components/AppNavbar";
import AppTheme from "@/app/shared-theme/AppTheme"; // Ensure the correct path here
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

  const [showProfileEdit, setShowProfileEdit] = React.useState(false);
  const [isProfileVisible, setIsProfileVisible] = useState(false);

  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return <p>Loading...</p>; // Display loading while session is being fetched
  }

  const handleProfileClick = () => {
    setShowProfileEdit(true); // Set to true to show ProfileEditComponent
  };

  return (
    <AppTheme {...props} themeComponents={xThemeComponents}>
      <CssBaseline enableColorScheme />
      <Box sx={{ display: "flex" }}>
        <SideMenu session={session} />

        <AppNavbar onProfileClick={handleProfileClick} /> 
        <Box
          component="main"
          sx={(theme) => ({
            flexGrow: 1,
            backgroundColor: theme.vars
              ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
              : alpha(theme.palette.background.default, 1),
            overflow: "auto",
          })}
        >
          <Stack
            spacing={2}
            sx={{
              alignItems: "center",
              mx: 3,
              pb: 5,
              mt: { xs: 8, md: 0 },
            }}
          >
            <DashboardHeader />
            <MainGrid />
            {/* Conditionally render MainGrid or ProfileEditComponent */}
            {/* Ensure this prop is set */}
            {showProfileEdit ? <ProfileEditComponent /> : <MainGrid />}
            {isProfileVisible ? <ProfileEditComponent /> : <MainGrid />}
          </Stack>
        </Box>
      </Box>
    </AppTheme>
  );
}
