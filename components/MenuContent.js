import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import { Album } from "lucide-react";
import { CalendarDays } from "lucide-react";
import { Settings } from "lucide-react";
import { LayoutGrid } from "lucide-react";
import { CircleAlert } from "lucide-react";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const mainListItems = [
  { text: "Dashboard", icon: <LayoutGrid /> },
  { text: "My Bookings", icon: <Album /> },
  { text: "My Calendar", icon: <CalendarDays /> },
];

const secondaryListItems = [
  { text: "Contact Us", icon: <CircleAlert /> },
  { text: "Settings", icon: <Settings /> },
];

export default function MenuContent() {
  const [selectedIndex, setSelectedIndex] = React.useState(null);

  const handleListItemClick = (index) => {
    setSelectedIndex(index);
  };

  const theme = useTheme();

  const textColor = "#037D40";
  const iconColor = "#037D40";
  const bgColorHover = theme.palette.mode === "dark" ? "#333333" : "#D1E8D5";
  const selectedBgColor = theme.palette.mode === "dark" ? "#333333" : "#D1E8D5";

  return (
    <Stack
      sx={{
        width: "297px",
        height: "auto",
        gap: "20px",
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
            color: textColor,
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
                  padding: "0 20px", // Uniform padding
                  justifyContent: "space-between",
                  alignItems: "center", // Ensure vertical alignment
                  bgcolor:
                    selectedIndex === index ? selectedBgColor : "inherit",
                  "&:hover": { bgcolor: bgColorHover },
                  color: textColor,
                  gap: "0px",
                  opacity: 1,
                  borderRadius: 0,
                }}
              >
                <Box sx={{ gap: 4, display: "flex" }}>
                  <ListItemIcon
                    sx={{
                      width: "24px",
                      height: "24px",
                      display: "flex",
                      alignItems: "center", // Center icon vertically
                      justifyContent: "center", // Center icon horizontally
                      color: iconColor,
                    }}
                  >
                    {React.cloneElement(item.icon, {
                      size: 28, // Increase icon size
                      strokeWidth: 2, // Make icon bold
                      color: iconColor,
                    })}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    primaryTypographyProps={{
                      sx: {
                        fontSize: "22px", // Adjust to your desired size
                        fontWeight: "bold",
                        lineHeight: "21.6px",
                        textAlign: "left",
                        color: textColor,
                        fontFamily: "Kanit, sans-serif",
                      },
                    }}
                    sx={{
                      display: "flex",
                      alignItems: "center", // Ensure text aligns vertically with icon
                    }}
                  />
                </Box>
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
            color: textColor,
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
                  
                  justifyContent: "space-between",
                  alignItems: "center", // Ensure vertical alignment
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
                <Box sx={{ gap: 4, display: "flex" }}>
                  <ListItemIcon
                    sx={{
                      width: "24px",
                      height: "24px",
                      display: "flex",
                      alignItems: "center", // Center icon vertically
                      justifyContent: "center", // Center icon horizontally
                      color: iconColor,
                      paddingLeft:"4px"
                    }}
                  >
                    {React.cloneElement(item.icon, {
                      size: 28, // Increase icon size
                      strokeWidth: 2, // Make icon bold
                      color: iconColor,
                    })}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    primaryTypographyProps={{
                      sx: {
                        fontSize: "20px", // Adjust to your desired size
                        fontWeight: "bold",
                        lineHeight: "21.6px",
                        textAlign: "left",
                        color: textColor,
                        fontFamily: "Kanit, sans-serif",
                      },
                    }}
                    sx={{
                      display: "flex",
                      alignItems: "center", // Ensure text aligns vertically with icon
                    }}
                  />
                </Box>
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
