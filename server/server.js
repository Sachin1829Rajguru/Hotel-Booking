import express from 'express';
import "dotenv/config";
import cors from 'cors';
import { clerkMiddleware } from '@clerk/express';
import clerkwebhooks from './controllers/clerkwebhooks.js';
import userrouter from './routes/userroutes.js';
import hotelrouter from './routes/hotelroutes.js';
import connectDB from './configs/db.js';
import connectcloudinary from './configs/cloudinary.js';
import roomrouter from './routes/roomroutes.js';
import bookingrouter from './routes/bookingroutes.js';
import { stripewebhooks } from './controllers/stripewebhooks.js';
connectDB();
connectcloudinary();
const app = express();
app.use(cors());
app.post('/api/stripe', express.raw({ type: "application/json" }), stripewebhooks);
app.use('/api/clerk', express.raw({ type: 'application/json' }));
app.use(express.json());
app.use(clerkMiddleware());
app.use('/api/clerk', clerkwebhooks);
app.get('/', (req, res) => {
    res.send('Website is working fine!');
});
app.use('/api/user', userrouter);
app.use('/api/hotels', hotelrouter);
app.use('/api/rooms', roomrouter);
app.use('/api/bookings', bookingrouter);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});