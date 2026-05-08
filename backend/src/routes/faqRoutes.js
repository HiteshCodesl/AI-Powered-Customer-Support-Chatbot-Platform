import express from 'express';
import { getFAQs, createFAQ, updateFAQ, deleteFAQ } from '../controllers/faqController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const faqRouter = express.Router();

faqRouter.get('/', getFAQs);
faqRouter.post('/', protect, adminOnly, createFAQ);
faqRouter.put('/:id', protect, adminOnly, updateFAQ);
faqRouter.delete('/:id', protect, adminOnly, deleteFAQ);

export default faqRouter;