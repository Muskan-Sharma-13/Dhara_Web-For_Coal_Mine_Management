import React, { useState } from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import { ChevronRight as ChevronRightIcon, ChevronLeft as ChevronLeftIcon } from '@mui/icons-material';
import Sidebar from './components/Sidebar';
import Header from './components/Header';

const sectionNames = {
  '/app': 'Dashboard',
  '/app/users-teams': 'Users & Teams',
  '/app/notifications': 'Notifications',
  '/app/daily-tasks': 'Daily Tasks',
  '/app/weather-bot': 'Weather Bot',
};

function MainLayout() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const currentSection = sectionNames[location.pathname] || 'Dashboard';

  return (
    <div className="flex min-h-screen bg-[#121212] text-white">
      {/* Sidebar */}
      <div 
        className={`
          fixed left-0 top-0 bottom-0 z-40 
          transition-all duration-400 ease-in-out
          ${isSidebarCollapsed ? 'w-16' : 'w-48'}
        `}
      >
        <Sidebar isCollapsed={isSidebarCollapsed} />

        {/* Sidebar Toggle Button */}
        <button
          onClick={toggleSidebar}
          className="absolute top-4 right-0 transform translate-x-1/2 
            bg-green-500 text-black p-2 rounded-full shadow-lg z-50 
            hover:bg-green-600 transition-all duration-300 ease-out"
        >
          {isSidebarCollapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </button>
      </div>

      {/* Main Content */}
      <div 
        className={`
          flex-1 flex flex-col transition-all duration-400 ease-in-out
          ${isSidebarCollapsed ? 'ml-16' : 'ml-48'}
        `}
      >
        {/* Header with Section Name */}
        <Header selectedSection={currentSection} />

        <main className="flex-grow p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default MainLayout;
