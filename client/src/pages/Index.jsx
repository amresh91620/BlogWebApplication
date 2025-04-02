import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FiCalendar } from "react-icons/fi";
import ai from "@/assets/images/ai.jpg";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import profile from "@/assets/images/profile.png";

const blogs = [
  {
    image: "/photography.jpg",
    title: "Photography is a way to collect the memories of events...",
    date: "03-03-2025",
  },
  {
    image: "/music.jpg",
    title: "Music, art concerned with combining vocal or instrumental sounds...",
    date: "03-03-2025",
  },
  {
    image: "/fitness.jpg",
    title: "Health and fitness are a state of well-being...",
    date: "03-03-2025",
  },
  {
    image: "/religion.jpg",
    title: "Religious blogs provide us with a system of beliefs...",
    date: "03-03-2025",
  },
  {
    image: "/political.jpg",
    title: "Political blogs provide information about the current political status...",
    date: "03-03-2025",
  },
  {
    image: "/technology.jpg",
    title: "Technology blogs provide news, reviews, and analysis...",
    date: "03-03-2025",
  },
];

export default function Index() {
  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6 mt-10">
      {/* Blog Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog, index) => (
          <Card key={index} className="w-[350px] p-2 border border-blue-700">
            <CardHeader className="flex items-center gap-3">
            <div className="flex items-center mr-0 gap-2 text-sm">
              <Avatar>
                <AvatarImage src={profile} alt="Profile" />
                <AvatarFallback><img src={profile} alt="Profile" /></AvatarFallback>
              </Avatar>
                <CardTitle className="text-lg font-semibold">Amresh Kumar</CardTitle>
                <p className="text-sm text-gray-500 flex items-center mt-1">
             
                 
                </p>
              </div>
            </CardHeader>
            <CardContent>
              <img
                src={blog.image}
                alt="Blog"
                className="w-full h-40 object-cover rounded-lg shadow-md mb-4"
              />
              <div className="flex items-center gap-2 mb-2">
              <FiCalendar/>
               {blog.date}
               </div>
              <p className="text-sm text-gray-700">{blog.title}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
