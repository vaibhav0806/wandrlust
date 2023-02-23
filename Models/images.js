const { mongoose } = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: [true, IMAGE_REQUIRED],
    },
    caption:{
      type: String,
    }, 
    date: {
      type: Date,
      default: Date.now,
    },
    author: {
      type: Schema.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", PostSchema);
module.exports = { Post };
