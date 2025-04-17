// routes/blogRoutes.js
import express from 'express';
import multer from 'multer';
import path from 'path';
import { addBlog, getBlogs } from '../controllers/blogController.js';
import { getBlogById , getAllBlogs } from '../controllers/blogController.js'; // Import the controller methods
import { deleteBlogById ,updateBlogById} from '../controllers/blogController.js';
import { getBlogsByCategory ,searchBlogs } from '../controllers/blogController.js';


const router = express.Router();

// Set up storage for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads'); // save in uploads/
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// Routes
router.post('/add', upload.single('image'), addBlog);
router.get('/', getBlogs);
router.get('/:id', getBlogById); // Get blog by ID
router.get('/blogs', getAllBlogs); // API route to get all blogs
router.delete('/:id', deleteBlogById); // ✅ Delete blog by ID
router.put('/:id', updateBlogById);

// GET blogs by category name
router.get('/category/:categoryName', getBlogsByCategory);
router.get("/search/:slug", searchBlogs);


router.delete('/api/blogs/:slug', async (req, res) => {
    const { slug } = req.params;
    try {
      const result = await pool.query('DELETE FROM blogs WHERE slug = $1 RETURNING *', [slug]);
      if (result.rowCount === 0) {
        return res.status(404).json({ message: 'Blog not found' });
      }
      res.json({ message: 'Blog deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting blog', error });
    }
  });


  
  
export default router;
