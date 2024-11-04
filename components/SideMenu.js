import * as React from "react";
import { styled } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import MuiDrawer, { drawerClasses } from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import MenuContent from "./MenuContent";
import OptionsMenu from "./OptionsMenu";
import Link from "next/link";

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

export default function SideMenu({ session }) {
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
          alt={session?.user?.name || "User"}
          src={session?.user?.image || "default-image.jpg"}
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
          {session?.user?.name || "Guest"}
        </Typography>
        <Typography variant="caption" sx={{ color: "text.secondary" }}>
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
          p: 2,
          borderTop: "1px solid",
          borderColor: "divider",
        }}
      >
        <OptionsMenu />
      </Box>
    </Drawer>
  );
}
