// app/coach/update/route.js
import { NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";

const uri = process.env.MONGODB_URI; // Ensure your environment variable is set correctly
const dbName = "your-database-name"; // Replace with your database name

export const segmentConfig = {
  runtime: "nodejs", // Use "edge" if you're deploying to Edge Runtime
};

export async function POST(req) {
  try {
    // Parse the incoming JSON data from the request body
    const body = await req.json();
    const { coachId, updateData } = body;

    if (!coachId || !updateData) {
      return NextResponse.json(
        { success: false, message: "Invalid request payload" },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db(dbName);

    // Update the coach's data in the database
    const result = await db.collection("users").updateOne(
      { _id: new ObjectId(coachId) },
      { $set: updateData }
    );

    // Close the connection
    await client.close();

    // Check if the update was successful
    if (result.modifiedCount === 0) {
      return NextResponse.json(
        { success: false, message: "No updates were made" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Coach data updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating coach data:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
