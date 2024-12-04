import React from 'react';

function DailyTasks() {
  const shiftLogs = [
    { id: 1, date: '2023-04-15', nextShiftUser: 'Jane Smith', startTime: '7:00 AM', endTime: '3:00 PM', hoursWorked: 8, remarks: 'Completed all scheduled tasks' },
    { id: 2, date: '2023-04-14', nextShiftUser: 'Bob Johnson', startTime: '3:00 PM', endTime: '11:00 PM', hoursWorked: 8, remarks: 'Encountered minor equipment issue' },
    { id: 3, date: '2023-04-13', nextShiftUser: 'Alice Williams', startTime: '11:00 PM', endTime: '7:00 AM', hoursWorked: 8, remarks: 'No issues to report' },
    { id: 4, date: '2023-04-12', nextShiftUser: 'John Doe', startTime: '7:00 AM', endTime: '3:00 PM', hoursWorked: 8, remarks: 'Completed safety inspection' }
  ];

  const safetyChecklists = [
    { id: 1, created: '2023-04-15', passedItems: 11, totalItems: 12, status: 'Passed' },
    { id: 2, created: '2023-04-14', passedItems: 10, totalItems: 12, status: 'Passed' },
    { id: 3, created: '2023-04-13', passedItems: 9, totalItems: 12, status: 'Failed' },
    { id: 4, created: '2023-04-12', passedItems: 12, totalItems: 12, status: 'Passed' }
  ];

  const workOrders = [
    { id: 1, title: 'Equipment Maintenance', status: 'In Progress', assignedTo: 'Alice Williams' },
    { id: 2, title: 'Safety Inspection', status: 'Pending', assignedTo: 'Bob Johnson' },
    { id: 3, title: 'Electrical Upgrade', status: 'Completed', assignedTo: 'John Doe' },
    { id: 4, title: 'Ventilation System Check', status: 'In Progress', assignedTo: 'Jane Smith' }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'Completed': return 'text-green-500';
      case 'In Progress': return 'text-yellow-500';
      case 'Pending': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="p-8 text-[#c3c3c3]">
      <h1 className="text-2xl font-bold mb-6">Daily Tasks</h1>
      <div className="bg-[#1b1b1b] shadow-md rounded-md p-6">
        <h2 className="text-xl font-bold mb-4">Shift Logs</h2>
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left p-2">Date</th>
              <th className="text-left p-2">Next Shift User</th>
              <th className="text-left p-2">Start - End Time</th>
              <th className="text-left p-2">Hours Worked</th>
              <th className="text-left p-2">Remarks</th>
            </tr>
          </thead>
          <tbody>
            {shiftLogs.map((log) => (
              <tr key={log.id}>
                <td className="p-2">{log.date}</td>
                <td className="p-2">{log.nextShiftUser}</td>
                <td className="p-2">{log.startTime} - {log.endTime}</td>
                <td className="p-2">{log.hoursWorked}</td>
                <td className="p-2">{log.remarks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="bg-[#1b1b1b] shadow-md rounded-md p-6 mt-6">
        <h2 className="text-xl font-bold mb-4">Safety Checklists</h2>
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left p-2">Created</th>
              <th className="text-left p-2">Passed/Total</th>
              <th className="text-left p-2">Status</th>
              <th className="text-left p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {safetyChecklists.map((checklist) => (
              <tr key={checklist.id}>
                <td className="p-2">{checklist.created}</td>
                <td className="p-2">{checklist.passedItems}/{checklist.totalItems}</td>
                <td className="p-2">{checklist.status}</td>
                <td className="p-2">
                  <button className="bg-[#3c763d] hover:bg-[#4d8c4e] text-white px-2 py-1 rounded-md mr-2">
                    View
                  </button>
                  <button className="bg-[#c72222] hover:bg-[#d63333] text-white px-2 py-1 rounded-md">
                    Download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="bg-[#1b1b1b] shadow-md rounded-md p-6 mt-6">
        <h2 className="text-xl font-bold mb-4">Work Orders</h2>
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left p-2">Title</th>
              <th className="text-left p-2">Status</th>
              <th className="text-left p-2">Assigned To</th>
              <th className="text-left p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {workOrders.map((order) => (
              <tr key={order.id}>
                <td className="p-2">{order.title}</td>
                <td className={`p-2 ${getStatusColor(order.status)}`}>{order.status}</td>
                <td className="p-2">{order.assignedTo}</td>
                <td className="p-2">
                  <button className="bg-[#286090] hover:bg-[#3b7baa] text-white px-2 py-1 rounded-md mr-2">
                    Details
                  </button>
                  <button className="bg-[#31b0c3] hover:bg-[#4dc7dc] text-white px-2 py-1 rounded-md">
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          
        </table>
      </div>
    </div>
  );
}

export default DailyTasks;