import axios from "axios"; // Axios for HTTP requests
import { ObjectId } from "mongodb";
import connectToDatabase from "../../../Lib/mongodb"; // Adjust the path if needed

// Function to send emails using Brevo API
async function sendEmail({ email, name, status }) {
  const API_URL = "https://api.brevo.com/v3/smtp/email"; // Brevo API endpoint for transactional emails
  const BREVO_API_KEY = process.env.BREVO_API_KEY || "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"; // Replace with your Brevo API key or use environment variable

  const emailData = {
    sender: { email: "codezelabookmepro@gmail.com", name: "Your Company Name" },
    to: [{ email, name }],
    subject: `Your Appointment Status: ${status}`,
    htmlContent: `
      <p>Dear ${name},</p>
      <p>Your appointment status has been updated to <strong>${status}</strong>.</p>
      <p>Thank you!</p>
    `,
  };

  try {
    const response = await axios.post(API_URL, emailData, {
      headers: {
        "Content-Type": "application/json",
        "api-key": BREVO_API_KEY,
      },
    });
    console.log("Email sent successfully:", response.data);
  } catch (error) {
    console.error("Error sending email:", error.response?.data || error.message);
  }
}

// POST request: Create a new appointment
export async function POST(req) {
  const { name, email, phone, appointmentDetails, selectedDate, selectedTime, coachId } = await req.json();

  // Validate required fields
  if (!name || !email || !phone || !coachId) {
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
      coachId, // Store the coachId in the appointment
      createdAt,
      status: "pending", // Default status for new appointments
    };

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
  const url = new URL(req.url);
  const coachId = url.searchParams.get("coachId"); // Retrieve coachId from query params

  if (!coachId) {
    return new Response(JSON.stringify({ message: "Coach ID is required." }), { status: 400 });
  }

  try {
    const appointments = await db
      .collection("appointments")
      .find({ coachId }) // Filter appointments by coachId
      .toArray();
    return new Response(JSON.stringify(appointments), { status: 200 });
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return new Response(JSON.stringify({ message: "Error fetching appointments." }), { status: 500 });
  }
}

// PATCH request: Update appointment status
export async function PATCH(req) {
  const { id, status } = await req.json();

  if (!id || !status) {
    return new Response(JSON.stringify({ message: "Appointment ID and status are required." }), { status: 400 });
  }

  const { db } = await connectToDatabase();

  try {
    const appointment = await db.collection("appointments").findOne({ _id: new ObjectId(id) });

    if (!appointment) {
      return new Response(JSON.stringify({ message: "No appointment found with the provided ID." }), { status: 404 });
    }

    const result = await db.collection("appointments").updateOne(
      { _id: new ObjectId(id) },
      { $set: { status } }
    );

    if (result.modifiedCount > 0) {
      // Send email after status update
      await sendEmail({ email: appointment.email, name: appointment.name, status });
      return new Response(JSON.stringify({ message: "Appointment status updated successfully." }), { status: 200 });
    } else {
      return new Response(JSON.stringify({ message: "Failed to update appointment status." }), { status: 500 });
    }
  } catch (error) {
    console.error("Error updating appointment status:", error);
    return new Response(JSON.stringify({ message: "Error updating appointment status.", error: error.message }), { status: 500 });
  }
}
