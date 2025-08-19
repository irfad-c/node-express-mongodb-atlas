// index.js
import express from "express";
import { MongoClient } from "mongodb";

const app = express();
const port = 3000;

// Your Atlas connection string
const uri =
  "mongodb+srv://irfadc2500:August!18@cluster0.gj3427u.mongodb.net/mongodbAtlas?retryWrites=true&w=majority";

const client = new MongoClient(uri);

async function start() {
  try {
    // Connect to MongoDB
    await client.connect();
    console.log("✅ Connected to MongoDB Atlas");

    const db = client.db("mongodbAtlas");
    const collection = db.collection("exercise1");

    // Express route to fetch and display all documents in exercise1
    app.get("/", async (req, res) => {
      try {
        const exercises = await collection.find({}).toArray();
        res.json(exercises); // send JSON data to browser
      } catch (err) {
        res.status(500).send("Failed to fetch data");
      }
    });

    // Start server after DB is connected
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  } catch (err) {
    console.error("❌ Failed to connect to MongoDB Atlas:", err);
  }
}

start();
