import express from 'express';
import dotenv from 'dotenv';
dotenv.config(); // Load environment variables from .env file
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';
const port = process.env.PORT || 5000;
import userRoutes from './routes/userRoutes.js';

connectDB();

const app = express();

// Mount user-related routes under /api/users
app.use('/api/users', userRoutes);

// Define a simple root route for testing the server
app.get('/', (req, res) => res.send('Server is ready'));

app.use(notFound); // Middleware to handle 404 errors for undefined routes
app.use(errorHandler); //Middleware to handle errors and return formatted responses

// Start the server and listen on the specified port
app.listen(port, () => console.log(`Server started on port ${port}`));
