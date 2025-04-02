import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { RouteCategoryDetails } from "@/helpers/RouteName";

const AddCategory = () => {
  const [category, setCategory] = useState("");
  const [slug, setSlug] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Category Added:", { category, slug });
    navigate(RouteCategoryDetails); // Redirect after adding
  };

  return (
    <div className="flex justify-center min-h-[80vh]"> {/* Centered and reduced height */}
      <div className="flex items-center justify-center w-full max-w-md"> {/* Centering wrapper */}
        <Card className="p-6 w-full"> {/* Full width within max-w-md */}
          <CardHeader>
            <CardTitle>Add Category</CardTitle>
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
              <Button type="submit" className="w-full">Add Category</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AddCategory;