const express = require("express");
const router = express.Router();

const Training = require("../models/Training");

// ============================================
// GET ALL TRAINING SESSIONS
// ============================================
router.get("/", async (req, res) => {
  try {
    const sessions = await Training.find().sort({
      trainingDate: -1,
      createdAt: -1,
    });

    res.status(200).json(sessions);
  } catch (error) {
    console.error("Error fetching training sessions:", error);

    res.status(500).json({
      message: "Failed to fetch training sessions",
      error: error.message,
    });
  }
});

// ============================================
// CREATE NEW TRAINING SESSION
// ============================================
router.post("/", async (req, res) => {
  try {
    const {
      brewery,
      contractor,
      workers,
      workerCount,
      trainingDate,
      startTime,
      endTime,
      topic,
      status,
    } = req.body;

    // Basic validation
    if (
      !contractor ||
      !workers ||
      workers.length === 0 ||
      !trainingDate ||
      !startTime ||
      !endTime ||
      !topic ||
      !status
    ) {
      return res.status(400).json({
        message: "Please fill all required fields.",
      });
    }

    const newTraining = new Training({
      brewery: brewery || "United Breweries Limited – Khordha",

      contractor,

      workers,

      workerCount: workerCount || workers.length,

      trainingDate,

      startTime,

      endTime,

      topic,

      status,
    });

    const savedTraining = await newTraining.save();

    res.status(201).json({
      message: "Training session saved successfully.",
      training: savedTraining,
    });
  } catch (error) {
    console.error("Error saving training session:", error);

    res.status(500).json({
      message: "Failed to save training session.",
      error: error.message,
    });
  }
});

// ============================================
// GET SINGLE TRAINING SESSION
// ============================================
router.get("/:id", async (req, res) => {
  try {
    const session = await Training.findById(req.params.id);

    if (!session) {
      return res.status(404).json({
        message: "Training session not found.",
      });
    }

    res.status(200).json(session);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch training session.",
      error: error.message,
    });
  }
});

module.exports = router;
