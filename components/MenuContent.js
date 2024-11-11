import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AnalyticsRoundedIcon from "@mui/icons-material/AnalyticsRounded";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import HelpRoundedIcon from "@mui/icons-material/HelpRounded";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { useTheme } from "@mui/material/styles";

const mainListItems = [
  { text: "Dashboard", icon: <HomeRoundedIcon /> },
  { text: "My Bookings", icon: <AnalyticsRoundedIcon /> },
  { text: "My Calendar", icon: <AssignmentRoundedIcon /> },
];

const secondaryListItems = [
  { text: "Contact Us", icon: <HelpRoundedIcon /> },
  { text: "Settings", icon: <SettingsRoundedIcon /> },
];

export default function MenuContent() {
  const [selectedIndex, setSelectedIndex] = React.useState(null);

  const handleListItemClick = (index) => {
    setSelectedIndex(index);
  };

  const theme = useTheme();
  
  const textColor = theme.palette.mode === "dark" ? "white" : "#037D40";
  const bgColorHover = theme.palette.mode === "dark" ? "#333333" : "#D1E8D5";
  const selectedBgColor = theme.palette.mode === "dark" ? "#333333" : "#D1E8D5";

  return (
    <Stack
      sx={{
        width: "297px",
        height: "auto",
        gap: "20px",
        opacity: 1,
        flexGrow: 1,
        p: 1,
        justifyContent: "space-between",
        fontFamily: "Kanit, sans-serif", // Apply the font family here
      }}
    >
      <List dense>
        <div
          style={{
            width: "297px",
            height: "18px",
            padding: "0px 20px",
            gap: "10px",
            color: "#037D40",
            fontSize: "18px",
            fontWeight: 700,
            textAlign: "left",
            marginBottom: "10px",
            fontFamily: "Kanit, sans-serif", // Apply the font family to the section title
          }}
        >
          Main Menu
        </div>
        {mainListItems.map((item, index) => (
          <React.Fragment key={index}>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => handleListItemClick(index)}
                sx={{
                  width: "297px",
                  height: "64px",
                  padding: "20px 0 0 0",
                  justifyContent: "space-between",
                  bgcolor:
                    selectedIndex === index ? selectedBgColor : "inherit",
                  "&:hover": { bgcolor: bgColorHover },
                  color: textColor,
                  gap: "0px",
                  opacity: 1,
                  borderRadius: 0,
                }}
              >
                <ListItemIcon
                  sx={{
                    width: "24px",
                    height: "24px",
                    padding: "2px 0 0 0",
                    gap: "0px",
                  }}
                >
                  {React.cloneElement(item.icon, {
                    sx: { fill: textColor },
                  })}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  sx={{
                    width: "88px",
                    height: "22px",
                    typography: "body1",
                    fontFamily: "Kanit, sans-serif", // Apply the font family
                    fontSize: "18px",
                    fontWeight: 400,
                    lineHeight: "21.6px",
                    textAlign: "left",
                    color: textColor,
                  }}
                />
                <ArrowRightIcon sx={{ fill: textColor }} />
              </ListItemButton>
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>

      <List dense>
        <div
          style={{
            width: "297px",
            height: "18px",
            padding: "0px 20px",
            gap: "10px",
            color: "#037D40",
            fontSize: "18px",
            fontWeight: 700,
            textAlign: "left",
            marginBottom: "10px",
            fontFamily: "Kanit, sans-serif", // Apply the font family to the section title
          }}
        >
          Help & Support
        </div>
        {secondaryListItems.map((item, index) => (
          <React.Fragment key={index}>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() =>
                  handleListItemClick(index + mainListItems.length)
                }
                sx={{
                  width: "297px",
                  height: "64px",
                  padding: "20px 0 0 0",
                  justifyContent: "space-between",
                  bgcolor:
                    selectedIndex === index + mainListItems.length
                      ? selectedBgColor
                      : "transparent",
                  "&:hover": { bgcolor: bgColorHover },
                  color: textColor,
                  gap: "0px",
                  opacity: 1,
                  borderRadius: 0,
                }}
              >
                <ListItemIcon
                  sx={{
                    width: "24px",
                    height: "24px",
                    padding: "2px 0 0 0",
                    gap: "0px",
                    opacity: 0.8,
                  }}
                >
                  {React.cloneElement(item.icon, {
                    sx: { fill: textColor },
                  })}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  sx={{
                    width: "88px",
                    height: "22px",
                    typography: "body1",
                    fontFamily: "Kanit, sans-serif", // Apply the font family
                    fontSize: "18px",
                    fontWeight: 400,
                    lineHeight: "21.6px",
                    textAlign: "left",
                  }}
                />
                <ArrowRightIcon sx={{ fill: textColor }} />
              </ListItemButton>
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </Stack>
  );
}
