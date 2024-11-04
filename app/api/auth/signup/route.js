// app/api/auth/signup/route.js
import connectToDatabase from "@/Lib/mongodb";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { name, email, password, contact } = await req.json();

        // Basic validation to ensure all fields are provided
        if (!name || !email || !password || !contact) {
            return NextResponse.json({ message: "All fields are required." }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const { db } = await connectToDatabase();

        // Check if the user already exists
        const existingUser = await db.collection("users").findOne({ email });
        if (existingUser) {
            return NextResponse.json({ message: "User already exists." }, { status: 409 });
        }

        // Insert the new user
        await db.collection("users").insertOne({
            name,
            email,
            password: hashedPassword,
            contact,
            createdAt: new Date(),
        });

        return NextResponse.json({ message: "User created successfully" }, { status: 201 });
    } catch (error) {
        console.error("Error creating user:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
