import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import blogRoutes from "./routes/blogRoutes.js";
import connectDB from "./config/db.js";

dotenv.config();

console.log("Connected to MongoDB");

const app = express();
const PORT = process.env.PORT || 5001;


// Middleware
app.use(cors());
app.use(express.json());

// DB Connection
connectDB();

// Routes
app.use("/api/posts", blogRoutes);


app.listen(PORT, () => console.log(`Server started on port ${PORT}`));