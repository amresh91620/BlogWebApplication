import AppSidebar from '@/components/AppSidebar'
import Footer from '@/components/Footer'
import Topbar from '@/components/Topbar'
import { SidebarProvider } from '@/components/ui/sidebar'
import React from 'react'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <>
    //topbar
    //sidebar 
    <SidebarProvider>
        <Topbar />
        <AppSidebar />
        <main>
            <Outlet />
            <Footer />
        </main>
    </SidebarProvider>
    
    </>
  )
}

export default Layout
