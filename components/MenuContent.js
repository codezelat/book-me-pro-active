import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AnalyticsRoundedIcon from "@mui/icons-material/AnalyticsRounded";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import HelpRoundedIcon from "@mui/icons-material/HelpRounded";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { useTheme } from "@mui/material/styles"; // Import useTheme for theme-based styles

const mainListItems = [
  { text: "Home", icon: <HomeRoundedIcon /> },
  { text: "My Bookings", icon: <AnalyticsRoundedIcon /> },
  { text: "Booking Requests", icon: <PeopleRoundedIcon /> },
  { text: "My Calendar", icon: <AssignmentRoundedIcon /> },
];

const secondaryListItems = [
  { text: "Settings", icon: <SettingsRoundedIcon /> },
  { text: "About", icon: <InfoRoundedIcon /> },
  { text: "Feedback", icon: <HelpRoundedIcon /> },
];

export default function MenuContent() {
  const [selectedIndex, setSelectedIndex] = React.useState(null);

  const handleListItemClick = (index) => {
    setSelectedIndex(index); // Update selected index on click
  };

  const theme = useTheme(); // Access the current theme
  const textColor = theme.palette.mode === "dark" ? "white" : "#037D40"; // Dynamic text color based on mode
  const bgColorHover = theme.palette.mode === "dark" ? "E4E0E1" : "#D1E8D5"; // Dynamic background color
  const selectedBgColor = "#D1E8D5"; // Background color for selected item

  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: "space-between" }}>
      <List dense>
        {mainListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              onClick={() => handleListItemClick(index)} // Set selected index on click
              sx={{
                bgcolor: selectedIndex === index ? selectedBgColor : "inherit", // Change color when selected
                "&:hover": { bgcolor: bgColorHover }, // Apply hover color
                color: textColor, // Change text color based on mode
              }}
            >
              <ListItemIcon>
                {React.cloneElement(item.icon, {
                  sx: { fill: textColor },
                })}
              </ListItemIcon>
              <ListItemText primary={item.text} />
              <ArrowRightIcon sx={{ fill: textColor }} />{" "}
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <List dense>
        {secondaryListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              onClick={() => handleListItemClick(index + mainListItems.length)} // Set selected index on click
              sx={{
                bgcolor:
                  selectedIndex === index + mainListItems.length
                    ? selectedBgColor
                    : "transparent", // Change color when selected
                "&:hover": { bgcolor: bgColorHover }, // Apply hover color
                color: textColor, // Change text color based on mode
              }}
            >
              <ListItemIcon>
                {React.cloneElement(item.icon, {
                  sx: { fill: textColor },
                })}
              </ListItemIcon>
              <ListItemText primary={item.text} />
              <ArrowRightIcon sx={{ fill: textColor }} />{" "}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}
