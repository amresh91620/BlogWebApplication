import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Trash } from "lucide-react";
import { Link } from "react-router-dom";
import { RouteAddCategory } from "@/helpers/RouteName";
import { useEffect, useState } from "react";
import axios from "axios";

const CategoryDetails = () => {
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState(""); // State to store success or error message

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setMessage("Error fetching categories. Please try again.");
    }
  };

  // Delete category
  const handleDeleteCategory = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/categories/${id}`);
      
      if (response.status === 200) {
        setCategories(categories.filter((category) => category.id !== id)); // Remove the deleted category from state
        setMessage("Category deleted successfully!"); // Success message
      }
    } catch (error) {
      console.error('Error deleting category:', error);
      setMessage("Error deleting category. Please try again."); // Error message
    }

    // Clear message after 3 seconds
    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="p-6">
      {/* Add Category Button */}
      <Link to={RouteAddCategory}>
        <Button className="bg-purple-500 text-white mb-4 mt-10">Add Category</Button>
      </Link>

      {/* Success or Error Message */}
      {message && (
        <div className={`message ${message.includes("successfully") ? "success" : "error"}`}>
          {message}
        </div>
      )}

      {/* Category Table */}
      <Card>
        <CardContent className="p-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category Name</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell>{category.name}</TableCell>
                  <TableCell>{category.slug}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteCategory(category.id)}>
                      <Trash className="w-4 h-4 text-red-500" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default CategoryDetails;
