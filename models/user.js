import * as mongoose from 'mongoose'

const userSchema = new mongoose.Schema({

  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  contact: { type: String },
  // image: { type: String, default: "/images/default-coach.png" },
  // gallery: { type: [String], default: [] },
  firstName: { type: String, default: "" },
  lastName: { type: String, default: "" },
  title: { type: String, default: "" },
  description: { type: String, default: "" },
  hourlyRate: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  },
  // { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;