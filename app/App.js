import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import "../styles/globals.css";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }) {
  const showToastMessage = () => {
    toast.success("Success Notification !", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  return (
    <>
      <CssBaseline /> {/* Adds a CSS reset to standardize styles */}
      {/* Main Content */}
      <Box sx={{ p: 2 }}>
        <Component {...pageProps} />
        <ToastContainer />
      </Box>
    </>
  );
}

export default MyApp;