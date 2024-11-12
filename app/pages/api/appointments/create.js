// pages/api/appointments/create.js
import connectToDatabase from '../../../../Lib/mongodb';
import PersonalTrainer from '../../../../server/models/Appointment';

export default async function handler(req, res) {
    await dbConnect(); // Connect to MongoDB
  
    if (req.method === "POST") {
      try {
        const { name, age, phone, email, address, appointmentDetails, selectedDate, selectedTime } = req.body;
  
        // Create a new appointment document
        const newAppointment = new Appointment({
          name,
          age,
          phone,
          email,
          address,
          appointmentDetails,
          selectedDate,
          selectedTime,
        });
  
        await newAppointment.save();
        res.status(201).json({ message: "Appointment created successfully!" });
      } catch (error) {
        console.error("Failed to save appointment:", error);
        res.status(500).json({ message: "Failed to save appointment data" });
      }
    } else {
      res.status(405).json({ message: "Method not allowed" });
    }
  }