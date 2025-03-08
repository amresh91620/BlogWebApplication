import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
  } from "@/components/ui/sidebar"
import { Link } from "react-router-dom"

const AppSidebar = () => {
  return (
    <Sidebar>
    <SidebarHeader />
    <SidebarContent>
      <SidebarGroup />
        <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton>
                    <Link to="">Home</Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
      <SidebarGroup />
    </SidebarContent>
    <SidebarFooter />
  </Sidebar>
  )
}

export default AppSidebar
