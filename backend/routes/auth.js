import express from 'express'; 
import { pool } from '../db.js'; // Named import for pool

const router = express.Router();

// Import the controller methods
import { registerUser, loginUser, updateUserProfile } from '../controllers/authController.js';

// Routes
router.post('/register', registerUser);
router.post('/login', loginUser); // login route
router.put("/update-profile", updateUserProfile);

// Get user by email route
router.get("/user/email/:email", async (req, res) => {
    const { email } = req.params; // Extract the email from URL params
    try {
      // Query to fetch the user by email
      const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
  
      if (result.rows.length === 0) {
        return res.status(404).json({ error: "User not found" });
      }
  
      const user = result.rows[0]; // Get the first user (should be unique)
      res.status(200).json(user); // Send the user data as response
    } catch (err) {
      console.error("Error fetching user:", err);
      res.status(500).json({ error: "Failed to fetch user" });
    }
});

export default router;
