import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ai from "@/assets/images/ai.jpg"; // Default image

function SingleBlogDetails() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const fetchBlogDetails = async () => {
      const res = await axios.get(`http://localhost:5000/api/blogs/${id}`);
      setBlog(res.data);
    };

    const fetchComments = async () => {
      const res = await axios.get(`http://localhost:5000/api/comments/${id}`);
      setComments(res.data);
    };

    fetchBlogDetails();
    fetchComments();
  }, [id]);

  const handleAddComment = async () => {
    if (!newComment.trim()) {
      alert("Comment cannot be empty.");
      return;
    }
    const userName = JSON.parse(localStorage.getItem("user"))?.name;

    try {
      const res = await axios.post(
        "http://localhost:5000/api/comments",
        {
          blog_id: parseInt(id),
          comment: newComment,
          user_name: userName || "Guest",
        }
      );
      setComments([res.data, ...comments]);
      setNewComment("");
    } catch (err) {
      console.error("Error adding comment:", err.response?.data || err.message);
    }
  };

  if (!blog) return <div>Loading...</div>;

  return (
    <div className="p-6 max-w-6xl mx-auto mt-10">
      {/* Blog Post Card */}
      <Card className="shadow-2xl rounded-xl overflow-hidden bg-white">
        <CardHeader className="bg-blue-700 text-white p-6">
          <CardTitle className="text-4xl font-semibold">{blog.title}</CardTitle>
          <p className="text-sm mt-2">Category: <span className="font-semibold">{blog.category}</span></p>
          <p className="text-sm">By <span className="font-semibold">{blog.userName || 'Unknown'}</span> | {new Date(blog.created_at).toLocaleDateString()}</p>
        </CardHeader>
        <CardContent className="p-6">
          <img
            src={`http://localhost:5000/uploads/${blog.image || ai}`}
            alt="Blog"
            className="w-full h-80 object-cover rounded-xl shadow-lg mb-6"
          />
          <p className="text-lg leading-relaxed text-gray-700">{blog.content}</p>
        </CardContent>
      </Card>

      {/* Comments Section */}
      <div className="mt-8 p-6 bg-gray-50 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold mb-6">Comments</h2>
        <div className="space-y-6">
          {comments.map((c) => (
            <div key={c.id} className="p-4 bg-white rounded-lg border border-gray-300 shadow-md">
              <p className="font-medium text-lg">{c.user_name || "Guest"}</p>
              <p className="text-gray-600">{c.comment}</p>
              <p className="text-xs text-gray-500 mt-2">{new Date(c.created_at).toLocaleString()}</p>
            </div>
          ))}
        </div>
        
        {/* Comment Input */}
        <div className="mt-8 flex flex-col gap-4">
          <Input
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="p-4 text-lg border border-gray-300 rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <Button
            onClick={handleAddComment}
            className="w-full py-3 mt-2 text-white bg-blue-600 rounded-xl shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            Post Comment
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SingleBlogDetails;
