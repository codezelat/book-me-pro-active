// app/api/coach/[coachId]/route.js
import { ObjectId } from "mongodb";
import connectToDatabase from "../../../../Lib/mongodb";
import User from "@/models/user";

export async function GET(req, { params }) {
  const { db } = await connectToDatabase();
  const coachId = params.coachId;

  try {
    const coach = await db
      .collection("users")
      .findOne({ _id: new ObjectId(coachId) });
    if (!coach) {
      return new Response("Coach not found", { status: 404 });
    }

    // Structure the response data
    const coachData = {
      id: coach._id.toString(),
      firstName: coach.firstName || "No name available",

      lastName: coach.lastName,
      email: coach.email,

      description: coach.description,

      hourlyRate: coach.hourlyRate,
      title: coach.title,
      contact: coach.contact,
      image: coach.image || "/images/default-coach.png",
    };

    return new Response(JSON.stringify(coachData), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching coach:", error);
    return new Response("An error occurred while fetching the coach", {
      status: 500,
    });
  }
}
