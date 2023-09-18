// In your server.js or app.js file

require("dotenv").config(); // Load environment variables from a .env file
const { MongoClient, ServerApiVersion } = require("mongodb");
const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 5000;

// Enable CORS
const app = express();
app.use(cors());

// Set up MongoDB connection
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.wuwpwwx.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
  } finally {
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(` RsIt Institute Server is running on port ${port}`);
});
