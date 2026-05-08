import express from 'express';
import { sendMessage, getChatHistory } from '../controllers/chatController.js';
import { protect } from '../middleware/authMiddleware.js';  
const chatRouter = express.Router();

chatRouter.post('/message', protect, sendMessage);
chatRouter.get('/history', protect, getChatHistory);

export default chatRouter;