import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  BarChart2, 
  Settings, 
  Users, 
  Truck, 
  Menu, 
  X 
} from 'lucide-react';

const Dashboard = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const SidebarItem = ({ icon: Icon, label, active }) => (
    <div className={`flex items-center p-3 rounded-lg cursor-pointer ${
      active 
        ? 'bg-green-900/30 text-green-400' 
        : 'text-gray-400 hover:bg-green-900/20 hover:text-white'
    }`}>
      <Icon className="mr-3 w-5 h-5" />
      <span className="text-sm font-medium">{label}</span>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-black text-gray-300">
      {/* Mobile Sidebar Toggle */}
      <button 
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-4 left-4 z-50 md:hidden"
      >
        {isSidebarOpen ? <X className="text-white" /> : <Menu className="text-white" />}
      </button>

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-gray-900/80 backdrop-blur-lg 
        transform transition-transform duration-300
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        md:relative md:translate-x-0
      `}>
        <div className="p-6 border-b border-green-900/30">
          <h2 className="text-2xl font-bold text-white">Mine Dashboard</h2>
        </div>
        <nav className="p-4 space-y-2">
          <SidebarItem icon={LayoutDashboard} label="Overview" active />
          <SidebarItem icon={BarChart2} label="Analytics" />
          <SidebarItem icon={Users} label="Personnel" />
          <SidebarItem icon={Truck} label="Equipment" />
          <SidebarItem icon={Settings} label="Settings" />
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-black/95 md:ml-64 p-8">
        {children}
      </div>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;