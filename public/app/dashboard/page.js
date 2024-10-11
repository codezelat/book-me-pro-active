"use client";
import { useSession, signOut } from "next-auth/react";

export default function Dashboard() {
    const { data: session } = useSession();

    if (!session) {
        return <p>Loading...</p>;
    }

    const handleLogout = async () => {
        await signOut({ redirect: true, callbackUrl: "/" });
    };

    return (
        <div className="mt-48">
            <h1 className="text-black text-4xl">Welcome, {session.user.name}</h1>
            <img src={session.user.image || "/images/coach/coach.png"} className="w-1/3" alt="Profile" />
            <p className="text-black text-xl">Email: {session.user.email}</p>
            <p className="text-black text-xl">Contact Number:{session.user.contact} </p>
            <button onClick={handleLogout} className="bg-blue-600 text-white p-2 rounded mt-4">
                Logout
            </button>
        </div>

        
    );
}
