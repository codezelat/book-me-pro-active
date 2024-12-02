import * as mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    contact: { type: String },
    profilePhoto: {
      type: String,
      default: "../public/images/coach/coach1.png",
    },
    gallery: { type: [String], default: [] }, // Array to store gallery image URLs
    firstName: { type: String, default: "" },
    lastName: { type: String, default: "" },
    title: { type: String, default: "" },
    description: { type: String, default: "" },
    hourlyRate: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
  }
  // { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
