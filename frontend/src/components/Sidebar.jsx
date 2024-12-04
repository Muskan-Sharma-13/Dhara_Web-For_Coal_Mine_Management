

import React from 'react';
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
const sidebarNavigation = [
  { to: '/app', icon: <HomeIcon />, label: 'Home' },
  { to: '/app/users-teams', icon: <UsersIcon />, label: 'Users & Teams' },
  { to: '/app/notifications', icon: <NotificationIcon />, label: 'Notifications' },
  { to: '/app/daily-tasks', icon: <TaskIcon />, label: 'Daily Tasks' },
  { to: '/app/weather-bot', icon: <WeatherIcon />, label: 'Weather Bot' },
  { to: '/app/calendar', icon: <EventIcon />, label: 'Calender' },
  { to: '/app/scheduler', icon: <ScheduleOutlinedIcon  />, label: 'Scheduler' },
  { to: '/app/summary', icon: <ScheduleOutlinedIcon  />, label: 'Log Summary' },
];

const Sidebar = ({ isCollapsed }) => {
  const location = useLocation();

  const SidebarLink = ({ to, icon, label }) => (
    <Link
      to={to}
      className={`
        flex items-center p-3 text-gray-300 hover:bg-gray-800 transition-all duration-200 ease-out
        ${location.pathname === to ? 'bg-slate-900 text-green-700/70' : ''}
      `}
    >
      {icon && <span className={`${isCollapsed ? 'mx-auto' : 'mr-3'}`}>{icon}</span>}
      {!isCollapsed && <span>{label}</span>}
    </Link>
  );

  return (
    <div className={`
      fixed top-0 left-0 bottom-0 bg-black/95 
      flex flex-col border-r border-gray-800 
      transition-all duration-300 ease-in-out
      ${isCollapsed ? 'w-16' : 'w-48'}
    `}>
      <div className="sticky top-0 bg-black/95 p-4 text-center border-b border-gray-800 z-10">
        <h1 className={`
          text-green-700 font-bold transition-all duration-300 ease-in-out
          ${isCollapsed ? 'text-2xl' : 'text-2xl'}
        `}>
          {isCollapsed ? 'D' : 'DHARA'}
        </h1>
      </div>

      <nav className="flex-grow overflow-y-auto no-scrollbar py-2 space-y-1">
        {sidebarNavigation.map((item) => (
          <SidebarLink key={item.to} to={item.to} icon={item.icon} label={item.label} />
        ))}
      </nav>

      <div className={`
        sticky bottom-0 bg-green-900/50 p-4 
        flex items-center justify-center space-x-2
      `}>
        <ProfileIcon className="text-green-500" />
        {!isCollapsed && (
          <div>
            <p className="text-white font-semibold">John Miner</p>
            <p className="text-xs text-gray-400">Mine Professional</p>
          </div>
        )}
      </div>
    </div>
  );
};
export default Sidebar;