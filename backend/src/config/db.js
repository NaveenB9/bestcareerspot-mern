import express from "express";
import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected Successfully");
    } catch (error) {
        console.log("Error Connecting to MongoDB", error);
        process.exit(1);
    }
}
export default connectDB;