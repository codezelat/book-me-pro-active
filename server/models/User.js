// server/models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['trainer', 'client'], required: true },
  phoneNumber: { type: String, required: true }, 
  address: { type: String, required: true }
});

export default mongoose.models.User || mongoose.model('User', userSchema);
