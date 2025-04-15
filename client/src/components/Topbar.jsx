import React, { useState, useEffect } from "react";
import logo from "@/assets/images/logo.png";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";
import { MdLogin, MdAdd, MdLogout } from "react-icons/md";
import SearchBox from "./SearchBox";
import { RouteBlogAdd, RouteProfile, RouteSignIn } from "@/helpers/RouteName";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaRegUserCircle } from "react-icons/fa";

const Topbar = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    if (loggedInUser) {
      setUser(loggedInUser);
    }
    setLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");  // Remove the user from localStorage
    setUser(null);  // Set user state to null
    navigate("/");  // Redirect to homepage
    window.location.reload();  // Force a page reload to reflect the changes
  };
  
  
  const isAdmin = user?.role === "admin";

  return (
    <div className="flex justify-between items-center h-16 fixed w-full z-20 bg-white px-5 border-b top-0">
      <div>
        <img src={logo} width={60} alt="Logo" />
      </div>
      <div className="w-[500px]">
        {isAdmin ? (
        <div className="flex justify-center w-full">
        <Link to="/" className="text-xl font-bold">
          Admin Panel
        </Link>
      </div>
        ) : (
          // Show SearchBox for normal users
          <SearchBox />
        )}
      </div>
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : user ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage
                  src={user.profilePicture || "/default-profile.png"}
                  alt="Profile"
                />
                <AvatarFallback>
                  <FaRegUserCircle />
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>
                <p>{user.name}</p>
                <p className="text-sm">{user.email}</p>
              </DropdownMenuLabel>
              {!isAdmin && (
                <>
                  <DropdownMenuItem asChild className="cursor-pointer">
                    <Link to={RouteProfile} className="flex items-center gap-2">
                      <FaRegUserCircle /> Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="cursor-pointer">
                    <Link to={RouteBlogAdd} className="flex items-center gap-2">
                      <MdAdd /> Create blog
                    </Link>
                  </DropdownMenuItem>
                </>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                asChild
                className="cursor-pointer"
                onClick={handleLogout}
              >
                <div className="flex items-center gap-2">
                  <MdLogout color="red" /> Logout
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button asChild className="rounded-full">
            <Link to={RouteSignIn}>
              <MdLogin /> Sign In
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
};

export default Topbar;
