import mongoose from 'mongoose';

export const ticketSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  description: { type: String, required: true },
  status:      { type: String, enum: ['open', 'in-progress', 'closed'], default: 'open' },
  userId:      { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

export default mongoose.model('Ticket', ticketSchema);