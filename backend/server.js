// server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import blogRoutes from './routes/blogRoutes.js';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/userRoutes.js'; // ✅ Use import for consistency
import commentRoutes from "./routes/commentRoutes.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Static folder for uploaded images
app.use('/uploads', express.static('uploads'));

// Routes
app.get('/', (req, res) => {
  res.send('Server is running 🎉');
});

app.use('/auth', authRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/users', userRoutes); // ✅ Mount user routes here
app.use("/api/comments", commentRoutes); // Mount comment routes here


// Start server
app.listen(PORT, () => {
  console.log(`✅ Server started on http://localhost:${PORT}`);
});
