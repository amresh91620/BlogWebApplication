import React, { useEffect, useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import logo from "@/assets/images/logo.png";
import { IoHomeSharp } from "react-icons/io5";
import { FaComments } from "react-icons/fa6";
import { LuUsers, LuListTree } from "react-icons/lu";
import { RouteBlog, RouteCategoryDetails } from "@/helpers/RouteName";
import { RxDotFilled } from "react-icons/rx";

const AppSidebar = () => {
  const [user, setUser] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    if (loggedInUser) {
      setUser(loggedInUser);
    }

    // Fetch categories from backend
    fetch("http://localhost:5000/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  const isAdmin = user?.role === "admin";
  const isUser = !!user && user.role !== "admin";
  const isGuest = !user;

  return (
    <Sidebar>
      <SidebarHeader className="bg-white">
        <img src={logo} width={60} alt="Logo" />
      </SidebarHeader>

      <SidebarContent className="bg-white">
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <IoHomeSharp />
                <Link to="/">Home</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            {user && user.role !== "admin" && (
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <LuListTree />
                  <Link to={RouteBlog}>Blogs</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )}

            {isAdmin && (
              <>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <FaComments />
                    <Link to="/manage-comments">Manage Comments</Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <LuUsers />
                    <Link to="/manage-users">Manage Users</Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <LuListTree />
                    <Link to={RouteCategoryDetails}>Manage Categories</Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </>
            )}
          </SidebarMenu>
        </SidebarGroup>

        {(isGuest || isUser) && categories.length > 0 && (
          <SidebarGroup>
            <SidebarGroupLabel>Categories</SidebarGroupLabel>
            <SidebarMenu>
              {categories.map((cat) => (
                <SidebarMenuItem key={cat.id}>
                  <SidebarMenuButton className="flex items-center gap-2">
                    <RxDotFilled className="text-gray-500 text-lg" />
                    <Link to={`/category/${cat.name}`}>  {/* Use category name directly */}
                      {cat.name}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>

          </SidebarGroup>
        )}
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
