import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      menuItem: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem', required: true },
      quantity: { type: Number, default: 1, min: 1 }
    }
  ]
}, { timestamps: true });

export default mongoose.model('Cart', cartItemSchema);
