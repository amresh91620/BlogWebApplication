import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

function EditBlog() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Technology");
  const [content, setContent] = useState("");
  const [slugInput, setSlugInput] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/blogs/${id}`);
        const blogData = response.data;
        setBlog(blogData);
        setTitle(blogData.title);
        setCategory(blogData.category);
        setContent(blogData.content);
        setSlugInput(blogData.slug);
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };

    fetchBlog();
  }, [id]);

  const handleSubmit = async () => {
    try {
      const updatedBlog = {
        title,
        category,
        content,
        slug: slugInput,
      };

      await axios.put(`http://localhost:5000/api/blogs/${id}`, updatedBlog);

      setSuccess(true); // ✅ Show success message

      // ✅ Delay and navigate after 1.5 seconds
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      console.error("Error updating blog:", error);
    }
  };

  if (!blog) return <div>Loading...</div>;

  return (
    <div className="p-3 max-w-5xl mx-auto mt-20">
      <Card>
        <CardHeader>
          <CardTitle>Edit Blog</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {success && (
              <div className="text-green-600 font-medium">
                Blog updated successfully! Redirecting...
              </div>
            )}
            <Input
              placeholder="Blog Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Input
              placeholder="Slug (e.g., my-blog-title)"
              value={slugInput}
              onChange={(e) => setSlugInput(e.target.value)}
            />
            <Select onValueChange={(value) => setCategory(value)} value={category}>
              <SelectTrigger>
                <SelectValue>{category}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Technology">Technology</SelectItem>
                <SelectItem value="Health & Wellness">Health & Wellness</SelectItem>
                <SelectItem value="Finance">Finance</SelectItem>
                <SelectItem value="Travel">Travel</SelectItem>
              </SelectContent>
            </Select>
            <Label>Content</Label>
            <Textarea
              rows={10}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Edit your blog content here..."
            />
            <Button onClick={handleSubmit}>Update Blog</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default EditBlog;
