// import React from 'react'
// import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"
// import { SidebarTrigger } from '@/components/ui/sidebar'
 
// import {
//   Sidebar,
//   SidebarContent,
//   SidebarGroup,
//   SidebarGroupContent,
//   SidebarGroupLabel,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
// } from "@/components/ui/sidebar"
 
// // Menu items.
// const items = [
//   {
//     title: "Home",
//     url: "/home",
//     icon: Home,
//   },
//   {
//     title: "Inbox",
//     url: "#",
//     icon: Inbox,
//   },
//   {
//     title: "view all collection",
//     url: "/view-public",
//     icon: Inbox,
//   },
//   {
//     title: "Search",
//     url: "#",
//     icon: Search,
//   },
//   {
//     title: "Settings",
//     url: "/IndividualCollection",
//     icon: Settings,
//   },
// ]
// function SideBarWrapper({sidebarOpen}) {
//   return (
//     <Sidebar className={` ${sidebarOpen?"w-64":"w-0 border-none "}`} collapsible="icon">
//     <SidebarContent>
//       <SidebarGroup>
//         <SidebarGroupLabel>Application</SidebarGroupLabel>
//         <SidebarGroupContent>
//           <SidebarMenu>
//             {items.map((item) => (
//               <SidebarMenuItem key={item.title}>
//                 <SidebarMenuButton asChild>
//                   <a href={item.url}>
//                     <item.icon />
//                     <span>{item.title}</span>
//                   </a>
//                 </SidebarMenuButton>
//               </SidebarMenuItem>
//             ))}
//           </SidebarMenu>
//         </SidebarGroupContent>
//       </SidebarGroup>
//     </SidebarContent>
//   </Sidebar>
//   )
// }

// export default SideBarWrapper

import React from 'react';
import { Calendar, Home, Inbox, Search, Settings, LogOut } from 'lucide-react'; // Added LogOut icon
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useCookies } from 'react-cookie'; // Added to handle logout
import { useNavigate } from 'react-router-dom'; // Added for navigation

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

// Menu items.
const items = [
  {
    title: 'Home',
    url: '/home',
    icon: Home,
  },
  {
    title: 'Inbox',
    url: '#',
    icon: Inbox,
  },
  {
    title: 'View All Collections',
    url: '/view-public',
    icon: Inbox,
  },
  {
    title: 'Search',
    url: '#',
    icon: Search,
  },
  {
    title: 'Settings',
    url: '/IndividualCollection',
    icon: Settings,
  },
];

function SideBarWrapper({ sidebarOpen }) {
  const [cookies, removeCookie] = useCookies(['userDetails']); // Access cookies
  const navigate = useNavigate(); // For navigation

  // Logout function
  const handleLogout = () => {
    removeCookie('userDetails'); // Remove userDetails cookie
    navigate('/login'); // Redirect to login page
  };

  return (
    <Sidebar className={`${sidebarOpen ? 'w-64' : 'w-0 border-none'}`} collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              {/* Logout Button */}
              <SidebarMenuItem>
                <SidebarMenuButton onClick={handleLogout}>
                  <LogOut />
                  <span>Logout</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

export default SideBarWrapper;