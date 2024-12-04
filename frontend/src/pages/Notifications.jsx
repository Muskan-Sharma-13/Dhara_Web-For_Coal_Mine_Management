import React, { useState } from 'react';
import { 
  NotificationsActive, 
  CheckCircle, 
  Warning, 
  Error, 
  Info, 
  MarkEmailRead, 
  Delete 
} from '@mui/icons-material';
import { Button, IconButton, Tooltip } from '@mui/material';

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Safety Inspection Reminder",
      description: "Upcoming safety inspection on Site B next week",
      type: "warning",
      timestamp: "2 hours ago",
      read: false
    },
    {
      id: 2,
      title: "Equipment Maintenance Completed",
      description: "Drill rig #3 has been serviced and is ready for operation",
      type: "success",
      timestamp: "Yesterday",
      read: false
    },
    {
      id: 3,
      title: "Inventory Alert",
      description: "Low stock on safety helmets. Reorder required.",
      type: "error",
      timestamp: "3 days ago",
      read: true
    },
    {
      id: 4,
      title: "Quarterly Report",
      description: "Q4 report draft is now available for review",
      type: "info",
      timestamp: "5 days ago",
      read: false
    }
  ]);

  const getNotificationIcon = (type) => {
    switch(type) {
      case 'success': return <CheckCircle className="text-green-500" />;
      case 'warning': return <Warning className="text-yellow-500" />;
      case 'error': return <Error className="text-red-500" />;
      case 'info': return <Info className="text-blue-500" />;
      default: return <NotificationsActive className="text-gray-500" />;
    }
  };

  const handleMarkAllRead = () => {
    setNotifications(notifications.map(n => ({...n, read: true})));
  };

  const handleDeleteNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  return (
    <div className="bg-gray-900 min-h-screen flex">
      {/* Green Glows */}
      <div className="absolute bottom-20 left-60 w-40 h-56 rounded-full bg-green-800 opacity-75 blur-3xl z-10"></div>
      <div className="absolute top-10 right-16 w-40 h-40 rounded-full bg-green-700/80 opacity-81 blur-3xl"></div>

      <div className="flex-1 bg-lime-800/10 p-6 min-h-screen">
        <div className="bg-gray-800/50 blur-40 rounded-lg p-6 border-x-2 border-green-800 mt-12">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl text-white font-semibold flex items-center">
                <NotificationsActive className="mr-3" /> 
                Stay updated with your mine operations
              </h1>
              <p className="text-gray-400"></p>
            </div>
            <div className="space-x-3">
              <Button 
                variant="contained" 
                startIcon={<MarkEmailRead />}
                onClick={handleMarkAllRead}
                style={{ backgroundColor: "#10b981" }}
              >
                Mark All Read
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            {notifications.map((notification) => (
              <div 
                key={notification.id}
                className={`
                  glassmorphic-notification 
                  p-4 rounded-lg 
                  flex items-center 
                  ${notification.read ? 'opacity-60' : 'bg-gray-800/50'}
                  hover:bg-gray-700/50 
                  transition-all duration-300
                `}
              >
                <div className="mr-4">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="flex-grow">
                  <h3 className="text-white font-semibold">{notification.title}</h3>
                  <p className="text-gray-400 text-sm">{notification.description}</p>
                  <span className="text-gray-500 text-xs">{notification.timestamp}</span>
                </div>
                <div className="ml-auto flex space-x-2">
                  <Tooltip title="Mark as Read">
                    <IconButton 
                      size="small" 
                      onClick={() => {
                        const updatedNotifications = notifications.map(n => 
                          n.id === notification.id ? {...n, read: true} : n
                        );
                        setNotifications(updatedNotifications);
                      }}
                    >
                      <MarkEmailRead className="text-gray-400 hover:text-green-500" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete Notification">
                    <IconButton 
                      size="small" 
                      onClick={() => handleDeleteNotification(notification.id)}
                    >
                      <Delete className="text-gray-400 hover:text-red-500" />
                    </IconButton>
                  </Tooltip>
                </div>
              </div>
            ))}
          </div>

          {notifications.length === 0 && (
            <div className="text-center py-12">
              <NotificationsActive className="text-6xl text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">No new notifications</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;