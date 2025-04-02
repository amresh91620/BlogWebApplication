'use client'

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { RouteBlogAdd, RouteBlogDetails, RouteBlogEdit } from "@/helpers/RouteName"
import { FiEye, FiEdit, FiTrash2 } from "react-icons/fi"
import { Link } from "react-router-dom"

const blogs = [
    {
      author: "Amresh Kumar",
      category: "Technology",
      title: "The Future of AI: What to Expect in the Next Decade",
      slug: "the-future-of-ai-what-to-expect-in-the-next-decade-123456",
      dated: "21-12-2024",
    },
    {
      author: "Amresh Kumar",
      category: "Health & Wellness",
      title: "10 Tips for a Healthier Lifestyle in 2024",
      slug: "10-tips-for-a-healthier-lifestyle-in-2024-789101",
      dated: "21-12-2024",
    },
    {
      author: "Amresh Kumar",
      category: "Personal Finance",
      title: "How to Save More Money with Smart Budgeting",
      slug: "how-to-save-more-money-with-smart-budgeting-112233",
      dated: "21-12-2024",
    },
    {
      author: "Amresh Kumar",
      category: "Travel",
      title: "Top 5 Budget Travel Destinations for 2024",
      slug: "top-5-budget-travel-destinations-for-2024-445566",
      dated: "21-12-2024",
    },
  ];

export default function BlogsPage() {
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
            <TableHead>Dated</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {blogs.map((blog, index) => (
            <TableRow key={index}>
              <TableCell>{blog.author}</TableCell>
              <TableCell>{blog.category}</TableCell>
              <TableCell>{blog.title}</TableCell>
              <TableCell>{blog.slug}</TableCell>
              <TableCell>{blog.date}</TableCell>
              <TableCell className="flex gap-2">
                <Link to={RouteBlogDetails}>
                <FiEye className="cursor-pointer text-gray-600 hover:text-blue-600" size={18} />
                </Link>
               <Link to={RouteBlogEdit}>
                <FiEdit className="cursor-pointer text-gray-600 hover:text-green-600" size={18} />
                </Link> 
                <FiTrash2 className="cursor-pointer text-gray-600 hover:text-red-600" size={18} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
    </Card>
  )
}
