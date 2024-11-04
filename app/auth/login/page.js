"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link"; // Import Link from next/link

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    if (result.ok) {
      router.push("/dashboard/dash");
    } else {
      alert("Login failed");
    }
  };

  return (
    <div className="mt-24 py-24 container px-20 mx-auto">
      <h1 className="text-black">Login</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="py-2 px-4"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className="py-2 px-4"
        />
        <div className="bg-blue-600 flex justify-center w-40   px-6 py-3">
          <button className="text-white" type="submit">
            Login
          </button>
        </div>
      </form>
      <p className="mt-5">
        {" "}
        <Link className="text-black text-xl " href="/auth/signup">Sign up</Link>
      </p>
    </div>
  );
}
