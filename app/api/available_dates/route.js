import connectToDatabase from "../../../Lib/mongodb"; // Adjust the path
import { ObjectId } from "mongodb"; // Ensure to import ObjectId

// POST request: Create a new available date
export async function POST(req) {
  const { date, slots, timeSlots, coachId } = await req.json();

  // Validate required fields
  if (!date || !slots || !timeSlots || !coachId) {
    return new Response(JSON.stringify({ message: "Date, slots, and coachId are required." }), { status: 400 });
  }

  const { db } = await connectToDatabase();

  try {
    const availableDate = {
      date: new Date(date), // Ensure this is a valid date
      slots,
      timeSlots,
      coachId, // Include coachId in the document
    };

    const result = await db.collection("available_dates").insertOne(availableDate);
    return new Response(JSON.stringify(result), { status: 201 });
  } catch (error) {
    console.error("Error saving available date:", error);
    return new Response(JSON.stringify({ message: "Error saving available date.", error: error.message }), { status: 500 });
  }
}

// GET request: Fetch all available dates for a specific coach
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const coachId = searchParams.get("coachId"); // Get coachId from query parameters

  if (!coachId) {
    return new Response(JSON.stringify({ message: "coachId is required." }), { status: 400 });
  }

  const { db } = await connectToDatabase();

  try {
    const result = await db.collection("available_dates").find({ coachId }).toArray(); // Filter by coachId
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    console.error("Error fetching available dates:", error);
    return new Response(JSON.stringify({ message: "Error fetching available dates." }), { status: 500 });
  }
}

// DELETE request: Remove an available date by ID
export async function DELETE(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id"); // Get the ID from query parameters

  if (!id) {
    return new Response(JSON.stringify({ message: "ID is required." }), { status: 400 });
  }

  const { db } = await connectToDatabase();

  try {
    const result = await db.collection("available_dates").deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return new Response(JSON.stringify({ message: "No available date found." }), { status: 404 });
    }

    return new Response(JSON.stringify({ message: "Available date deleted successfully." }), { status: 200 });
  } catch (error) {
    console.error("Error deleting available date:", error);
    return new Response(JSON.stringify({ message: "Error deleting available date.", error: error.message }), { status: 500 });
  }
}

// PUT request: Update time slots for a specific available date
export async function PUT(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id"); // Get the ID from query parameters

  if (!id) {
    return new Response(JSON.stringify({ message: "ID is required." }), { status: 400 });
  }

  const { db } = await connectToDatabase();
  const { timeSlots } = await req.json(); // Get the new time slots from the request body

  try {
    const result = await db.collection("available_dates").updateOne(
      { _id: new ObjectId(id) },
      { $set: { timeSlots } } // Update the timeSlots field
    );

    if (result.modifiedCount === 0) {
      return new Response(JSON.stringify({ message: "No available date found or no changes made." }), { status: 404 });
    }

    return new Response(JSON.stringify({ message: "Time slots updated successfully." }), { status: 200 });
  } catch (error) {
    console.error("Error updating time slots:", error);
    return new Response(JSON.stringify({ message: "Error updating time slots.", error: error.message }), { status: 500 });
  }
}