import express from 'express'; 
import { pool } from '../db.js'; // Named import for pool

const router = express.Router();

// Import the controller methods
import { registerUser, loginUser,   updateUserProfile,
  getUserByEmail, } from '../controllers/authController.js';


// Routes
router.post('/register', registerUser);
router.post('/login', loginUser); // login route
// PUT: Update profile
router.put("/user/update", updateUserProfile);  // Route for updating profile

// GET: Get user by email
router.get("/user/email/:email", getUserByEmail);  // Route for getting user by email
export default router;
