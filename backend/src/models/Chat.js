import mongoose from 'mongoose';

export const chatSchema = new mongoose.Schema({
  userId:      { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  userMessage: { type: String, required: true },
  botReply:    { type: String, required: true },
  intent:      { type: String, default: 'unknown' },
  escalated:   { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model('Chat', chatSchema);