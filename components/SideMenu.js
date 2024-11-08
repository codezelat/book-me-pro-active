import * as React from "react";
import { styled } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import MuiDrawer, { drawerClasses } from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import MenuContent from "./MenuContent";
import Button from "@mui/material/Button";
import { SquareArrowRight, LogOut } from "lucide-react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useTheme } from "@mui/material/styles"; // Import useTheme hook to access the theme

const drawerWidth = 357;

const Drawer = styled(MuiDrawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  boxSizing: "border-box",
  [`& .${drawerClasses.paper}`]: {
    width: drawerWidth,
    backgroundColor: theme.palette.mode === "dark" ? "#121212" : "#ffffff",
    padding: "60px 30px",
    borderRadius: "5px 0px 0px 0px",
  },
}));


export default function SideMenu({ session }) {
  const [activeSection, setActiveSection] = React.useState("Home");
  const theme = useTheme(); // Access the current theme

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: "none", md: "block" },
        height: 913,
        justifyContent: "space-between",
        fontFamily: "Kanit, sans-serif", // Set font family here as well for all text inside Drawer
      }}
    >
      <Box
        sx={{
          width: "297px",
          height: "auto",
          gap: "30px",
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
            alignItems: "center",
          }}
        >
          <Button
            sx={{
              width: "188px",
              height: "46px",
              gap: "20px",
              borderRadius: "5px 0px 0px 0px",
              bgcolor: "#037D40",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "Kanit, sans-serif",
              "&:hover": {
                bgcolor: "#036b34",
              },
            }}
            size="large"
          >
            Edit Profile
            <SquareArrowRight sx={{ color: "white", fill: "white" }} />
          </Button>
        </Box>

        <Typography
          variant="body2"
          sx={{
            width: "147px",
            height: "22px",
            textAlign: "center",
            fontFamily: "Kanit, sans-serif", // Set font family explicitly for Typography component
            fontSize: "18px",
            fontWeight: 700,
            lineHeight: "21.6px",
            color: "textColor",
          }}
        >
          {session?.user?.name || "Guest"}
        </Typography>
        <Typography
          variant="caption"
          sx={{
            width: "198px",
            height: "18px",
            gap: 0,
            fontFamily: "Kanit, sans-serif", // Set font family explicitly for Typography component
            fontSize: "15px",
            fontWeight: 400,
            lineHeight: "18px",
            textAlign: "center",
            color: "#037D40",
            display: "inline-block",
            padding: "2px 4px",
          }}
        >
          {session?.user?.role || "Member"}
        </Typography>
      </Box>
      {session && session.user && (
        <Box
          sx={{
            px: 2,
            wordBreak: "break-word",
            color: "black",
            fontFamily: "Kanit, sans-serif", // Apply font family here too
          }}
        >
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
      )}
      <Divider sx={{ backgroundColor: "#A3D2D5" }} />
      <MenuContent session={session} />
      <Box
        sx={{
          width: "297px",
          height: "24px",
          padding: "10px 50px 0px 60px",
          gap: "15px",
          display: "flex",
          alignItems: "center",
          fontWeight: 700,
          fontFamily: "Kanit, sans-serif", // Apply font family here too
        }}
      >
        <Button
          startIcon={<LogOut sx={{ fill: "#A3D2D5" }} />}
          sx={{
            width: "[32px]",
            fontFamily: "Kanit, sans-serif",
            height: "18px",
            color: "#037D40",
            textTransform: "none",
            display: "flex",
            alignItems: "center",
            opacity: 0.8,
            "&:hover": {
              backgroundColor: "#D1E8D5",
              opacity: 0.8,
            },
          }}
          onClick={() => signOut()}
        >
          Log Out
        </Button>
      </Box>
    </Drawer>
  );
}
