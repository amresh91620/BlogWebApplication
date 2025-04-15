import { pool } from '../db.js';

// Add Blog
export const addBlog = async (req, res) => {
  try {
    const { title, content, user_id } = req.body;

    // Validate user_id
    const userId = parseInt(user_id);
    if (isNaN(userId)) {
      return res.status(400).json({ error: 'Invalid user ID' });
    }

    // Generate slug
    const slug = title.toLowerCase().replace(/\s+/g, '-') + '-' + Date.now();
    const image = req.file ? req.file.filename : null;

    const query = `
      INSERT INTO blogs (title, content, slug, image, user_id, created_at)
      VALUES ($1, $2, $3, $4, $5, NOW())
      RETURNING *;
    `;
    const values = [title, content, slug, image, userId];

    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error adding blog:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get All Blogs with user name
export const getBlogs = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        blogs.*, 
        users.name AS "userName"
      FROM 
        blogs
      JOIN 
        users ON blogs.user_id = users.id
      ORDER BY blogs.created_at DESC;
    `);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error fetching blogs:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};



// Get all blogs (duplicate of getBlogs but kept if used elsewhere)
export const getAllBlogs = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        blogs.*, 
        users.name AS "userName"
      FROM 
        blogs 
      JOIN 
        users 
      ON 
        blogs.user_id = users.id
      ORDER BY blogs.created_at DESC;
    `);
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching all blogs:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const deleteBlogById = async (req, res) => {
    const { id } = req.params;
  
    try {
      const result = await pool.query("DELETE FROM blogs WHERE id = $1", [id]);
  
      if (result.rowCount === 0) {
        return res.status(404).json({ message: "Blog not found" });
      }
  
      res.json({ message: "Blog deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting blog", error });
    }
  };

  export const getBlogById = async (req, res) => {
    const { id } = req.params;
    try {
      const result = await pool.query("SELECT * FROM blogs WHERE id = $1", [id]);
      if (result.rows.length === 0) return res.status(404).json({ message: "Blog not found" });
      res.json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ message: "Error fetching blog", error });
    }
  };

  export const updateBlogById = async (req, res) => {
    const { id } = req.params;
    const { title, category, content, slug } = req.body;
  
    try {
      await pool.query(
        "UPDATE blogs SET title=$1, category=$2, content=$3, slug=$4 WHERE id=$5",
        [title, category, content, slug, id]
      );
      res.json({ message: "Blog updated successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error updating blog", error });
    }
  };