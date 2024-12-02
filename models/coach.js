import mongoose from "mongoose";

const CoachSchema = new mongoose.Schema({

  email: { type: String, required: true, unique: true },
  contact: { type: String, required:true},
  image: { type: String, default: "../public/images/coach/coach1.png" },
  profilePhoto: { type: String, default: "../public/images/coach/coach1.png" },
  gallery: { type: [String], default: [] }, // Array to store gallery image URLs
  firstName: { type: String, required: true },
  lastName: { type: String, default: "" },
  title: { type: String, default: "" },
  description: { type: String, default: "" },
  hourlyRate: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});
export default mongoose.models.Coach || mongoose.model("Coach", CoachSchema);
