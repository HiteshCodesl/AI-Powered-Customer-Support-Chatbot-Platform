import Ticket from '../models/Ticket.js';
export const createTicket = async (req, res) => {
  try {
    const ticket = await Ticket.create({ ...req.body, userId: req.user.id });
    res.status(201).json(ticket);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

export const getMyTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(tickets);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

export const getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find().populate('userId', 'name email').sort({ createdAt: -1 });
    res.json(tickets);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

export const updateTicketStatus = async (req, res) => {
  try {
    const ticket = await Ticket.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    res.json(ticket);
  } catch (err) { res.status(500).json({ message: err.message }); }
};