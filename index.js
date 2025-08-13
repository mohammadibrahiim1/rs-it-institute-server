// In your server.js or app.js file
require("dotenv").config(); // Load environment variables from a .env file

const express = require("express");
const app = express();
const port = process.env.PORT || 9000;

const cors = require("cors");
// Enable CORS
app.use(cors());
app.use(express.json());

const coursesRouter = require("./routes/courses.routes");
const connectDB = require("./config/db");

app.use("/api/v1/course", coursesRouter);

app.get("/", (req, res) => {
  res.send("RS IT Institute");
});

app.listen(port, async () => {
  console.log(` RsIt Institute Server is running on port ${port}`);
  await connectDB(); 
});
