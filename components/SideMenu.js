"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { styled, useTheme } from "@mui/material/styles";
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
import axios from "axios";
import Image from "next/image";
import FileCopyIcon from "@mui/icons-material/FileCopy";

const drawerWidth = 357;

const Drawer = styled(MuiDrawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  boxSizing: "border-box",
  "& .MuiDrawer-paper": {
    width: drawerWidth,
    // backgroundColor: theme.palette.mode === "dark" ? "#121212" : "#ffffff",
    // color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
    backgroundColor: "#ffffff", // Set background color to white
    color: "#000000", 
    padding: "50px 40px",
    borderRadius: "5px 0px 0px 0px",
  },
}));

const BASE_URL = process.env.NEXT_PUBLIC_DOMAIN || "https://yourfallbackdomain.com";

export default function SideMenu({ session }) {
  const [coachData, setCoachData] = React.useState(null);
  const theme = useTheme();
  const router = useRouter();

  const profileUrl = `${BASE_URL}/coach/${session?.user?.id || ""}`;

  React.useEffect(() => {
    if (session?.user?.id) {
      axios
        .get(`/api/coach/${session.user.id}`)
        .then((response) => setCoachData(response.data))
        .catch((error) =>
          console.error("Error fetching coach data:", error.response?.data || error.message)
        );
    }
  }, [session?.user?.id]);

  const handleCopy = () => {
    navigator.clipboard.writeText(profileUrl);
  };

  const handleEditProfileClick = () => {
    router.push("/dashboard/profile");
  };

  const profileImage = coachData?.image
    ? `${BASE_URL}${coachData.image}`
    : "/default-profile.png"; // Use a default image as fallback

  return (
    <Drawer
      variant="permanent"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        gap: "30px",
        height: "calc(100vh - 60px)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          padding: "30px",
          paddingTop: 5,
        }}
      >
        <div
          style={{
            backgroundImage: `url(${profileImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            width: "75px",
            height: "75px",
            borderRadius: "50%",
          }}
          className="mb-5"
        />

        <Box>
          <Typography
            variant="body2"
            sx={{
              width: "147px",
              textAlign: "center",
              fontFamily: "Kanit, sans-serif",
              fontSize: "18px",
              fontWeight: 700,
              color: theme.palette.text.primary,
            }}
          >
            {coachData?.firstName || "Guest"}
          </Typography>
          <Typography
            variant="caption"
            sx={{
              width: "198px",
              fontFamily: "Kanit, sans-serif",
              fontSize: "15px",
              fontWeight: 400,
              textAlign: "center",
              color: "#037D40",
              padding: 0,
            }}
          >
            {coachData?.title || "Member"}
          </Typography>
        </Box>

        <Button
          component={Link}
          href="/dashboard/profile"
          sx={{
            width: "188px",
            height: "46px",
            gap: "20px",
            borderRadius: "5px",
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

      {coachData && (
        <Box
          sx={{
            width: "100%",
            p: 2,
            borderRadius: 2,
            backgroundColor: theme.palette.background.paper,
            boxShadow: 1,
            textAlign: "center",
            mb: 2,
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 600,
              color: theme.palette.text.primary,
              fontFamily: "Kanit, sans-serif",
              mb: 1,
            }}
          >
            Your Profile URL
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: theme.palette.text.secondary,
              wordBreak: "break-word",
              mb: 1,
            }}
          >
            <Link
              href={profileUrl}
              style={{
                textDecoration: "none",
                color: theme.palette.mode === "dark" ? "white" : "#037D40",
              }}
            >
              {profileUrl}
            </Link>
          </Typography>
          <Button
            variant="contained"
            size="small"
            sx={{
              mt: 1,
              bgcolor: "#037D40",
              color: "white",
              "&:hover": { bgcolor: "#036b34" },
            }}
            startIcon={<FileCopyIcon />}
            onClick={handleCopy}
          >
            Copy Link
          </Button>
        </Box>
      )}

      <Divider />
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
          startIcon={<LogOut sx={{ fill: theme.palette.text.primary, padding: "5px" }} />}
          sx={{
            fontFamily: "Kanit, sans-serif",
            color: "#037D40",
            textTransform: "none",
            display: "flex",
            alignItems: "center",
            opacity: 0.8,
            "&:hover": {
              bgcolor: theme.palette.mode === "dark" ? "#333333" : "#D1E8D5",
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
