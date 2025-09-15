const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: String,
  content: String,
  image: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  likes: { type: Number, default: 0 },
  likesArray: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], 
  comments: [
    {
      author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      text: String,
      createdAt: { type: Date, default: Date.now }
    }
  ]
}, { timestamps: true });

const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;
