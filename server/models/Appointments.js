// models/Appointment.js
import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  clientName: { type: String, required: true },
  clientEmail: { type: String, required: true },
  clientPhone: { type: String, required: true },
  appointmentDate: { type: Date, required: true },
  status: { 
    type: String, 
    enum: ['not reviewed', 'approved', 'declined'], 
    default: 'not reviewed' 
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Appointment || mongoose.model('Appointment', appointmentSchema);
