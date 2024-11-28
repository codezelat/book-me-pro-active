import * as mongoose from "mongoose";
import { model, Schema } from "mongoose";

const appointmentSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true},
  phone: { type: String, required: true },
  appointmentDetails: { type: String, required: false },
  selectedDate: { type: Date, required: false },
  selectedTime: { type: String, required: false },
  isIndividualSession: { type: Boolean, required: true },
  coachId: { type: Schema.Types.ObjectId, ref: "Coach", required: true },
  createdAt: { type: Date, default: Date.now },
});

const Appointment = model("Appointment", appointmentSchema);

export default Appointment;
