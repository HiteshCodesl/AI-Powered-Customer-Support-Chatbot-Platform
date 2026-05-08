import express from 'express';
import { getStats } from '../controllers/adminController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const adminRouter = express.Router();

adminRouter.get('/stats', protect, adminOnly, getStats);

export default adminRouter;