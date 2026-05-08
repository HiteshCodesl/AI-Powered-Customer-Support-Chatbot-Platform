import express from 'express';
import { createTicket, getMyTickets, getAllTickets, updateTicketStatus } from '../controllers/ticketController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const ticketRouter = express.Router();

ticketRouter.post('/', protect, createTicket);
ticketRouter.get('/mine', protect, getMyTickets);
ticketRouter.get('/all', protect, adminOnly, getAllTickets);
ticketRouter.patch('/:id', protect, adminOnly, updateTicketStatus);

export default ticketRouter;