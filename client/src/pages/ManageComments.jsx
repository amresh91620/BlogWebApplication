import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import axios from "axios";

const ManageComments = () => {
  const [comments, setComments] = useState([]);

  const fetchComments = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/comments");
      setComments(res.data);
    } catch (err) {
      console.error("Error fetching comments:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/comments/${id}`);
      setComments(comments.filter(cmt => cmt.id !== id));
      alert("Comment deleted successfully");
    } catch (err) {
      console.error("Error deleting comment:", err);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <Card className="m-5">
      <CardHeader>
        <CardTitle>Manage Comments</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {comments.map((cmt) => (
            <div key={cmt.id} className="border p-3 rounded-md flex justify-between">
              <div>
                <p className="font-semibold">{cmt.user}</p>
                <p>{cmt.comment}</p>
                <p className="text-xs text-muted-foreground">On Blog: {cmt.blog}</p>
              </div>
              <Button variant="destructive" size="sm" onClick={() => handleDelete(cmt.id)}>
                Delete
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ManageComments;
