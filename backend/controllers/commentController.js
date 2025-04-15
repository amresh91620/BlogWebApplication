import { pool } from '../db.js';  // Correct import of pool from db.js

// Get all comments with user and blog info
export const getAllComments = async (req, res) => {
    try {
      const result = await pool.query(`
        SELECT c.id, c.comment, b.title AS blog_title, c.created_at
        FROM comments c
        JOIN blogs b ON c.blog_id = b.id
        ORDER BY c.created_at DESC
      `);
  
      if (result.rows.length === 0) {
        return res.status(404).json({ message: "No comments found" });
      }
  
      res.status(200).json(result.rows);
    } catch (error) {
      console.error("Error fetching comments:", error);
      res.status(500).json({ message: "Error fetching comments", error: error.message });
    }
  };
// Delete comment by ID
export const deleteComment = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM comments WHERE id = $1", [id]);
    res.json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting comment", error });
  }
};

export const addComment = async (req, res) => {
    const { blog_id, comment } = req.body;
  
    if (!blog_id || !comment) {
      return res.status(400).json({ message: "Missing fields" });
    }
  
    try {
      const result = await pool.query(
        `INSERT INTO comments (comment, blog_id, created_at) VALUES ($1, $2, NOW()) RETURNING *`,
        [comment, blog_id]
      );
      res.status(201).json(result.rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: "Server error" });
    }
  };
  
  export const getCommentsByBlogId = async (req, res) => {
    const { blogId } = req.params;
    try {
      const result = await pool.query(
        `SELECT * FROM comments WHERE blog_id = $1 ORDER BY created_at DESC`,
        [blogId]
      );
      res.json(result.rows);
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  };