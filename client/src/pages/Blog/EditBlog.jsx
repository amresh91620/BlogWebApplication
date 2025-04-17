import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

function EditCategory() {
  const { id } = useParams();
  const [categoryName, setCategoryName] = useState("");
  const [slug, setSlug] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/categories/${id}`);
        const categoryData = response.data;
        setCategoryName(categoryData.name);
        setSlug(categoryData.slug);
      } catch (error) {
        console.error("Error fetching category:", error);
      }
    };

    fetchCategory();
  }, [id]);

  const handleSubmit = async () => {
    try {
      const updatedCategory = {
        name: categoryName,
        slug: slug,
      };

      await axios.put(`http://localhost:5000/api/categories/${id}`, updatedCategory);

      setSuccess(true); // ✅ Show success message

      // ✅ Delay and navigate after 1.5 seconds
      setTimeout(() => {
        navigate("/categories");
      }, 1500);
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  if (!categoryName) return <div>Loading...</div>;

  return (
    <div className="p-3 max-w-5xl mx-auto mt-20">
      <Card>
        <CardHeader>
          <CardTitle>Edit Category</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {success && (
              <div className="text-green-600 font-medium">
                Category updated successfully! Redirecting...
              </div>
            )}
            <Input
              placeholder="Category Name"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
            <Input
              placeholder="Slug (e.g., my-category)"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
            />
            <Button onClick={handleSubmit}>Update Category</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default EditCategory;
