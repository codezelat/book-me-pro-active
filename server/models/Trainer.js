// models/PersonalTrainer.js
import mongoose from 'mongoose';

const TrainerSchema = new mongoose.Schema({
    trainerName: { type: String, required: true },
    availability: { type: mongoose.Schema.Types.ObjectId, ref: 'Availability' }
});

export default mongoose.models.Trainer || mongoose.model('Trainer', TrainerSchema);

