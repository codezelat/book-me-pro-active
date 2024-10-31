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
import CardAlert from "./CardAlert";
import Button from "@mui/material/Button";
import { SquareArrowRight } from "lucide-react";

const drawerWidth = 240;

const Drawer = styled(MuiDrawer)({
  width: drawerWidth,
  flexShrink: 0,
  boxSizing: "border-box",
  [`& .${drawerClasses.paper}`]: {
    width: drawerWidth,
    boxSizing: "border-box",
  },
});

export default function SideMenu() {
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
        [`& .${drawerClasses.paper}`]: {
          backgroundColor: "background.paper",
        },
      }}
    >
      {/* Profile Section */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          p: 2,
          flexDirection: "column",
          textAlign: "center",
        }}
      >
        <Avatar
          alt="John Doe"
          src="user.jpg" // Adjust the path if needed
          sx={{
            width: 60,
            height: 60,
            mb: 1,
          }}
        />
        <Typography
          variant="body2"
          sx={{ fontWeight: 500, lineHeight: "16px" }}
        >
          John Doe
        </Typography>
        <Typography variant="caption" sx={{ color: "text.secondary" }}>
          Web Developer
        </Typography>

        {/* Button with conditional background color */}

        <Button
          sx={{
            bgcolor: "#037D40", // Background color
            color: "white",
            px:3, // Text color
            "&:hover": {
              bgcolor: "#037D40",
             
            },
            display: "flex",
            alignItems: "center",
            gap: 1.5, 
          }}
          size="large"
        >
          Edit Profile
          <SquareArrowRight sx={{ color: "white", fill: "white" }} />
        </Button>
      </Box>

      <Divider />

      {/* Sidebar Content */}
      {/* <Box
        sx={{
          display: 'flex',
          mt: 'calc(var(--template-frame-height, 0px) + 4px)',
          p: 1.5,
        }}
      >
        <SelectContent />
      </Box> */}
      <Divider />
      <MenuContent />

      {/* Additional Options */}
      <Box
        sx={{
          p: 2,
          gap: 1,
          alignItems: "center",
          borderTop: "1px solid",
          borderColor: "divider",
        }}
      >
        <OptionsMenu />
      </Box>
    </Drawer>
  );
}
