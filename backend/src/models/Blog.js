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

