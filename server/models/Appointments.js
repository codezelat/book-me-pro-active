// models/Appointments.js
import mongoose from 'mongoose';

const AppointmentSchema = new mongoose.Schema({
    bookedAt: { type: Date, required: true },
    clientEmail: { type: String, required: true },
    clientPhoneNo: { type: String, required: true },
    clientName: { type: String, required: true },
    clientNotes: { type: String },
    trainerId: { type: mongoose.Schema.Types.ObjectId, ref: 'PersonalTrainer', required: true },
    status: { type: String, enum: ['confirmed', 'pending', 'canceled'], default: 'pending' }
});

export default mongoose.models.Appointments || mongoose.model('Appointments', AppointmentSchema);

