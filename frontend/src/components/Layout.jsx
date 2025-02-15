import React, { useContext, useEffect, useState } from 'react';
import { SidebarProvider,SidebarTrigger } from '@/components/ui/sidebar'; // Import the SidebarProvider if needed
import SideBarWrapper from './SideBarWrapper';
import { MoonIcon, SunIcon } from 'lucide-react';
import { ThemeContext } from '@/context/ThemeContext';
import { Outlet } from 'react-router-dom';
import { ChatPopup } from '@/Pages/Chatbot/ChatPopup';

export function Layout({ children }) {

    const [sidebarOpen, setSidebarOpen] = useState(true)

    const { isDarkMode, switchMode} = useContext(ThemeContext)

    useEffect(()=>{
        console.log(sidebarOpen)
    },[sidebarOpen])
  return (
    <SidebarProvider open={sidebarOpen} onOpenChange={(o)=>setSidebarOpen(o)}>
      <div className={`grid h-screen w-full ${sidebarOpen ? 'grid-cols-[250px_1fr]' : 'sm:grid-cols-[1px_1fr] grid-cols-[250px_1fr]'} bg-[#e4e4e4] text-[#003644] dark:text-gray-50 dark:bg-[#091e24]`}>
        {/* Sidebar Wrapper */}
        <SideBarWrapper className="bg-gray-800 text-white" sidebarOpen={sidebarOpen} />

        {/* Main content area */}
        <main className=" overflow-y-auto py-3 px-2 rounded-sm sm:w-auto w-screen">

        {/* header */}
          <div className="flex w-full h-16 px-3 items-center justify-between shadow-lg mb-6 ">
            <div className="flex items-center space-x-4">
                
            <SidebarTrigger />

              
              <h1 className="text-xl font-bold">My App    </h1>

            </div>
              <button
              onClick={switchMode}
              >{isDarkMode?<SunIcon />:<MoonIcon/>}</button>
          </div>

          {/* This will render the child components inside the main area */}
        <Outlet />

        <ChatPopup />
        </main>
      </div>
    </SidebarProvider>
  );
}
