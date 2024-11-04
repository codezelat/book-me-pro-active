// app/dashboard/page.js
"use client";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";


export default function Dashboard() {
  const { data: session } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  if (!session) {
    return <p>Loading...</p>;
  }

  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: "/" });
  };
  

  return (
    <div className="flex h-screen">
      <aside className="w-1/4 bg-gray-100 p-6">
        <Link href="/" className="text-3xl text-black font-bold mb-6">
          BookMePro
        </Link>
        <ul className="mt-6 space-y-4">
          <li>
            <Link
              href="/dashboard"
              className="text-lg text-gray-700 font-semibold"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard"
              className="text-lg text-gray-700 font-semibold"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard"
              className="text-lg text-gray-700 font-semibold"
            >
              Dashboard
            </Link>
          </li>
        </ul>
      </aside>

      <main className="flex-grow p-6 bg-gray-50">
        <div className="flex justify-between mb-6">
          <h1 className="text-2xl text-black font-semibold">
            Welcome Back, {session.user.name}!
          </h1>
          <div className="relative">
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
            </div>
            {dropdownOpen && (
              <ul className="absolute right-0 mt-2 w-48 bg-white shadow-md">
                <li className="px-4 text-gray-700 py-2">
                  <Link href="/ProfileEditComponent">My Profile</Link>
                </li>
                <li className="px-4 text-gray-700 py-2" onClick={handleLogout}>
                  Logout
                </li>
              </ul>
            )}
          </div>
        </div>

        <div>
          <h2 className="text-lg text-gray-700 font-semibold">
            Your Profile Link:
          </h2>
          <Link
            href={`/coach/${session.user.id}`}
            className="text-blue-500 underline"
          >
            {`https://yourdomain.com/coach/${session.user.id}`}
          </Link>
        </div>
      </main>
    </div>
  );
}
