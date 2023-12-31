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
  const instructorsCollection = db.collection("instructors");

  try {
    // get all categories
    app.get(`/api/v1/categories`, async (req, res) => {
      const cursor = categoryCollection.find({});
      const result = await cursor.toArray();
      res.send({ status: true, items: result.length, data: result });
    });

    // get all instructors
    app.get(`/api/v1/instructors`, async (req, res) => {
      const { category } = req.query;
      try {
        if (!category) {
          const result = await instructorsCollection.find({}).toArray();
          return res.json({ status: true, data: result });
        } else {
          const filteredData = await instructorsCollection.find({ category }).toArray();
          return res.send({ status: true, data: filteredData });
        }
      } catch (error) {
        return res.status(500).json({ error: `Inter server error` });
      }
    });

    // app.put("/updateInstructorCategory", async (req, res) => {
    //   try {
    //     const { category } = req.body;
    //     const result = await instructorsCollection.updateMany({}, { $set: { course: category } });
    //     return res.json({ message: `${result.modifiedCount} documents updated` });
    //   } catch (error) {
    //     return res.status(500).json({ error: "Internal server error" });
    //   }
    // });
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
