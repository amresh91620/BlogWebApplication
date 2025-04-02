import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Pencil, Trash } from "lucide-react";
import { Link } from "react-router-dom";
import { RouteAddCategory, RouteEditCategory } from "@/helpers/RouteName";

const categories = [
  { name: "Fashion & Beauty", slug: "fashion-and-beauty" },
  { name: "Wellness", slug: "wellness" },
  { name: "Places & Travel", slug: "places-and-travel" },
  { name: "Sports", slug: "sports" },
  { name: "News & Politics", slug: "news-and-politics" },
  { name: "Entertainment", slug: "entertainment" },
];

const CategoryDetails = () => {
  return (
    <div className="p-6">
      {/* Add Category Button */}
      <Link to={RouteAddCategory}>
      <Button className="bg-purple-500 text-white mb-4 mt-10">Add Category</Button>
        </Link>
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
              {categories.map((category, index) => (
                <TableRow key={index}>
                  <TableCell>{category.name}</TableCell>
                  <TableCell>{category.slug}</TableCell>
                  <TableCell className="text-right space-x-2">
                  <Link to={RouteEditCategory}>
                    <Button variant="ghost" size="icon">
                      <Pencil className="w-4 h-4" />
                    </Button>
                    </Link>
                    <Button variant="ghost" size="icon">
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
