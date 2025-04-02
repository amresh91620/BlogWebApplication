import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate, useParams } from "react-router-dom";
import { RouteCategoryDetails } from "@/helpers/RouteName";

const EditCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState("");
  const [slug, setSlug] = useState("");

  useEffect(() => {
    // Fetch category details using the ID (replace with actual API call)
    const fetchCategory = async () => {
      const data = { category: "Example Category", slug: "example-category" }; // Mock data
      setCategory(data.category);
      setSlug(data.slug);
    };
    fetchCategory();
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Category Updated:", { id, category, slug });
    navigate(RouteCategoryDetails); // Redirect after updating
  };

  return (
    <div className="flex justify-center min-h-[80vh]"> {/* Centered and reduced height */}
      <div className="flex items-center justify-center w-full max-w-md"> {/* Centering wrapper */}
        <Card className="p-6 w-full"> {/* Full width within max-w-md */}
          <CardHeader>
            <CardTitle>Edit Category</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="category">Category Name</Label>
                <Input
                  id="category"
                  type="text"
                  placeholder="Enter category name"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="slug">Slug</Label>
                <Input
                  id="slug"
                  type="text"
                  placeholder="Enter slug"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full">Update Category</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EditCategory;
