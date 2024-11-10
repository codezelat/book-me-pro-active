"use client";

import * as React from "react";
import { alpha } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import DashboardHeader from "@/components/DashboardHeader";
import SideMenu from "@/components/SideMenu";
import AppNavbar from "@/components/AppNavbar";
import AppTheme from "../shared-theme/AppTheme";
import UserDescription from "@/components/UserDescription";

import { dataGridCustomizations } from "./Theme/customizations";
import CustomizedDataGrid from "@/components/CustomizedDataGrid";
import Button from "@mui/material/Button";

// Dark and light theme settings
const lightTheme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#f5f5f5",
    },
    primary: {
      main: "#037D40",
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#121212",
    },
    primary: {
      main: "#037D40",
    },
  },
});

const xThemeComponents = {
  ...dataGridCustomizations,
};

export default function myBookings(props) {
  // Set the theme dynamically based on user preference or system settings
  const [themeMode, setThemeMode] = React.useState("light");

  // Toggle between light and dark themes
  const toggleTheme = () => {
    setThemeMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  return (
    <ThemeProvider theme={themeMode === "light" ? lightTheme : darkTheme}>
      <CssBaseline enableColorScheme sx={{ width: "100%", height: "100%" }} />
      <Box sx={{ display: "flex" }}>
        <SideMenu />

        {/* Main content */}
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
              mx: 3,
              pb: 5,
              mt: { xs: 8, md: 0 },
            }}
          >
            <DashboardHeader />
            <div className="custom-padding px-20">
              <div className="flex justify-between pt-[15px] ">
                <div className="text-black block ">My Bookings</div>
                <div className="flex justify-between gap-3 pb-10">
                  <Button
                    sx={{
                      bgcolor: "#037D40",
                      color: "white",
                      px: 3,
                      fontWeight: "bold", // Set text to bold
                      "&:hover": {
                        bgcolor: "#037D40",
                      },
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                    }}
                    size="large"
                  >
                    Pending
                  </Button>
                  <Button
                    sx={{
                      bgcolor: "#E6F2EC",
                      color: "black",
                      px: 3,
                      fontWeight: "bold", // Set text to bold
                      "&:hover": {
                        bgcolor: "#037D40",
                        color: "white",
                      },
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                    }}
                    size="large"
                  >
                    Approved
                  </Button>
                  <Button
                    sx={{
                      bgcolor: "#E6F2EC",
                      color: "black",
                      px: 3,
                      fontWeight: "bold", // Set text to bold
                      "&:hover": {
                        bgcolor: "#037D40",
                        color: "white",
                      },
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                    }}
                    size="large"
                  >
                    Rejected
                  </Button>
                </div>
              </div>

              <CustomizedDataGrid />
            </div>
          </Stack>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
