import mongoose from 'mongoose';

const ClientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  status: { type: String, enum: ['Approved', 'Declined'], required: true },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.models.Client || mongoose.model('Client', ClientSchema);
