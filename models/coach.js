import mongoose from "mongoose";

const CoachSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  contact: { type: String, required: false },
  image: { type: String, default: "../public/images/coach/coach1.png" },
  profilePhoto: { type: String, default: "../public/images/coach/coach1.png" },
  gallery: { type: [String] }, // Array to store gallery image URLs
  firstName: { type: String, default: "" },
  lastName: { type: String, default: "" },
  title: { type: String, default: "" },
  description: { type: String, default: "" },
  hourlyRate: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});
export default mongoose.models.Coach || mongoose.model("Coach", CoachSchema);
