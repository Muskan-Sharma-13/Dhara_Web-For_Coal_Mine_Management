import React, { useState,useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home as HomeIcon, 
  Group as UsersIcon, 
  Notifications as NotificationIcon, 
  Task as TaskIcon,
  CloudOutlined as WeatherIcon,
  AccountCircle as ProfileIcon,
  Event as EventIcon,
} from '@mui/icons-material';
import ScheduleOutlinedIcon from '@mui/icons-material/ScheduleOutlined';
import SummarizeIcon from '@mui/icons-material/Summarize';
import { CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';
import axios from 'axios';

// Sidebar Navigation
const sidebarNavigation = [
  { to: '/app', icon: <HomeIcon />, label: 'Home' },
  { to: '/app/users-teams', icon: <UsersIcon />, label: 'Users & Teams' },
  { to: '/app/notifications', icon: <NotificationIcon />, label: 'Notifications' },
  { to: '/app/daily-tasks', icon: <TaskIcon />, label: 'Daily Tasks' },
  { to: '/app/weather-bot', icon: <WeatherIcon />, label: 'Weather Bot' },
  { to: '/app/calendar', icon: <EventIcon />, label: 'Calender' },
  { to: '/app/scheduler', icon: <ScheduleOutlinedIcon />, label: 'Scheduler' },
  { to: '/app/summary', icon: <SummarizeIcon />, label: 'Log Summary' },
  { to: '/app/Iot', icon: <SummarizeIcon />, label: 'Iot' },
  
];

const Sidebar = ({ isCollapsed }) => {
  const location = useLocation();
  const [syncStatus, setSyncStatus] = useState({
    lastSync: null,
    status: 'idle',
    pendingRecords: 0,
    errorMessage: null
  });

  const [overviewData, setOverviewData] = useState({
    name: "User"
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://localhost:3000/home/sidebar');
        // console.log('Response from backend:', response.data);
        setOverviewData((prev) => ({
          ...prev,
          name: response.data.name || "User",
        }));
      } catch (error) {
        console.error('Error fetching data from backend:', error);
      }
    };

    fetchData();
  }, []); 

  const [isLoading, setIsLoading] = useState(false);
  const [showSyncTooltip, setShowSyncTooltip] = useState(false); // State for showing the tooltip

  const handleManualSync = async () => {
    setIsLoading(true);
    try {
      // Simulated sync operation
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSyncStatus(prev => ({
        ...prev,
        lastSync: new Date().toISOString(),
        status: 'success',
        pendingRecords: 0
      }));
    } catch (error) {
      setSyncStatus(prev => ({
        ...prev,
        status: 'error',
        errorMessage: error.message
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const SidebarLink = ({ to, icon, label }) => (
    <Link
      to={to}
      className={`flex items-center p-3 text-gray-300 hover:bg-gray-800 transition-all duration-200 ease-out
        ${location.pathname === to ? 'bg-slate-900 text-green-700/70' : ''}`}
    >
      {icon && <span className={`${isCollapsed ? 'mx-auto' : 'mr-3'}`}>{icon}</span>}
      {!isCollapsed && <span>{label}</span>}
    </Link>
  );

  return (
    <div className={`fixed top-0 left-0 bottom-0 bg-black/95 flex flex-col border-r border-gray-800 transition-all duration-300 ease-in-out ${isCollapsed ? 'w-16' : 'w-48'}`}>
      <div className="sticky top-0 bg-black/95 p-4 text-center border-b border-gray-800 z-10">
        <h1 className={`text-green-700 font-bold transition-all duration-300 ease-in-out ${isCollapsed ? 'text-2xl' : 'text-2xl'}`}>
          {isCollapsed ? 'D' : 'DHARA'}
        </h1>
      </div>

      <nav className="flex-grow overflow-y-auto no-scrollbar py-2 space-y-1">
        {sidebarNavigation.map((item) => (
          <SidebarLink key={item.to} to={item.to} icon={item.icon} label={item.label} />
        ))}
      </nav>

      {/* ERP Integration Status Tooltip above Profile */}
      <div 
        className="relative py-4 flex items-center justify-center space-x-2"
        onMouseEnter={() => setShowSyncTooltip(true)} 
        onMouseLeave={() => setShowSyncTooltip(false)}
      >
        <span 
          className="text-gray-300 cursor-pointer flex items-center space-x-2"
        >
          <RefreshCw className={`h-6 w-6 ${isLoading ? 'animate-spin' : ''}`} onClick={handleManualSync} />
          {!isCollapsed && (
            <div className="flex gap-2">
              <span className="text-sm font-semibold">ERP Sync</span>
              {syncStatus.status === 'success' ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <AlertCircle className="h-5 w-5 text-yellow-500" />
              )}
            </div>
          )}
        </span>
        
        {/* Tooltip/Dialog Box showing Sync Status */}
        {showSyncTooltip && (
          <div className="absolute top-2 border-x-2 border-green-800 left-40 transform-translate-x-1/2 p-3 bg-slate-800/80 text-white text-sm rounded-lg shadow-lg w-48 text-center">
            <span>
              {syncStatus.lastSync
                ? `Last synced: ${new Date(syncStatus.lastSync).toLocaleString()}`
                : 'Not synced yet'}
            </span>
            {syncStatus.pendingRecords > 0 && (
              <div className="mt-2 text-yellow-600">
                {syncStatus.pendingRecords} records pending synchronization
              </div>
            )}
            {syncStatus.errorMessage && (
              <div className="mt-2 text-red-600">
                {syncStatus.errorMessage}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Profile Section */}
      <div className="sticky bottom-0 bg-green-900/50 p-4 flex items-center justify-center space-x-2">
        <ProfileIcon className="text-green-500" />
        {!isCollapsed && (
          <div>
            <p className="text-white font-semibold">{overviewData.name}</p>
            <p className="text-xs text-gray-400">Mine Manager</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;