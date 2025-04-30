import mongoose from 'mongoose';

// Connects to MongoDB using the MONGO_URI from environment variables
const connectDB = async () => {
  try {
    // Attempt to connect to the database
    const conn = await mongoose.connect(process.env.MONGO_URI);

    // Log the connected host on successful connection
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    // Log any error and exit the process with failure
    console.error(`Error: ${error.message}`);
    process.exit(1); // Exit with failure code
  }
};

export default connectDB;