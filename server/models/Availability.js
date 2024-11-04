// models/Availability.js
import mongoose from 'mongoose';

const AvailabilitySchema = new mongoose.Schema({
    open: { type: Boolean, required: true },
    day: { type: Number, required: true },
    timeSlot: { type: [String], required: true } // Array of available time slots as strings
});

export default mongoose.models.Availability || mongoose.model('Availability', AvailabilitySchema);
