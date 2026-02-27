import User from "../models/User.js";

// --- REGISTER LOGIC ---
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).send("User already exists");
    }

    // Create User
    // Note: We pass raw 'password' because User.js pre('save') handles the hashing automatically.
    // We map 'name' from the form to 'username' in the schema.
    await User.create({
      name,
      email,
      password
    });

    console.log("User registered successfully");
    res.redirect("/login.ejs"); // Redirect to login page after successful registration

  } catch (error) {
    console.error(error);
    res.status(500).send("Error registering user: " + error.message);
  }
};

// --- LOGIN LOGIC ---
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Find user by email
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(401).send("Invalid email or password");
    }

    // 2. Compare passwords using the method defined in User.js
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).send("Invalid email or password");
    }

    // 3. Login Successful - Create Session
    // (Assuming you use express-session in server.js)
    if (req.session) {
        req.session.userId = user._id;
        req.session.role = user.role;
    }

    console.log("User logged in successfully");
    res.redirect("/api/posts/"); // Redirect to dashboard/home after login

  } catch (error) {
    console.error(error);
    res.status(500).send("Server error during login");
  }
};