"use client"; // Marks this component as a Client Component

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation"; // Import from 'next/navigation'

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contact, setContact] = useState("");
  const [error, setError] = useState("");
  const router = useRouter(); // useRouter from 'next/navigation'

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/signup", {
        name,
        email,
        password,
        contact,
      });
      if (res.status === 200) {
        router.push("/auth/login"); // Redirect to login page on success
      }
    } catch (err) {
      setError("Signup failed. Please try again.");
    }
  };

  return (
    <div className="mt-24 py-24 container px-20 mx-auto">
      <h1 className="text-black text-2xl">Signup</h1>
      <form className="flex gap-4 flex-row" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ border: "1px solid black" }}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ border: "1px solid black" }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ border: "1px solid black " }}
        />
        <input
          type="text"
          placeholder="Contact Number" // New field for contact
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          style={{ border: "1px solid black" }}
        />
        <div className="bg-blue-600 px-6 py-3">
          <button className="text-white" type="submit">
            Sign Up
          </button>{" "}
        </div>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}
