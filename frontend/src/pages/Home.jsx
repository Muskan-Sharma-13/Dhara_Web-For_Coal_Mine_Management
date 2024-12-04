import React from 'react';

function Home() {
  const overviewData = {
    totalMines: 26,
    activeUsers: 142,
    openWorkOrders: 18,
    pendingInspections: 8
  };

  const recentActivity = [
    { id: 1, action: 'New mine onboarded', timestamp: '2023-04-15 10:23 AM' },
    { id: 2, action: 'Safety checklist completed', timestamp: '2023-04-14 3:45 PM' },
    { id: 3, action: 'Equipment maintenance request', timestamp: '2023-04-13 9:12 AM' },
    { id: 4, action: 'Shift log updated', timestamp: '2023-04-12 6:30 PM' }
  ];

  return (
    <div className="p-8 text-[#c3c3c3]">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-[#1b1b1b] shadow-md rounded-md p-6">
          <h2 className="text-xl font-bold mb-4">Overview</h2>
          <div className="space-y-4">
            <div>
              <span className="font-medium">Total Mines:</span> {overviewData.totalMines}
            </div>
            <div>
              <span className="font-medium">Active Users:</span> {overviewData.activeUsers}
            </div>
            <div>
              <span className="font-medium">Open Work Orders:</span> {overviewData.openWorkOrders}
            </div>
            <div>
              <span className="font-medium">Pending Inspections:</span> {overviewData.pendingInspections}
            </div>
          </div>
        </div>
        <div className="bg-[#1b1b1b] shadow-md rounded-md p-6">
          <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
          <ul className="space-y-4">
            {recentActivity.map((activity) => (
              <li key={activity.id}>
                <div className="font-medium">{activity.action}</div>
                <div className="text-sm text-gray-400">{activity.timestamp}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Home;