"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [contact, setContact] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Start loading
        setError(""); // Reset error message

        // Basic validation
        if (!name || !email || !password || !contact) {
            setError("All fields are required.");
            setLoading(false);
            return;
        }

        const userData = { name, email, password, contact };

        // Proceed with user registration
        const response = await fetch("/api/auth/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });

        const data = await response.json();

        if (!response.ok) {
            setError(data.message || "Registration failed. Please try again.");
        } else {
            // Redirect to login page after successful registration
            router.push('/auth/login');
        }

        setLoading(false); // Stop loading
    };

    return (
        <div className="grid place-items-center h-screen">
            <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400">
                <h1 className="text-xl font-bold my-4">Register</h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="py-2 px-4"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="py-2 px-4"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="py-2 px-4"
                    />
                    <input
                        type="text"
                        placeholder="Contact Number"
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                        required
                        className="py-2 px-4"
                    />
                    <button className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2" disabled={loading}>
                        {loading ? "Registering..." : "Register"}
                    </button>

                    {error && (
                        <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                            {error}
                        </div>
                    )}

                    <Link className="text-sm mt-3 text-right" href={"/auth/login"}>
                        Already have an account? <span className="underline">Login</span>
                    </Link>
                </form>
            </div>
        </div>
    );
}