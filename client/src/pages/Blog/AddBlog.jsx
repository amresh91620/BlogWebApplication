import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

function AddBlog() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Technology");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [slug, setSlug] = useState("");

  const handleSubmit = () => {
    console.log({ title, category, content, slug, image });
  };

  return (
    <div className="p-3 max-w-5xl mx-auto mt-20">
      <Card>
        <CardHeader>
          <CardTitle>Add a New Blog</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input
              placeholder="Blog Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Input
              placeholder="Slug (e.g., my-blog-title)"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
            />

            {/* Fixed Select */}
            <Select onChange={(value) => setCategory(value)}>
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

            <Label>Upload Image</Label>
            <Input type="file" onChange={(e) => setImage(e.target.files[0])} />

            {/* Removed 'multiline' since Textarea is already multi-line */}
            <Textarea
              rows={10}
              placeholder="Write your blog content here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />

            <Button onClick={handleSubmit}>Publish</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default AddBlog;
