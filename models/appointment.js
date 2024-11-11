import { model, Schema } from "mongoose";

const appointmentSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  appointmentDetails: { type: String, required: false },
  selectedDate: { type: Date, required: false },
  selectedTime: { type: String, required: false },
});

export default model("Appointment", appointmentSchema);