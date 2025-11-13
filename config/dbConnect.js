import mongoose from 'mongoose';

const dbConnect = async () => {
  try {
    // Ensure you have MONGODB_URL set in your environment variables (.env file)
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    // Exit process with failure
    process.exit(1);
  }
};

export default dbConnect;
