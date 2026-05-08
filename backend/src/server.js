import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRouter from './routes/authRoute.js';
import chatRouter from './routes/chatRoute.js';
import ticketRouter from './routes/ticketRoute.js';
import faqRouter from './routes/faqRoutes.js';
import adminRouter from './routes/adminRoutes.js';

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json()); 

app.use('/api/auth', authRouter);
app.use('/api/chat', chatRouter);
app.use('/api/tickets', ticketRouter);
app.use('/api/faqs', faqRouter);
app.use('/api/admin', adminRouter);


app.get('/', (req, res) => res.send('API is running...'));

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));