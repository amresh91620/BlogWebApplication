import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { RouteCategoryDetails } from "@/helpers/RouteName";
import axios from "axios";

const AddCategory = () => {
  const [category, setCategory] = useState("");
  const [slug, setSlug] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:5000/api/categories", {
        name: category,
        slug: slug,
      });

      if (response.status === 201) {
        navigate(RouteCategoryDetails); // Redirect on success
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Category creation failed");
    }
  };

  return (
    <div className="flex justify-center min-h-[80vh]">
      <div className="flex items-center justify-center w-full max-w-md">
        <Card className="p-6 w-full">
          <CardHeader>
            <CardTitle>Add Category</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && <p className="text-red-600 text-sm">{error}</p>}
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
