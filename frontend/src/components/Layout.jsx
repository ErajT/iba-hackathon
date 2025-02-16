import React, { useContext, useEffect, useState } from 'react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'; // Import the SidebarProvider if needed
import SideBarWrapper from './SideBarWrapper';
import { MoonIcon, SunIcon, User, BookOpen } from 'lucide-react'; // Added BookOpen icon
import { ThemeContext } from '@/context/ThemeContext';
import { Outlet } from 'react-router-dom';
import { ChatPopup } from '@/Pages/Chatbot/ChatPopup';
import { useCookies } from 'react-cookie'; // Added to access cookies

export function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { isDarkMode, switchMode } = useContext(ThemeContext);
  const [cookies] = useCookies(['userDetails']); // Access userDetails from cookies
  const [userName, setUserName] = useState('');

  useEffect(() => {
    console.log(sidebarOpen);
  }, [sidebarOpen]);

  // Extract user name from cookies
  useEffect(() => {
    if (cookies.userDetails) {
      // No need to parse, as userDetails is already an object
      const userDetails = cookies.userDetails;
      setUserName(userDetails.user?.Name || 'User'); // Fallback to 'User' if name is not available
    }
  }, [cookies.userDetails]);

  return (
    <SidebarProvider open={sidebarOpen} onOpenChange={(o) => setSidebarOpen(o)}>
      <div
        className={`grid h-screen w-full ${
          sidebarOpen ? 'grid-cols-[250px_1fr]' : 'sm:grid-cols-[1px_1fr] grid-cols-[250px_1fr]'
        } bg-[#e4e4e4] text-[#003644] dark:text-gray-50 dark:bg-[#091e24]`}
      >
        {/* Sidebar Wrapper */}
        <SideBarWrapper className="bg-gray-800 text-white" sidebarOpen={sidebarOpen} />

        {/* Main content area */}
        <main className="overflow-y-auto py-3 px-2 rounded-sm sm:w-auto w-screen">
          {/* Header */}
          <div className="flex w-full h-16 px-3 items-center justify-between shadow-lg mb-6">
            <div className="flex items-center space-x-4">
              <SidebarTrigger />
              {/* Updated Header with BookOpen Icon and LearnFlow Text */}
              <div className="flex items-center gap-2">
                <BookOpen className="h-8 w-8 text-[#003644] dark:text-gray-50" /> {/* BookOpen Icon */}
                <h1 className="text-xl font-bold">LearnFlow</h1> {/* LearnFlow Text */}
              </div>
            </div>

            {/* Profile Icon and User Name */}
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-2">
                <User className="h-6 w-6" /> {/* Profile Icon */}
                <span className="text-lg font-medium">{userName}</span> {/* User Name */}
              </div>
              <button onClick={switchMode}>{isDarkMode ? <SunIcon /> : <MoonIcon />}</button>
            </div>
          </div>

          {/* This will render the child components inside the main area */}
          <Outlet />

          <ChatPopup />
        </main>
      </div>
    </SidebarProvider>
  );
}