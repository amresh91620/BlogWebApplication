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
import { LuUsers, LuListTree } from "react-icons/lu"; // Added icon for categories
import { RouteBlog, RouteCategoryDetails } from "@/helpers/RouteName";

const AppSidebar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    if (loggedInUser) {
      setUser(loggedInUser);
    }
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

            {/* Only show blogs for non-admin users */}
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

        {/* Show Categories for Guest + Logged-in Users (non-admin) */}
        {(isGuest || isUser) && (
          <SidebarGroup>
            <SidebarGroupLabel>Categories</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Link to="#">Category Item</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        )}
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
