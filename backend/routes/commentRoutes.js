import express from "express";
import { getAllComments, deleteComment } from "../controllers/commentController.js";
import { addComment, getCommentsByBlogId } from '../controllers/commentController.js';


const router = express.Router();

router.get("/", getAllComments);
router.delete("/:id", deleteComment);
router.post('/', addComment); // No token required now
router.get('/:blogId', getCommentsByBlogId);

export default router;
