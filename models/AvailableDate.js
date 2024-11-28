import { model, Schema } from "mongoose";

const availableDateSchema = new Schema({
  date: { type: Date, required: true, unique: true },
  slots: { type: Number, required: true }, // Number of slots available for booking
  timeSlots: { type: [String], required: true },
  multipleBookings: { type: Boolean, default: false }, 
  coachId: { type: Schema.Types.ObjectId, required: true, ref: 'User ' }, // Reference to the coach (User  model)
});

// Create a compound index for date and coachId
availabilitySchema.index({ date: 1, coachId: 1 }, { unique: true });

// Instance method to add a time slot
// availableDateSchema.methods.addTimeSlot = function (timeSlot) {
//   this.timeSlots.push(timeSlot);
//   return this.save(); // Save the updated document
// };

// // Instance method to remove a time slot by index
// availableDateSchema.methods.removeTimeSlot = function (index) {
//   if (index < 0 || index >= this.timeSlots.length) {
//     throw new Error('Invalid index');
//   }
//   this.timeSlots.splice(index, 1);
//   return this.save(); // Save the updated document
// };

const AvailableDate = model("AvailableDate", availableDateSchema);

export default AvailableDate;