'use client'

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { RouteBlogAdd, RouteBlogDetails, RouteBlogEdit } from "@/helpers/RouteName"
import { FiEye, FiEdit, FiTrash2 } from "react-icons/fi"
import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"

export default function BlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null); // To store logged-in user data

  // Simulate getting the logged-in user (You can replace this with your actual auth logic)
  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('user')); // Get user from localStorage
    if (loggedInUser) {
      setUser(loggedInUser); // Set user data (assuming you store user info in localStorage)
    }
  }, []);

  // Fetch blogs for the logged-in user
  const fetchBlogs = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/blogs');
      const userBlogs = response.data.filter(blog => blog.user_id === user.id); // Filter blogs by user ID
      setBlogs(userBlogs); // Set only the blogs created by the logged-in user
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  // Fetch blogs when the user logs in
  useEffect(() => {
    if (user) {
      fetchBlogs();
    }
  }, [user]);
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
  
    try {
      await axios.delete(`http://localhost:5000/api/blogs/${id}`);
      setBlogs(prev => prev.filter(blog => blog.id !== id));
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  return (
    <Card className="w-full max-w-6xl mx-auto bg-white shadow-md rounded-lg p-6 mt-20">
      <div className="p-6">
        {/* Add Blog Button */}
        <Link to={RouteBlogAdd}>
          <Button className="mb-4">Add Blog</Button>
        </Link>

        {/* Blog Table */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Author</TableHead>
              <TableHead>Category Name</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {blogs.map((blog, index) => (
              <TableRow key={index}>
                <TableCell>{blog.userName}</TableCell>
                <TableCell>{blog.category}</TableCell>
                <TableCell>{blog.title}</TableCell>
                <TableCell>{blog.slug}</TableCell>
                <TableCell className="flex gap-2">
                <Link to={RouteBlogEdit.replace(':id', blog.id.toString())}>
                <FiEdit className="cursor-pointer text-gray-600 hover:text-green-600" size={18} />
              </Link>
                  <FiTrash2
                  className="cursor-pointer text-gray-600 hover:text-red-600"
                  size={18}
                  onClick={() => handleDelete(blog.id)} // ✅ Pass ID not slug
                />

                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  )
}
