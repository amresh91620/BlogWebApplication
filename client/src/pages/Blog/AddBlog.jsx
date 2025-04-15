import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";  // Don't forget to import useNavigate for navigation

function AddBlog() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("Technology");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [errors, setErrors] = useState({}); // To hold validation errors
  const navigate = useNavigate(); // For navigation after success

  const validateForm = () => {
    const errors = {};
    if (!title) errors.title = "Title is required.";
    if (!slug) errors.slug = "Slug is required.";
    if (!content) errors.content = "Content is required.";
    if (!category) errors.category = "Category is required.";
    if (!image) errors.image = "Image is required."; // Remove if image is optional

    setErrors(errors);

    return Object.keys(errors).length === 0; // Return true if no errors
  };

  const handleSubmit = async () => {
    if (!validateForm()) return; // If validation fails, do not submit

    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return alert("Please login to submit blog.");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("slug", slug);
    formData.append("category", category);
    formData.append("content", content);
    formData.append("user_id", user.id);
    formData.append("image", image); // optional, backend should handle image saving

    try {
      setUploading(true);
      const response = await fetch("http://localhost:5000/api/blogs/add", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        alert("Blog posted successfully!");
        setTitle("");
        setSlug("");
        setCategory("Technology");
        setContent("");
        setImage(null);

        // Redirect to homepage after posting
        navigate("/");
      } else {
        alert(data.error || "Something went wrong.");
      }
    } catch (err) {
      console.error(err);
      alert("Server error.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-3 max-w-5xl mx-auto mt-20">
      <Card>
        <CardHeader>
          <CardTitle>Add a New Blog</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Input
                placeholder="Blog Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              {errors.title && <div className="text-red-500">{errors.title}</div>}
            </div>

            <div>
              <Input
                placeholder="Slug (e.g., my-blog-title)"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
              />
              {errors.slug && <div className="text-red-500">{errors.slug}</div>}
            </div>

            <div>
              <Select
                value={category}
                onValueChange={(value) => setCategory(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Technology">Technology</SelectItem>
                  <SelectItem value="Health & Wellness">Health & Wellness</SelectItem>
                  <SelectItem value="Finance">Finance</SelectItem>
                  <SelectItem value="Travel">Travel</SelectItem>
                </SelectContent>
              </Select>
              {errors.category && (
                <div className="text-red-500">{errors.category}</div>
              )}
            </div>

            <div>
              <Label>Upload Image</Label>
              <Input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
              />
              {errors.image && <div className="text-red-500">{errors.image}</div>}
            </div>

            <div>
              <Textarea
                rows={10}
                placeholder="Write your blog content here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              {errors.content && (
                <div className="text-red-500">{errors.content}</div>
              )}
            </div>

            <Button onClick={handleSubmit} disabled={uploading}>
              {uploading ? "Publishing..." : "Publish"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default AddBlog;
