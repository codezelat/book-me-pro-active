import * as React from "react";
import { styled } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import MenuContent from "./MenuContent";
import Button from "@mui/material/Button";
import { SquareArrowRight, LogOut } from "lucide-react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useTheme } from "@mui/material/styles";
import { isOverflown } from "@mui/x-data-grid/utils/domUtils";

const drawerWidth = 357;

const Drawer = styled(MuiDrawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  overflow: "hidden",
  boxSizing: "border-box",
  "& .MuiDrawer-paper": {
    width: drawerWidth,
    backgroundColor: theme.palette.mode === "dark" ? "#121212" : "#ffffff",
    color: theme.palette.mode === "dark" ? "#ffff" : "#0000",
    padding: "70px 40px",
    borderRadius: "5px 0px 0px 0px",
    overflow: "hidden",
  },
}));

export default function SideMenu({ session }) {
  const [activeSection, setActiveSection] = React.useState("Home");
  const theme = useTheme();

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  return (
    <Drawer
      variant="permanent" // Set variant directly here
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        gap: "30px",
        paddingBottom: 5,
        height: "calc(100vh - 60px)", // Adjust height as needed
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          padding: "30px",
          gap: "30px",
          // paddingTop: 10,
          // overflowY: "auto", // Ensures scrolling if content overflows
        }}
      >
        <Avatar
          alt={session?.user?.name || "User"}
          src={session?.user?.image || "default-image.jpg"}
          sx={{ width: "75px", height: "75px" }}
        />

        <Box
          sx={{
            width: "198px",
            height: "45px",
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
              "&:hover": { bgcolor: "#036b34" },
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
            fontFamily: "Kanit, sans-serif",
            fontSize: "18px",
            fontWeight: 700,
            color: theme.palette.text.primary,
          }}
        >
          {session?.user?.name || "Guest"}
        </Typography>
        <Typography
          variant="caption"
          sx={{
            width: "198px",
            height: "18px",
            fontFamily: "Kanit, sans-serif",
            fontSize: "15px",
            fontWeight: 400,
            textAlign: "center",
            color: "#037D40",
            padding: "2px 4px",
          }}
        >
          {session?.user?.role || "Member"}
        </Typography>
      </Box>

      {session && session.user && (
        <Box sx={{ px: 2, wordBreak: "break-word", color: "black" }}>
          <Typography variant="subtitle2">
            Your Coach Profile Page Link:
          </Typography>
          <Link
            href={`/coach/${session.user.id}`}
            className="text-blue-500 underline "
            sx={{ color: theme.palette.mode === "dark" ? "white" : "black" }}
          >
            {`https://yourdomain.com/coach/${session.user.id}`}
          </Link>
        </Box>
      )}

      <Divider sx={{ backgroundColor: "#A3D2D5" }} />
      <MenuContent session={session} />
      <Box
        sx={{
          padding: "5px 50px 0px 60px",
          display: "flex",
          alignItems: "center",
          fontWeight: 700,
          fontFamily: "Kanit, sans-serif",
        }}
      >
        <Button
          startIcon={<LogOut sx={{ fill: "#A3D2D5" }} />}
          sx={{
            fontFamily: "Kanit, sans-serif",
            color: "#037D40",
            textTransform: "none",
            display: "flex",
            alignItems: "center",
            opacity: 0.8,
            "&:hover": { backgroundColor: "#D1E8D5", opacity: 0.8 },
            "&:hover": {
              bgcolor: theme.palette.mode === "dark" ? "#055a2f" : "#036b34", // Darker shade for dark mode
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
