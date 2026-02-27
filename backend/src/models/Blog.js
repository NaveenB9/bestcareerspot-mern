import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  author: { type: String, required: true },

},
{ timestamps: true });

const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema);


export default mongoose.models.Blog || mongoose.model("Blog", blogSchema);