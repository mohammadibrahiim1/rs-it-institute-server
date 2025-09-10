const mongoose = require("mongoose");

// database connect
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });

    console.log("Database connected!"); 
  } catch (error) {
    console.log("db is not connected");
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
