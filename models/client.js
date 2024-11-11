// models/Client.js
<<<<<<< HEAD
import * as mongoose from "mongoose";

const clientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  appointmentDetails: { type: String, required: false },
  // createdAt: { type: Date, default: Date.now },
});

const Client = mongoose.models.Client || mongoose.model("Client", clientSchema);
=======
import * as mongoose from 'mongoose'

const clientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    appointmentDetails: { type: String, required: false },
    // createdAt: { type: Date, default: Date.now },
});

const Client = mongoose.models.Client || mongoose.model('Client', clientSchema);
>>>>>>> 2c6a1f057e65d67757333cddd4ef9b64536ad133

export default Client;
