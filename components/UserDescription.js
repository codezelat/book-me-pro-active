import { CircleChevronUp, User, CalendarDays, Clock, Bell } from "lucide-react";
import React from "react";
import { useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { Phone, Mail, CircleX, CircleCheck } from "lucide-react";

const UserDescription = ({ user, onClose }) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  if (!user) return null;
  return (
    <div
      className={`p-4 px-5 pb-10 ${
        isDarkMode ? "bg-[#1E1E1E] text-white" : "bg-[#F7FAFF] text-black"
      }`}
    >
      <div className="px-5 py-5">
        <div className="flex justify-between items-center pb-5">
          <div className="flex gap-2">
            <User
              height={17}
              width={17}
              style={{
                stroke: isDarkMode ? "#90CAF9" : "#037D40",
              }}
            />
            <strong>Name:</strong> {user.Name}
          </div>

          <div className="flex gap-2">
            <CalendarDays
              height={17}
              width={17}
              style={{
                stroke: isDarkMode ? "#90CAF9" : "#037D40",
              }}
            />
            <strong>Date:</strong> {user.Date}
          </div>

          <div className="flex gap-2">
            <Clock
              height={17}
              width={17}
              style={{
                stroke: isDarkMode ? "#90CAF9" : "#037D40",
              }}
            />
            <strong>Time:</strong> {user.Time}
          </div>

          <div className="flex gap-2">
            <Bell
              height={17}
              width={17}
              style={{
                stroke: isDarkMode ? "#90CAF9" : "#037D40",
              }}
            />
            <strong>Status:</strong> {user.status}
          </div>

          <button
            onClick={onClose}
            style={{
              backgroundColor: isDarkMode ? "#90CAF9" : "#037D40",
              cursor: "pointer",
            }}
          >
            <CircleChevronUp
              size={30}
              style={{ color: "#fff", padding: "6px" }}
            />
          </button>
        </div>
        <div>
          <strong>Description:</strong>
          <p className="pt-5 text-wrap pb-5">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Modi quasi
            voluptatem voluptate sunt dolor consectetur, perspiciatis nisi
            praesentium molestias, repudiandae maiores culpa dolore architecto,
            blanditiis cumque itaque pariatur impedit ducimus! Lorem ipsum
            dolor, sit amet consectetur adipisicing elit. Modi quasi voluptatem
            voluptate sunt dolor consectetur, perspiciatis nisi praesentium
            molestias, repudiandae maiores culpa dolore architecto, blanditiis
            cumque itaque pariatur impedit ducimus!
          </p>
        </div>

        <div
          className="flex justify-between items-center"
          style={{
            display: "flex",
            gap: "8px",
            alignItems: "center",
            justifyItems: "between",
            width: "100%",
            height: "100%",
          }}
        >
          <div className="flex gap-2">
          <button
              className=" rounded-sm px-2
                py-60.5 text-white"
              onClick={() => alert(`Calling ${params.value}`)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#037D40",
                border: "1",
                borderColor: "#037D40",

                cursor: "pointer",
                marginRight: "8px",
              }}
            >
              <Phone
                size={29}
                style={{
                  color: "white",
                  // backgroundColor: "#fff",
                  borderRadius: "20%",
                  // border: "2px solid #037D40",
                  padding: "5px",
                }}
              />
              0760237431
            </button>


            <button
              className=" rounded-sm px-2 text-white
                py-0.5"
              onClick={() => alert(`Calling ${params.value}`)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#037D40",
                border: "1",
                borderColor: "#037D40",

                cursor: "pointer",
                marginRight: "8px",
              }}
            >
              <Mail
                size={29}
                style={{
                  color: "white",
                  // backgroundColor: "#fff",
                  borderRadius: "20%",
                  // border: "2px solid #037D40",
                  padding: "5px",
                }}
              />
              sakuniakela273@gmail.com
            </button>

          </div>
          <div className="flex gap-2 px-2
                py-0.5"> 
          <Button
              sx={{
                bgcolor: "#D50000",
                color: "white",
                px: 2,
                py: 0.5,
                "&:hover": { bgcolor: "#B20000" },
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1.5,
              }}
              size="small"
              onClick={() => alert("Declined")}
            >
              Decline
              <CircleX sx={{ color: "white", fill: "white" }} />
            </Button>

            <Button
              sx={{
                bgcolor: "#037D40",
                color: "white",
                px: 2,
                py: 0.5,
                "&:hover": { bgcolor: "#025b2e" },
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1.5,
              }}
              size="small"
              onClick={() => alert("Accepted")}
            >
              Approve
              <CircleCheck sx={{ color: "white", fill: "white" }} />
            </Button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDescription;
