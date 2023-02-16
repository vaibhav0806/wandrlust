const mongoose = require("mongoose");
const { TITLE_REQUIRED } = require("../errors/mongoose");

const videoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, TITLE_REQUIRED],
    },
    description: {
      type: String,
      required: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Video = mongoose.model("Video", videoSchema);

module.exports = { Video };
