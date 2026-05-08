import User from '../models/User.js';
import Chat from '../models/Chat.js';
import Ticket from '../models/Ticket.js';

export const getStats = async (req, res) => {
  try {
    const totalUsers   = await User.countDocuments();
    const totalChats   = await Chat.countDocuments();
    const openTickets  = await Ticket.countDocuments({ status: 'open' });
    const closedTickets = await Ticket.countDocuments({ status: 'closed' });
    const escalated    = await Chat.countDocuments({ escalated: true });

    res.json({ totalUsers, totalChats, openTickets, closedTickets, escalated });
  } catch (err) { res.status(500).json({ message: err.message }); }
};