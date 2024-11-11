import { CircleChevronUp, User, CalendarDays, Clock, Bell, Phone, Mail } from "lucide-react";
import React from "react";
import { useTheme } from "@mui/material/styles";

const UserDescription = ({ user, onClose }) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  if (!user) return null;

  return (
    <div
      className={`p-4 px-5 pb-10 ${isDarkMode ? "bg-[#1E1E1E] text-white" : "bg-[#F7FAFF] text-black"}`}
    >
      <div className="px-5 py-5">
        <div className="flex justify-between items-center pb-5">
          <div className="flex gap-2">
            <User height={17} width={17} style={{ stroke: isDarkMode ? "#90CAF9" : "#037D40" }} />
            <strong>Name:</strong> {user.Name}
          </div>
          <div className="flex gap-2">
            <CalendarDays height={17} width={17} style={{ stroke: isDarkMode ? "#90CAF9" : "#037D40" }} />
            <strong>Date:</strong> {user.Date}
          </div>
          <div className="flex gap-2">
            <Clock height={17} width={17} style={{ stroke: isDarkMode ? "#90CAF9" : "#037D40" }} />
            <strong>Time:</strong> {user.Time}
          </div>
          <div className="flex gap-2">
            <Bell height={17} width={17} style={{ stroke: isDarkMode ? "#90CAF9" : "#037D40" }} />
            <strong>Status:</strong> {user.status}
          </div>
          <button
            onClick={onClose}
            style={{ backgroundColor: isDarkMode ? "#90CAF9" : "#037D40", cursor: "pointer" }}
          >
            <CircleChevronUp size={30} style={{ color: "#fff", padding: "6px" }} />
          </button>
        </div>
        <div>
          <strong>Description:</strong>
          <p className="pt-5 text-wrap pb-5">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Modi quasi
            voluptatem voluptate sunt dolor consectetur...
          </p>
        </div>
        <div className="flex" style={{ gap: "8px", alignItems: "center" }}>
          <button
            className="px-3 py-2 rounded-sm"
            onClick={() => alert(`Calling ${user.phone}`)}
            style={{
              backgroundColor: "#037D40",
              color: "white",
              cursor: "pointer",
              marginRight: "8px",
            }}
          >
            <Phone size={29} style={{ color: "white", padding: "5px" }} />
            0760237431
          </button>
          <button
            className="px-3 py-2 rounded-sm"
            onClick={() => alert(`Emailing ${user.email}`)}
            style={{
              backgroundColor: "#037D40",
              color: "white",
              cursor: "pointer",
            }}
          >
            <Mail size={29} style={{ color: "white", padding: "5px" }} />
            sakuniakela273@gmail.com
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDescription;
