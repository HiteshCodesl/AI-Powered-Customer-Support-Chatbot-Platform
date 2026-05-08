
import mongoose from 'mongoose';

export const faqSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer:   { type: String, required: true },
  category: { type: String, default: 'general' }
}, { timestamps: true });


export default mongoose.model('FAQ', faqSchema);