"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import ProfileEditComponent from "/components/ProfileEditComponent/page";
import OptionsMenu from "/components/OptionsMenu";
import React, { useState, useEffect } from "react";

import DashboardHeader from "@/components/DashboardHeader";
import SideMenu from "@/components/SideMenu";
import AppNavbar from "@/components/AppNavbar";
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

  // Redirect to login if not authenticated
  useEffect(() => {
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
        <AppNavbar />

        <Box sx={{ padding: 2, flexGrow: 1 }}>
          
          <Stack direction="column" spacing={2}>
            {showProfileEdit ? <ProfileEditComponent /> : <MainGrid />}
          </Stack>
        </Box>
        
        {/* OptionsMenu to control ProfileEditComponent visibility */}
        <OptionsMenu onProfileClick={handleProfileClick} />
      </Box>
    </AppTheme>
  );
}
