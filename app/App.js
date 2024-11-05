// pages/_app.js
import * as React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import "../styles/globals.css"; // Import global styles if any

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#037D40", // Customize primary color
    },
    secondary: {
      main: "#b0b0b0", // Customize secondary color if needed
    },
    background: {
      default: "#121212", // Background for the app
      paper: "#1e1e1e",   // Background for cards, modals, etc.
    },
    text: {
      primary: "#ffffff", // Main text color
      secondary: "#b0b0b0", // Secondary text color
    },
  },
  typography: {
    fontFamily: "Kanit, sans-serif", // Customize font if needed
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline /> {/* Applies global dark mode styles */}
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
