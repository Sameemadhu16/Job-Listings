import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.route.js';
import seekerRoutes from './routes/seeker.route.js'
import cookieParser from 'cookie-parser';
import postRoutes from './routes/post.route.js'
import contactRoutes from './routes/contact.route.js'
import commentRoutes from './routes/comment.route.js'
import jobseekerRoutes from './routes/jobseeker.route.js'
import jobposterRoutes from './routes/jobposter.route.js'
import responseRoutes from './routes/savecandidate.js'
import cors from 'cors'
import {createServer} from 'http';
import {Server} from 'socket.io';

dotenv.config();

mongoose.connect("mongodb+srv://ilakshitha7921:ilakshitha7921@cluster0.gfhczos.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")


  .then(() => {
    console.log('MongoDB is conected');
  })
  .catch((err) => {
    console.log(err);

  });


const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:5173',
    methods : ['GET' , 'POST'],
  }
});

io.on('connection', (socket) => {
  console.log('A user connected', socket.id);

  // Handle socket events here
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });

  socket.on('chatMessage', (msg) => {
    console.log('Message received: ', msg);
    io.emit('chatMessage', msg); // Broadcast message to all clients
  });
});

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({}));

app.use('/api/auth', authRoutes);
app.use('/api/jobposter', jobposterRoutes);
app.use('/api/seeker', seekerRoutes);
app.use('/api/response',responseRoutes);
app.use('/api/post',postRoutes);
app.use('/api/jobseeker',jobseekerRoutes);
app.use('/api/comment', commentRoutes)
app.use('/api/post', postRoutes);
app.use('/api/contact', contactRoutes);




app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });

});

// Start server with socket.io
httpServer.listen(4500, () => {
  console.log('Server is running on port 4500');
});


