import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
  } from "@/components/ui/sidebar"
import { Link } from "react-router-dom"
import logo from "@/assets/images/logo.png"
import { IoHomeSharp } from "react-icons/io5";
import { BiCategory } from "react-icons/bi";
import { FaBlog } from "react-icons/fa6";
import { FaComments } from "react-icons/fa6";
import { LuUsers } from "react-icons/lu";
import { GoDotFill } from "react-icons/go";
import { RouteBlog, RouteCategoryDetails } from "@/helpers/RouteName";

const AppSidebar = () => {
  return (
    <Sidebar>
    <SidebarHeader className="bg-white">
      <img src={logo} width={60} />
    </SidebarHeader>
    <SidebarContent className="bg-white">
      <SidebarGroup >
        <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton>
                  <IoHomeSharp/>
                    <Link to="">Home</Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <SidebarMenuButton>
                  <BiCategory/>
                    <Link to={RouteCategoryDetails}>Categories</Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <SidebarMenuButton>
                  <FaBlog/>
                    <Link to={RouteBlog}>Blogs</Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <SidebarMenuButton>
                  <FaComments/>
                    <Link to="">Comments</Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <SidebarMenuButton>
                  < LuUsers/>
                    <Link to="">Users</Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup >

      <SidebarGroup >
        <SidebarGroupLabel>
        Categories
        </SidebarGroupLabel>

        <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton>
                  <GoDotFill/>
                    <Link to="">Categories-item</Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup >
    </SidebarContent>
  </Sidebar>
  )
}

export default AppSidebar
