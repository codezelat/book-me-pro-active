const { db } = await connectToDatabase();

// Define your appointment document (example)
const appointmentData = {
    coachId: "coach123",
    userId: "user456",
    appointmentTime: new Date("2024-11-06T10:00:00Z"),
    createdAt: new Date(),
    status: "confirmed",
    status: "pending", // Default status
    sessionDuration: 60,
};

// Insert appointment data into the "appointments" collection
await db.collection("appointments").insertOne(appointmentData);
