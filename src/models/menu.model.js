import mongoose from 'mongoose';

const menuItemSchema = new mongoose.Schema({
  name:        { type: String, required: true, trim: true },
  description: { type: String },
  price:       { type: Number, required: true },
  category:    { type: String, enum: ['snack', 'meal', 'drink'], default: 'meal' },
  available:   { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model('MenuItem', menuItemSchema);
