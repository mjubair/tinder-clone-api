import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import cards from "./models/cards.js";

const PORT = process.env.PORT;

const app = express();

// Database
mongoose.connect(`${process.env.MONGO_URI}`, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

// Middlewares
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Hello, world!");
});

app.post("/cards", async (req, res) => {
  try {
    const data = req.body;
    const doc = await cards.create(data);
    res.status(201).send(doc);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/cards", async (req, res) => {
  try {
    const doc = await cards.find();
    res.status(200).send(doc);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(PORT, () => console.log(`The server is running on port: ${PORT}`));
