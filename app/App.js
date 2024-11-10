import * as React from "react";
import { ThemeProviderComponent, useThemeMode } from "../ThemeContext"; // Adjust the path
import IconButton from "@mui/material/IconButton";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  // Destructure theme-related functions and states from the useThemeMode hook
  const { isDarkMode, toggleTheme } = useThemeMode();

  return (
    <ThemeProviderComponent>
      <CssBaseline /> {/* Adds a CSS reset to standardize styles */}
      {/* Dark Mode Toggle Button */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", padding: 2 }}>
        <IconButton onClick={toggleTheme} color="inherit">
          {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
      </Box>
      {/* Main Content */}
      <Box sx={{ p: 2 }}>
        <Component {...pageProps} />
      </Box>
    </ThemeProviderComponent>
  );
}

export default MyApp;
