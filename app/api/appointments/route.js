// app/api/appointments/route.js
import  connectToDatabase  from "../../../Lib/mongodb"; // Adjust the path 

// POST request: Create a new appointment
export async function POST(req) {
  const { name, email, phone, appointmentDetails, selectedDate, selectedTime } = await req.json();

  // Validate required fields
  if (!name || !email || !phone) {
    return new Response(JSON.stringify({ message: "Name, email, and phone are required." }), { status: 400 });
  }

  const { db } = await connectToDatabase();

  try {
    const createdAt = new Date();
    const appointment = {
      name,
      email,
      phone,
      appointmentDetails,
      selectedDate: new Date(selectedDate), // Ensure this is a valid date
      selectedTime,
      createdAt,
    };

    const { db } = await connectToDatabase();
    if (!db) {
        return new Response(JSON.stringify({ message: "Failed to connect to the database." }), { status: 500 });
    }

    const result = await db.collection("appointments").insertOne(appointment);
    return new Response(JSON.stringify(result), { status: 201 });
  } catch (error) {
    console.error("Error saving appointment:", error); // Log the error to the console
    return new Response(JSON.stringify({ message: "Error saving appointment.", error: error.message }), { status: 500 });
  }
}


// GET request: Fetch all appointments
export async function GET(req) {
    const { db } = await connectToDatabase();
  
    try {
      const appointments = await db.collection("appointments").find({}).toArray();
      return new Response(JSON.stringify(appointments), { status: 200 });
    } catch (error) {
      console.error("Error fetching appointments:", error);
      return new Response(JSON.stringify({ message: "Error fetching appointments." }), { status: 500 });
    }
  }