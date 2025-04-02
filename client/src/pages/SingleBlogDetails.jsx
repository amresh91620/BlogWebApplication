import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ai from "@/assets/images/ai.jpg";

function SingleBlogDetails() {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([...comments, { id: comments.length + 1, text: newComment }]);
      setNewComment("");
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto mt-10">
      <Card className="shadow-lg border border-gray-200 rounded-lg overflow-hidden">
        <CardHeader className="bg-blue-600 text-white p-6">
          <CardTitle className="text-3xl font-bold">Understanding Artificial Intelligence</CardTitle>
          <p className="text-sm mt-1">Category: <span className="font-semibold">Technology</span></p>
          <p className="text-sm">By <span className="font-semibold">John Doe</span> | March 30, 2025 | 10:30 AM</p>
        </CardHeader>
        <CardContent className="p-6">
          <img
            src={ai}
            alt="Blog Image"
            className="w-full h-80 object-cover rounded-lg shadow-md mb-6"
          />
          <p className="text-lg leading-relaxed text-gray-700">
            Artificial Intelligence (AI) has been transforming industries across the world.
            From healthcare to finance, AI is making processes smarter and more efficient.
            AI-powered assistants are now capable of handling complex tasks with accuracy.
            In healthcare, AI aids in diagnosing diseases and predicting treatment outcomes.
            Financial institutions leverage AI to detect fraud and optimize investments.
            Autonomous vehicles utilize AI to enhance safety and decision-making on roads.
            The education sector benefits from AI-driven personalized learning experiences.
            AI-driven robotics is revolutionizing manufacturing and warehouse automation.
            Ethical concerns and regulations are evolving alongside AI’s rapid advancements.
            The future of AI holds immense potential to further transform daily life and work.
          </p>
        </CardContent>
      </Card>
      
      <div className="mt-6 p-6 bg-gray-100 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Comments</h2>
        <div className="space-y-4">
          {comments.map(comment => (
            <div key={comment.id} className="p-3 bg-white rounded-lg shadow-sm border border-gray-200">
              {comment.text}
            </div>
          ))}
        </div>
        <div className="mt-4 flex gap-2">
          <Input
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <Button onClick={handleAddComment}>Post</Button>
        </div>
      </div>
    </div>
  );
}

export default SingleBlogDetails;