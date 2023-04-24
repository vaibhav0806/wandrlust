const { mongoose } = require("mongoose");

const ToDoSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    tasks: [
      {
        description: {
          type: String,
          required: true,
        },
        checked: {
          type: Number,
          enum: [0, 1],
          default: 0,
          required: true,
        },
        priority: {
          type: Number,
          enum: [1, 2, 3],
          default: 1,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ToDo", ToDoSchema);
