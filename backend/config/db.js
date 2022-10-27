// Mongoose DB
const mongoose = require('mongoose');
// Arrow Function to Connect to Mongoose
const connectDB = async () => {
  // Try/Catch
  try {
    // Await Connect to Mongoose
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    // Error connecting to Mongoose 🐮
    console.log(`Error: ${error.message}`.red.underline.bold);
    process.exit(1);
  }
};

module.exports = connectDB;
