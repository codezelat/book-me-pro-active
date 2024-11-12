"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); // Reset error message

        const result = await signIn("credentials", {
            redirect: false,
            email,
            password,
        });

        if (result?.error) {
            setError(result.error); // Display error message
        } else {
            router.push("/dashboard"); // Redirect to dashboard if login is successful
        }
    };

    return (
        <div className="grid place-items-center h-screen">
                        <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400">
                <h1 className="text-xl font-bold my-4">Login</h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
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
                        className="py-2 px-4"
                        required
                    />
                    <button className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2">
                        Login
                    </button>
                    {error && (
                        <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                            {error}
                        </div>
                    )}

                    <Link className="text-sm mt-3 text-right" href={"/auth/signup"}>
                        Don&apos;t have an account? <span className="underline">Register</span>
                    </Link>
                </form>
            </div>
        </div>
    );
}