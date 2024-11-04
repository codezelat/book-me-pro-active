// UserDescription Component
import { CircleChevronUp } from "lucide-react";
import React from "react";
import { User } from "lucide-react";
import { CalendarDays } from "lucide-react";
import { Clock } from "lucide-react";
import { Bell } from "lucide-react";

const UserDescription = ({ user }) => {
  if (!user) return null;

  return (
    <div className="bg-[#F7FAFF] p-4 text-black px-5">
      <div className="px-5 py-5">
        <div className="flex justify-between items-center pb-5">
          <div className="flex gap-2 ">
            <User
              height={17}
              width={17}
              className="fill-white"
              style={{
                outline: "none",
                border: "none",
                boxShadow: "none", // Ensures no shadow
                stroke: "#037D40", // Removes any SVG stroke if present
              }}
            />
            <strong>Name:</strong> {user.Name}
          </div>

          <div className="flex gap-2">
            <CalendarDays
              height={17}
              width={17}
              className="fill-white"
              style={{
                stroke: "#037D40",
              }}
            />
            <strong>Date:</strong> {user.Date}
          </div>

          <div className="flex gap-2">
            <Clock
              height={17}
              width={17}
              className="fill-white"
              style={{
                stroke: "#037D40",
              }}
            />
            <strong>Time:</strong> {user.Time}
          </div>

          <div className="flex gap-2">
            <Bell
              height={17}
              width={17}
              className="fill-white"
              style={{
                stroke: "#037D40",
              }}
            />
            <strong>Status:</strong> {user.status}
          </div>
          <button
            style={{
              backgroundColor: "#037D40",
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
          <p className="pt-5 text-wrap md:text-balance">
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
      </div>
    </div>
  );
};

export default UserDescription;
