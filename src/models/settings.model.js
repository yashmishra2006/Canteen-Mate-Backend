import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema({
  openTime: { type: String, required: true },      // e.g. "08:00"
  closeTime: { type: String, required: true },     // e.g. "20:00"
  holidays: [{ type: String }]                     // e.g. ["Sunday", "Saturday"]
}, { timestamps: true });

export default mongoose.model('CanteenSettings', settingsSchema);
