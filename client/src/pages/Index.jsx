import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for routing
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FiCalendar } from "react-icons/fi";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import profile from "@/assets/images/profile.png"; // Default Profile Image
import { Button } from "@/components/ui/button"; // Import Button component

const Index = () => {
  const [blogs, setBlogs] = useState([]);

  // Fetch blogs with user information
  const fetchBlogs = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/blogs');
      setBlogs(response.data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6 mt-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog, index) => (
          <Card
            key={index}
            className="w-[350px] bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border"
          >
            <CardHeader className="pt-4 pb-0 px-4">
              <div className="flex items-center gap-3">
                {/* Profile Image */}
                <Avatar className="w-8 h-8">
                  <AvatarImage src={blog.userProfile || profile} alt="Profile" />
                  <AvatarFallback>
                    <img src={profile} alt="Fallback" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  {/* User Name */}
                  <CardTitle className="text-sm font-semibold text-gray-800">
                    {blog.userName || 'Unknown User'}
                  </CardTitle>
                  {/* Date of Blog */}
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <FiCalendar className="text-[14px]" />
                    {formatDate(blog.created_at || blog.date)}
                  </p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="pt-3 pb-5 px-4">
              {/* Blog Image */}
              <img
                src={`http://localhost:5000/uploads/${blog.image}`}
                alt="Blog"
                className="w-full h-44 object-cover rounded-xl mb-4"
              />
              {/* Blog Title */}
              <p className="text-lg font-semibold text-gray-800 mb-1">{blog.title}</p>
              {/* Blog Content (Excerpt) */}
              <p className="text-sm text-gray-600 line-clamp-3">{blog.content}</p>
            </CardContent>

            {/* Read More Button */}
            <div className="p-4 flex justify-end">
              <Link to={`/blog/${blog.id}`}>
                <Button className="bg-blue-600 text-white hover:bg-blue-400 text-sm px-1 py-1">
                  Read More
                </Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Index;
