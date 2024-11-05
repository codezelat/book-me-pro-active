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

const drawerWidth = 357;

const Drawer = styled(MuiDrawer)({
  width: drawerWidth,
  flexShrink: 0,
  boxSizing: "border-box",
  [`& .${drawerClasses.paper}`]: {
    width: drawerWidth,
    boxSizing: "border-box",
    backgroundColor: "#ffffff",
    padding: "60px 30px",
    gap: 0,
    borderRadius: "5px 0px 0px 0px",
    opacity: 1,
  },
});

export default function SideMenu({ session }) {
  const [activeSection, setActiveSection] = React.useState("Home");

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
        ></Box>

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
          sx={{
            width: "147px",
            height: "22px",
            textAlign: "center",
            fontFamily: "Kanit, sans-serif",
            fontSize: "18px",
            fontWeight: 700,
            lineHeight: "21.6px",
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
            fontFamily: "Kanit, sans-serif",
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

      <Divider />

      <MenuContent session={session} />

      <Box
        sx={{
          width: "297px",
          height: "24px",
          padding: "0px 30px",
          gap: "15px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Button
          startIcon={<LogOut sx={{ fill: "#037D40" }} />}
          sx={{
            color: "#037D40",
            textTransform: "none",
            display: "flex",
            alignItems: "center",
          }}
          onClick={() => signOut()}
        >
          Log Out
        </Button>
      </Box>
    </Drawer>
  );
}
