"use client";
import { useState } from "react";
import { useSession, signOut, getSession } from "next-auth/react";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";

// Dummy data for the sidebar items
const sidebarItems = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Dashboard", path: "/dashboard" },
  { name: "Dashboard", path: "/dashboard" },
  { name: "Dashboard", path: "/dashboard" },
];

export default function Dashboard() {
  const { data: session, update } = useSession(); // use update to refresh session
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(session?.user?.name || "");
  const [contact, setContact] = useState(session?.user?.contact || "");
  const [loading, setLoading] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false); // For profile dropdown

  if (!session) {
    return <p>Loading...</p>;
  }

  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: "/" });
  };

  const handleProfileUpdate = async () => {
    setLoading(true);
    try {
      const response = await axios.put("/api/user/update", { name, contact });
      if (response.status === 200) {
        alert("Profile updated successfully");
        setEditMode(false);
        await updateSession(); // Update session data after profile update
      }
    } catch (error) {
      alert("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const updateSession = async () => {
    const updatedSession = await getSession(); // Fetch updated session from server
    update(updatedSession); // Update the session state with the new session data
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-1/4 bg-gray-100 p-6">
        {/* Logo */}
        <Link href="/">
          <div className="text-xl text-black font-bold mb-6">SalePol</div>
        </Link>

        {/* Sidebar Menu */}
        <ul className="space-y-4">
          {sidebarItems.map((item) => (
            <li key={item.name}>
              {/* Removed <a> inside <Link> */}
              <Link
                href={item.path}
                className="text-lg text-gray-700 hover:text-blue-500"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-6 bg-gray-50">
        {/* Topbar */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl text-black font-semibold">
            Welcome Back, {session.user.name}!
          </h1>
          <div className="relative">
            {/* Profile Image and Dropdown */}
            <div
              className="flex items-center cursor-pointer"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <Image
                src={session.user.image || "/images/coach/coach.png"}
                width={40}
                height={40}
                className="rounded-full"
                alt="Profile"
              />
              <span className="ml-2 text-black font-light">
                {session.user.name}
              </span>
              <svg
                className="ml-2 text-black font-light w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </div>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <ul className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-md">
                <li className="px-4 text-black font-light py-2 hover:bg-gray-100">
                  <Link href="/my-profile">My Profile</Link>
                </li>
                <li
                  className="px-4 py-2 text-black font-light hover:bg-gray-100"
                  onClick={handleLogout}
                >
                  Logout
                </li>
              </ul>
            )}
          </div>
        </div>

        {/* Middle Area - You can place additional components or messages here */}
        <div className="text-gray-600">
          <div className="text-black text-4xl">Hi</div>
        </div>
      </main>
    </div>
  );
}
