const mongoose = require("mongoose");

// database connect
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
    console.log(process.env.MONGO_URI);

    console.log("Database connected successfully.");
  } catch (error) {
    console.log("db is not connected");
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
