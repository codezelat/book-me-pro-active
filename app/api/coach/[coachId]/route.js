// app/api/coach/[coachId]/route.js
import { ObjectId } from "mongodb";
import connectToDatabase from "@/Lib/mongodb";

export async function GET(req, { params }) {
    const { db } = await connectToDatabase();
    const coachId = params.coachId;

    try {
        const coach = await db.collection("users").findOne({ _id: new ObjectId(coachId) });
        if (!coach) {
            return new Response("Coach not found", { status: 404 });
        }

        // Structure the response data
        const coachData = {
            id: coach._id.toString(),
            name: coach.name || "No name available",
            email: coach.email,
            contact: coach.contact,
            image: coach.image || "/images/default-coach.png",
        };

        return new Response(JSON.stringify(coachData), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error fetching coach:", error);
        return new Response("An error occurred while fetching the coach", { status: 500 });
    }
}
