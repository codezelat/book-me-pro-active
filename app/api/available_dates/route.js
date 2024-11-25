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

// // DELETE request: Remove an available date by ID
// export async function DELETE(req) {
//   const { id } = req.query; // Assuming you are passing the ID as a query parameter

//   if (!id) {
//     return new Response(JSON.stringify({ message: "ID is required." }), { status: 400 });
//   }

//   const { db } = await connectToDatabase();

//   try {
//     const result = await db.collection("available_dates").deleteOne({ _id: new ObjectId(id) }); // Ensure to import ObjectId

//     if (result.deletedCount === 0) {
//       return new Response(JSON.stringify({ message: "Date not found." }), { status: 404 });
//     }

//     return new Response(JSON.stringify({ message: "Date deleted successfully." }), { status: 200 });
//   } catch (error) {
//     console.error("Error deleting available date:", error);
//     return new Response(JSON.stringify({ message: "Error deleting available date.", error: error.message }), { status: 500 });
//   }
// }

// // DELETE request: Remove a specific time slot from an available date
// export async function DELETE_TIME_SLOT(req) {
//   const { id, index } = req.query; // Assuming you are passing the ID and index as query parameters

//   if (!id || index === undefined) {
//     return new Response(JSON.stringify({ message: "ID and index are required." }), { status: 400 });
//   }

//   const { db } = await connectToDatabase();

//   try {
//     // Fetch the available date document
//     const availableDate = await db.collection("available_dates").findOne({ _id: new ObjectId(id) });
    
//     if (!availableDate) {
//       return new Response(JSON.stringify({ message: "Date not found." }), { status: 404 });
//     }

//     // Ensure the index is a number
//     const indexNum = parseInt(index, 10);
//     if (isNaN(indexNum) || indexNum < 0 || indexNum >= availableDate.timeSlots.length) {
//       return new Response(JSON.stringify({ message: "Invalid index." }), { status: 400 });
//     }

//     // Remove the time slot
//     availableDate.timeSlots.splice(indexNum, 1); // Remove the time slot from the array

//     // Update the document in the database
//     await db.collection("available_dates").updateOne(
//       { _id: new ObjectId(id) },
//       { $set: { timeSlots: availableDate.timeSlots } } // Update the timeSlots array
//     );

//     return new Response(JSON.stringify(availableDate), { status: 200 });
//   } catch (error) {
//     console.error("Error removing time slot:", error);
//     return new Response(JSON.stringify({ message: "Error removing time slot.", error: error.message }), { status: 500 });
//   }
// }