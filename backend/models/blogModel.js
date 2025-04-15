import { pool } from '../db.js'; // PostgreSQL pool connection

export const addBlog = async (blog) => {
  const { title, slug, category, content, image_url, user_id } = blog;
  const result = await pool.query(
    "INSERT INTO blogs (title, slug, category, content, image_url, user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
    [title, slug, category, content, image_url, user_id]
  );
  return result.rows[0];
};
