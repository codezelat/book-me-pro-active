import * as React from "react";
import { styled } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import MuiDrawer, { drawerClasses } from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import SelectContent from "./SelectContent";
import MenuContent from "./MenuContent";
import Stack from "@mui/material/Stack";
import OptionsMenu from "./OptionsMenu";
import Button from "@mui/material/Button";
import { SquareArrowRight } from "lucide-react";
import { LogOut } from "lucide-react";
import MenuContent from "./MenuContent";
import OptionsMenu from "./OptionsMenu";
import Link from "next/link";


const drawerWidth = 357; // Updated width to fixed 357px

const Drawer = styled(MuiDrawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  boxSizing: "border-box",
  [`& .${drawerClasses.paper}`]: {
    width: drawerWidth,
    boxSizing: "border-box",
    backgroundColor: "#ffffff", // Background color
    padding: "60px 30px", // Top, bottom, left, right padding
    gap: 0,
    borderRadius: "5px 0px 0px 0px", // Border radius
    opacity: 1, // Fully visible
}));


export default function SideMenu( session) {
  // State to track the active section
  const [activeSection, setActiveSection] = React.useState("Home");

  // Function to handle section changes
  const handleSectionChange = (section) => {
    setActiveSection(section);
  };


  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: "none", md: "block" },
        height: 913, // Set height to 913px
        justifyContent: "space-between",

      }}
    >
      {/* Profile Section */}
      <Box
        sx={{
          width: "297px", // Fill width to specified 297px
          height: "auto", // Hug height (adjusts based on content)
          gap: "30px", // Gap between children
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          textAlign: "center",
          pb: "30px",
        }}
      >
        <Avatar
          alt={session?.user?.name || "User"}
          src={session?.user?.image || "default-image.jpg"}
          sx={{
            width: "75px",
            height: "75px",
          }}
        />

        <Box
          sx={{
            width: "198px",
            height: "45px",
            gap: "5px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center", // Centers content horizontally within the Box
          }}
        >
        

         
        </Box>

        <Button
          sx={{
            width: "188px",
            height: "46px",
            padding: "12px 30px",
            gap: "20px",
            borderRadius: "5px 0px 0px 0px",
            bgcolor: "#037D40",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            "&:hover": {
              bgcolor: "#037D40",
            },
          }}
          size="large"
        >
          Edit Profile
          <SquareArrowRight sx={{ color: "white", fill: "white" }} />
        </Button>

        <Typography
          variant="body2"
          sx={{width: "147px",
            height: "22px",
            textAlign: "center",
            fontFamily: "Kanit, sans-serif",
            fontSize: "18px",
            fontWeight: 700,
            lineHeight: "21.6px",}}
        >
          {session?.user?.name || "Guest"}
        </Typography>
        <Typography variant="caption" sx={{  width: "198px",
              height: "18px",
              gap: 0,
              fontFamily: "Kanit, sans-serif",
              fontSize: "15px",
              fontWeight: 400,
              lineHeight: "18px",
              textAlign: "center",
              color: "#037D40",
              display: "inline-block",
              padding: "2px 4px",}}>
          {session?.user?.role || "Member"}
        </Typography>

      </Box>
      <Box sx={{
        px:2,
        wordBreak:"break-word"
      
      }}>
        <Typography variant="subtitle2">
          Your Coach Profile Page Link:
        </Typography>
        <Link
          href={`/coach/${session.user.id}`}
          className="text-blue-500 underline"
        >
          {`https://yourdomain.com/coach/${session.user.id}`}
        </Link>
      </Box>

      <Divider />

      {/* Pass session to MenuContent */}
      <MenuContent session={session} />

      {/* Additional Options */}
      <Box
        sx={{

          width: "297px", // Set the width to 297px
          height: "24px", // Set the height to 24px
          padding: "0px 30px", // Add 30px padding on the left and right
          gap: "15px", // Set gap between items to 15px

          display: "flex", // Use flex layout for alignment
          alignItems: "center", // Center items vertically

        }}
      >
         <LogOut 
          sx={{
            width: "24px",
            height: "24px",
            padding: "3px 0px 0px 0px",
            fill: "#037D40", // Change icon color to #037D40
          }}
        />
       
        <Button sx={{ color: "#037D40" }}>Log Out</Button>
      </Box>
    </Drawer>
  );
}
