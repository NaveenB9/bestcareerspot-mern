import express from "express";
import blogRoutes from "./src/routes/blogRoutes.js";
import connectDB from "./src/config/db.js";
import dotenv from "dotenv";

dotenv.config();

console.log("MongoDB URI from .env:", process.env.MONGO_URI);

const app = express();
const PORT = process.env.PORT || 5001;
connectDB();

app.use(express.json());

app.use("/api/posts", blogRoutes);


app.listen(PORT, () => console.log(`Server started on port ${PORT}`));