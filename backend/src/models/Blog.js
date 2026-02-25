const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  tags: [{ type: String }],
  stats: {
    likes: { type: Number, default: 0 },
    comments: { type: Number, default: 0 }
  }
}, { timestamps: true });

// Indexing for real-time search and sorting
blogPostSchema.index({ createdAt: -1 });

module.exports = mongoose.model("Blog", blogSchema);