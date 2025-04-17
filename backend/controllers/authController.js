import { pool } from '../db.js';  // Correct import of pool from db.js
import bcrypt from 'bcrypt';      // Correct import of bcrypt

// REGISTER
const registerUser = async (req, res) => {
  const { Name, email, password } = req.body;

  try {
    const userCheck = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    if (userCheck.rows.length > 0) {
      return res.status(400).json({ message: 'Email is already registered' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await pool.query(
      'INSERT INTO users (Name, email, password) VALUES ($1, $2, $3) RETURNING *',
      [Name, email, hashedPassword]
    );

    res.status(201).json({
      message: 'User registered successfully',
      user: newUser.rows[0],
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// LOGIN
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Manually check if the login is for the admin
    if (email === "admin123@gmail.com" && password === "12345678") {
      const adminUser = {
        id: 0, // You can use any dummy id
        name: "Admin",
        email: "admin123@gmail.com",
        role: "admin",
        profilePicture: null,
      };

      return res.status(200).json({ message: 'Admin login successful', user: adminUser });
    }

    // Normal user login
    const userCheck = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    if (userCheck.rows.length === 0) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const user = userCheck.rows[0];

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    res.status(200).json({ message: 'Login successful', user });
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};
// UPDATE PROFILE
const updateUserProfile = async (req, res) => {
  const { name, email, bio, password, profilePicture } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required" });
  }

  const cleanEmail = email.trim().toLowerCase();

  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [cleanEmail]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const user = result.rows[0];

    let finalPassword = password
      ? await bcrypt.hash(password, await bcrypt.genSalt(10))
      : user.password;

    const bioToUpdate = bio ?? user.bio;
    const profilePictureToUpdate = profilePicture ?? user.profilePicture;

    const updateQuery = `
      UPDATE users
      SET name = $1, bio = $2, password = $3, profilePicture = $4
      WHERE email = $5
    `;

    await pool.query(updateQuery, [
      name,
      bioToUpdate,
      finalPassword,
      profilePictureToUpdate,
      cleanEmail,
    ]);

    const updatedUser = await pool.query("SELECT * FROM users WHERE email = $1", [cleanEmail]);

    res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser.rows[0],
    });
  } catch (err) {
    console.error("Profile update error:", err);
    res.status(500).json({ error: "Failed to update profile" });
  }
};

// GET USER BY EMAIL
const getUserByEmail = async (req, res) => {
  const { email } = req.params;
  const cleanEmail = email.trim().toLowerCase();

  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [cleanEmail]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).json({ error: "Failed to fetch user" });
  }
};


export { registerUser, loginUser, updateUserProfile, getUserByEmail };
