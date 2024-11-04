"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contact, setContact] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear any previous error message

    try {
      const res = await axios.post("/api/auth/signup", {
        name,
        email,
        password,
        contact,
      });

      if (res.status === 201) {
        router.push("/auth/login"); // Redirect on successful signup
      }
    } catch (err) {
      if (err.response && err.response.status === 409) {
        setError("User already exists. Please use a different email.");
      } else if (err.response && err.response.status === 400) {
        setError("Please fill in all fields correctly.");
      } else {
        setError("Signup failed. Please try again.");
      }
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
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ border: "1px solid black" }}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ border: "1px solid black" }}
          required
        />
        <input
          type="text"
          placeholder="Contact Number"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          style={{ border: "1px solid black" }}
          required
        />
        <button className="bg-blue-600 px-6 py-3 text-white" type="submit">
          Sign Up
        </button>
      </form>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}
