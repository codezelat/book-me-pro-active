"use client";

import * as React from "react";

import { alpha } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import DashboardHeader from "@/components/DashboardHeader";
import SideMenu from "@/components/SideMenu";
import AppNavbar from "@/components/AppNavbar";
import AppTheme from "../shared-theme/AppTheme";
import UserDescription from "@/components/UserDescription";

import { dataGridCustomizations } from "./Theme/customizations";
import CustomizedDataGrid from "../myBookings/Theme/customizations/dataGrid";
import Button from "@mui/material/Button";

const xThemeComponents = {
  ...dataGridCustomizations,
};

export default function myBookings(props) {
  return (
    <AppTheme {...props} themeComponents={xThemeComponents}>
      <CssBaseline enableColorScheme sx={{width:"100%", height:"100%"}}/>
      <Box sx={{ display: "flex" }}>
        <SideMenu />
        <AppNavbar />
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
              // alignItems: "center",
              mx: 3,
              pb: 5,
              mt: { xs: 8, md: 0 },
            }}
          >
            <DashboardHeader />
            <div>
              <div className="flex justify-between pt-[15px] ">
                <div className="text-black block ">My Bookings</div>
                <div className="flex justify-between gap-3">
                  <Button
                    sx={{
                      bgcolor: "#037D40", // Background color
                      color: "white",
                      px: 3, // Text color
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
                      bgcolor: "#E6F2EC", // Background color
                      color: "black",
                      px: 3, // Text color
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
                      bgcolor: "#E6F2EC", // Background color
                      color: "black",
                      px: 3, // Text color
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
            </div>
            
            <CustomizedDataGrid/>
          </Stack>
        </Box>
      </Box>
    </AppTheme>
  );
}
