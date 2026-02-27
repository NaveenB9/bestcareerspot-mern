import express from "express";
import User from "../models/User.js";


const router = express.Router();

// Register Page
router.get("/register", (req, res) => {
  res.render("pages/register.ejs");
});

// Register Logic
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    await User.create({
      name,
      email,
      password
    });

    res.redirect("/login");
  } catch (error) {
    console.error("Register error:", error);
    res.render("pages/register.ejs", { error: "Registration failed" });
  }
});

// Login Page
router.get("/login", (req, res) => {
  res.render("pages/login.ejs");
});

// Login Logic
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.render("pages/login.ejs", { error: "Email not found" });
    }

    // Compare password
    const isPasswordCorrect = await user.comparePassword(password);

    if (!isPasswordCorrect) {
      return res.render("pages/login.ejs", { error: "Password is incorrect" });
    }

    // Store user in session
    req.session.userId = user._id;
    req.session.user = user;

    // Redirect to home
    res.redirect("/api/posts");
  } catch (error) {
    console.error("Login error:", error);
    res.render("pages/login.ejs", { error: "Server error" });
  }
});

export default router;