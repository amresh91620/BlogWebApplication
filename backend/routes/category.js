import express from 'express';
import { pool } from '../db.js';  // Correct import of pool from db.js

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM categories ORDER BY id DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Create category
router.post("/", async (req, res) => {
    const { name, slug } = req.body;
    
    try {
      // Step 1: Check if category already exists
      const existingCategory = await pool.query("SELECT * FROM categories WHERE name = $1", [name]);
      if (existingCategory.rows.length > 0) {
        return res.status(400).json({ message: "Category already exists" });
      }
  
      // Step 2: Insert the new category into the database
      const insertQuery = "INSERT INTO categories (name, slug) VALUES ($1, $2)";
      const values = [name, slug];
  
      await pool.query(insertQuery, values);
  
      // Step 3: Return success message after successful insertion
      res.status(201).json({ message: "Category added successfully" });
      
    } catch (err) {
      // Step 4: Handle any errors that may occur
      console.error("Error inserting category:", err);
      res.status(500).json({ message: "Server error" });
    }
  });

// Express route for deleting category
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
  
    try {
      // Delete category by ID from database
      const result = await pool.query("DELETE FROM categories WHERE id = $1 RETURNING *", [id]);
  
      if (result.rows.length === 0) {
        // If no category found with the given ID
        return res.status(404).json({ message: "Category not found." });
      }
  
      // Successfully deleted category
      return res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
      console.error("Error deleting category:", error);
      // Handle server error
      return res.status(500).json({ message: "Server error" });
    }
  });
  
  

export default router; // ✅ export default for import compatibility
