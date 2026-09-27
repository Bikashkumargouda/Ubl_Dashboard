const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("===========================================");
    console.log("MongoDB Connected Successfully");
    console.log("===========================================");
  })
  .catch((error) => {
    console.error("MongoDB Connection Error:", error.message);
  });

// Test route
app.get("/", (req, res) => {
  res.json({
    message: "CLMS Backend API is running",
  });
});

// Training routes
const trainingRoutes = require("./routes/training");
app.use("/api/training", trainingRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("===========================================");
  console.log(`CLMS Backend Running on Port ${PORT}`);
  console.log("===========================================");
});
