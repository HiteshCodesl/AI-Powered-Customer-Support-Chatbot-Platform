import Chat from '../models/Chat.js';
import Ticket from '../models/Ticket.js';
import {detectIntent} from '../services/intentService.js';
import {getAIReply}  from '../services/aiService.js';
import {shouldEscalate} from '../utils/escalationHelper.js';

export const sendMessage = async (req, res) => {
  const { message } = req.body;
  const userId = req.user.id;

  try {
    const { intent, confidence, isAngry } = detectIntent(message);
    const botReply = await getAIReply(message, intent);
    const escalated = shouldEscalate({ confidence, isAngry, intent });

    await Chat.create({ userId, userMessage: message, botReply, intent, escalated });

    if (escalated) {
      await Ticket.create({
        title: `Auto-escalated: ${intent}`,
        description: message,
        userId
      });
    }

    res.json({ reply: botReply, intent, escalated });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getChatHistory = async (req, res) => {
  try {
    const chats = await Chat.find({ userId: req.user.id }).sort({ createdAt: -1 }).limit(50);
    res.json(chats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};