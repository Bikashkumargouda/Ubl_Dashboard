const mongoose = require("mongoose");

const trainingSchema = new mongoose.Schema(
  {
    brewery: {
      type: String,
      required: true,
      default: "United Breweries Limited – Khordha",
    },

    contractor: {
      type: String,
      required: true,
    },

    workers: [
      {
        employeeId: {
          type: String,
          required: true,
        },

        name: {
          type: String,
          required: true,
        },

        designation: {
          type: String,
          default: "",
        },
      },
    ],

    workerCount: {
      type: Number,
      required: true,
    },

    trainingDate: {
      type: Date,
      required: true,
    },

    startTime: {
      type: String,
      required: true,
    },

    endTime: {
      type: String,
      required: true,
    },

    topic: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["Completed", "Scheduled", "Cancelled"],
      default: "Scheduled",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Training", trainingSchema);
