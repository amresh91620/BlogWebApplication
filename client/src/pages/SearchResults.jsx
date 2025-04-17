// src/pages/SearchResults.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FiCalendar } from "react-icons/fi";

const SearchResults = () => {
  const { query } = useParams();
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/blogs/search/${query}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setResults(data);
        else setError("No matching blogs found.");
      })
      .catch(() => setError("Failed to fetch search results."));
  }, [query]);

  return (
    <div className="p-6 mt-6">
      <h2 className="text-2xl font-bold mb-4">Search Results for: "{query}"</h2>
      {error ? (
        <p>{error}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((blog) => (
            <Card key={blog.id}>
              <CardHeader>
                <CardTitle>{blog.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <img
                  src={`http://localhost:5000/uploads/${blog.image}`}
                  alt={blog.title}
                  className="h-40 w-full object-cover rounded-lg mb-3"
                />
                <p>{blog.content.slice(0, 100)}...</p>
                <p className="text-sm text-gray-500 flex items-center mt-2">
                  <FiCalendar className="mr-1" />
                  {new Date(blog.created_at).toLocaleDateString()}
                </p>
                <Link to={`/blog/${blog.id}`} className="text-blue-600 text-sm mt-2 block">
                  Read More
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
