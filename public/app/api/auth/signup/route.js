import clientPromise from "@/Lib/mongodb"; // Adjust import path according to your structure
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server"; // Use NextResponse in App Router

export async function POST(req) {
    try {
        const { name, email, password, contact } = await req.json();  // Parse the request body

        const hashedPassword = bcrypt.hashSync(password, 10);
        const client = await clientPromise;
        const db = client.db("your-database-name");

        // Check if the user already exists
        const user = await db.collection("users").findOne({ email });

        if (user) {
            return NextResponse.json({ message: "User already exists" }, { status: 400 });
        }

        // Insert new user into the database
        await db.collection("users").insertOne({
            name,
            email,
            password: hashedPassword,
            contact
        });

        return NextResponse.json({ message: "User created successfully" }, { status: 200 });

    } catch (error) {
        console.error("Error creating user:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
