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
import { Button, useTheme } from "@mui/material";
import {
  chartsCustomizations,
  dataGridCustomizations,
  datePickersCustomizations,
  treeViewCustomizations,
} from "@/app/dashboard/theme/customizations";
import CustomizedDataGrid from "./Theme/customizations/dataGrid";

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

  const handleProfileClick = () => setShowProfileEdit(true);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const theme = useTheme(); // Get theme instance
  const isDarkMode = theme.palette.mode === "dark"; // Dark mode check

  return (
    <AppTheme {...props} themeComponents={xThemeComponents}>
      <CssBaseline enableColorScheme />
      <div
        className="h-full w-full m-0 p-0 "
        style={{
          backgroundColor: isDarkMode
            ? theme.palette.background.default
            : "#f7f7f7",

          color: isDarkMode ? "#000000" : "#ffffff",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            position: "fixed",
            left: 0,
            right: 0,
            paddingTop: "10px",
            paddingLeft: "20px",
            paddingRight: "20px",
            height: "94px",
            zIndex: 10,
            backgroundColor: isDarkMode
              ? "background.default"
              : "background.paper",
            color: isDarkMode ? "text.primary" : "text.secondary",
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
            backgroundColor: isDarkMode ? "background.default" : "#f4f4f4",
            borderRight: "1px solid #ddd",
          }}
        >
          <SideMenu session={session} />
        </Box>

        {/* Main Content Area */}
        <Box
          sx={{
            marginLeft: "250px",

            minHeight: "100vh",
            overflow: "auto",
            backgroundColor: isDarkMode ? "background.default" : "#f7f7f7",
            color: isDarkMode ? "#000000" : "#ffffff",
          }}
        >
          <Stack direction="column" spacing={2} paddingTop={10} marginLeft={10}>
            <Box
              className="custom-padding px-20"
              sx={{
                overflow: "auto",
                minHeight: "100vh",

                backgroundColor: isDarkMode
                  ? "background.default"
                  : "background.paper",
                color: isDarkMode ? "text.primary" : "text.secondary",
              }}
            >
              {/* My Bookings Header */}
              <Box display="flex" justifyContent="space-between" pt={2}>
                <Box className="text-black font-[700] text-[18px]" sx={{}}>
                  My Bookings
                </Box>
                <Stack direction="row" spacing={3} pt={5} pb={2}>
                  {["Pending", "Approved", "Rejected"].map((status, index) => (
                    <Button
                      key={index}
                      sx={{
                        bgcolor: status === "Pending" ? "#037D40" : "#E6F2EC",
                        color: isDarkMode
                          ? "black"
                          : status === "Pending"
                          ? "white"
                          : "black",
                        px: 3,
                        fontWeight: "bold",
                        "&:hover": {
                          bgcolor: status === "Pending" ? "#037D40" : "#037D40",
                          color: "white",
                        },
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                      }}
                      size="large"
                    >
                      {status}
                    </Button>
                  ))}
                </Stack>
              </Box>

              {/* Data Grid */}
              <CustomizedDataGrid />
            </Box>
          </Stack>
        </Box>
      </div>
    </AppTheme>
  );
}
