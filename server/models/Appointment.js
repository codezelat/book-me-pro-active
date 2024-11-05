import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  appointmentDetails: { type: String },
  selectedDate: { type: Date, required: true },
  selectedTime: { type: String, required: true },
});

export default mongoose.models.Appointment || mongoose.model("Appointment", AppointmentSchema);
