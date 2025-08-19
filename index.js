// index.js
import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config(); // Load variables from .env

const app = express();
const port = process.env.PORT || 3000;
const uri = process.env.MONGO_URI;

const client = new MongoClient(uri);

async function start() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB Atlas");

    const db = client.db("mongodbAtlas");
    const collection = db.collection("exercise1");

    app.get("/", async (req, res) => {
      try {
        const exercises = await collection.find({}).toArray();
        res.json(exercises);
      } catch (err) {
        res.status(500).send("Failed to fetch data");
      }
    });

    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  } catch (err) {
    console.error("❌ Failed to connect to MongoDB Atlas:", err);
  }
}

start();
