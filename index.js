// In your server.js or app.js file
require("dotenv").config(); // Load environment variables from a .env file
const { MongoClient, ServerApiVersion } = require("mongodb");
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

const cors = require("cors");
// Enable CORS
app.use(cors());
app.use(express.json());

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

// console.log(client);

async function run() {
  // collections

  const db = client.db("rsItInstitute");
  const categoryCollection = db.collection("course-category");

  try {
    app.get(`/api/v1/categories`, async (req, res) => {
      const cursor = categoryCollection.find({});
      const result = await cursor.toArray();
      res.send({ status: true, items: result.length, data: result });
    });
  } finally {
  }
}
run().catch((error) => console.log(error));

app.get("/", (req, res) => {
  res.send("RS IT Institute");
});

app.listen(port, () => {
  console.log(` RsIt Institute Server is running on port ${port}`);
});
