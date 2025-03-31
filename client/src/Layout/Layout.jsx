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
        <main className='w-full'>
          <div className='w-full min-h-[calc(100vh-40px)]'>
            <Outlet />
          </div>
            <Footer />
        </main>
    </SidebarProvider>
    
    </>
  )
}

export default Layout
