<<<<<<< HEAD
// models/Client.js
import * as mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
=======
import { model, Schema } from "mongoose";

const appointmentSchema = new Schema({
>>>>>>> 2c6a1f057e65d67757333cddd4ef9b64536ad133
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  appointmentDetails: { type: String, required: false },
<<<<<<< HEAD
  // createdAt: { type: Date, default: Date.now },
});

const Appointment = mongoose.models.Appointment || mongoose.model("Appointment", appointmentSchema);

export default Appointment;
=======
  selectedDate: { type: Date, required: false },
  selectedTime: { type: String, required: false },
});

export default model("Appointment", appointmentSchema);
>>>>>>> 2c6a1f057e65d67757333cddd4ef9b64536ad133
