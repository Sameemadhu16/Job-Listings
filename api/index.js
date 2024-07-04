import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';

dotenv.config();

mongoose.connect("mongodb+srv://ilakshitha7921:Ishan2001@cluster0.oyqzkn8.mongodb.net/jobwave?retryWrites=true&w=majority&appName=Cluster0")
.then(() => {
  console.log('MongoDB is conected');
})
.catch((err) =>
{
  console.log(err);
})

const app = express();

app.use(express.json());

app.listen(4500,() => {
    console.log('Server is running port 4500');
});

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);