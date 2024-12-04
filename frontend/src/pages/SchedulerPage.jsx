import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Clock, 
  Users, 
  Clipboard, 
  Save, 
  PlusCircle, 
  Check, 
  AlertTriangle 
} from 'lucide-react';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import {SelectField } from '../components/InputFields';

// Simulated user data - In a real app, this would come from an API or context
const mockUsers = [
  { 
    id: 1, 
    name: 'John Smith', 
    role: 'Shift Incharge', 
    department: 'Morning Shift' 
  },
  { 
    id: 2, 
    name: 'Sarah Williams', 
    role: 'Shift Incharge', 
    department: 'Extraction Team' 
  },
  { 
    id: 3, 
    name: 'Mike Rodriguez', 
    role: 'Shift Incharge', 
    department: 'Night Shift' 
  },
  { 
    id: 4, 
    name: 'Emily Chen', 
    role: 'Shift Incharge', 
    department: 'Safety Monitoring' 
  }
];

const SchedulerPage = () => {
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: '',
    shiftIncharge: '',
    shiftInchargeId: null,
    priority: 'medium',
    description: '',
    startTime: '00:00',
    endTime: '00:00',
  });

  // Simulate fetching users with shift incharge role
  useEffect(() => {
    // In a real application, this would be an API call
    const shiftInchargeUsers = mockUsers.filter(
      user => user.role === 'Shift Incharge'
    );
    setUsers(shiftInchargeUsers);
  }, []);

  const addTask = () => {
    // Validation
    if (!newTask.title || !newTask.shiftIncharge) {
      alert('Please fill in all required fields');
      return;
    }

    // Validate time
    if (newTask.startTime >= newTask.endTime) {
      alert('End time must be after start time');
      return;
    }

    const taskToAdd = {
      ...newTask,
      id: Date.now(),
      status: 'Pending',
      createdAt: new Date().toLocaleString()
    };

    setTasks([...tasks, taskToAdd]);

    // Reset form
    setNewTask({
      title: '',
      shiftIncharge: '',
      shiftInchargeId: null,
      priority: 'medium',
      description: '',
      startTime: '00:00',
      endTime: '00:00',
    });
  };

  const handleShiftInchargeChange = (e) => {
    const selectedUser = users.find(
      user => user.name === e.target.value
    );
    
    setNewTask(prev => ({
      ...prev,
      shiftIncharge: e.target.value,
      shiftInchargeId: selectedUser ? selectedUser.id : null
    }));
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-r from-gray-900 to-black-800 text-white overflow-hidden relative">
      {/* Gradient Blurred Backgrounds */}
      <div className="absolute bottom-32 left-36 w-40 h-56 rounded-full bg-green-800 opacity-75 blur-3xl z-10"></div>
      <div className="absolute top-7 z-21 right-16 w-40 h-40 rounded-full bg-green-700 opacity-81 blur-3xl"></div>

      {/* Main Container */}
      <div className="container mx-auto px-4 py-8 relative z-20">
        {/* Main Content Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Task Input Section */}
          <div className="bg-gray-800/50 blur-60  border-x-2 border-green-800  p-6 rounded-xl space-y-6">
            <div className="space-y-4">
             {/* Task Title Input */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center">
          <PlusCircle className="mr-2 h-4 w-4 text-green-500" />
          Task Title
        </label>
        <input
          type="text"
          value={newTask.title}
          onChange={(e) =>
            setNewTask({ ...newTask, title: e.target.value })
          }
          placeholder="Enter task title"
          className="w-full bg-gray-700 border-none text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 transition-all duration-300"
        />
      </div>

              {/* Shift Incharge Dropdown (replaced with custom SelectField) */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center">
          <Users className="mr-2 h-4 w-4 text-green-500" />
          Shift Incharge
        </label>
        <SelectField
          label="Select Shift Incharge"
          name="shiftIncharge"
          value={newTask.shiftIncharge}
          onChange={handleShiftInchargeChange}
          options={users.map((user) => `${user.name} - ${user.department}`)}
        />
      </div>

              {/* Time and Priority Inputs */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Start Time
          </label>
          <TimePicker
            onChange={(value) => 
              setNewTask({ 
                ...newTask, 
                startTime: value || '00:00' 
              })
            }
            value={newTask.startTime}
            className="w-auto bg-gray-700 border-gray-900 flex justify-between rounded-md"
            disableClock={true}
            clearIcon={null}
          />
        </div>
        <div>
          <label className="flex flex-col text-sm font-medium text-gray-300 mb-2">
            End Time:
          </label>
          <TimePicker
            onChange={(value) => 
              setNewTask({ 
                ...newTask, 
                endTime: value || '00:00' 
              })
            }
            value={newTask.endTime}
            className="w-auto bg-gray-700 border-gray-900 flex justify-between rounded-md"
            disableClock={true}
            clearIcon={null}
          />
        </div>
      </div>


              {/* Priority Selector */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Priority
                </label>
                <select
                  value={newTask.priority}
                  onChange={(e) =>
                    setNewTask({ ...newTask, priority: e.target.value })
                  }
                  className="w-full bg-gray-700 border-none text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 transition-all duration-300"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>
          </div>

          {/* Description and Submit Section */}
          <div className="bg-gray-800/50 blur-60  border-x-2 border-green-800  p-6 rounded-xl flex flex-col">
            <div className="flex-grow">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Task Description
              </label>
              <textarea
                value={newTask.description}
                onChange={(e) =>
                  setNewTask({ ...newTask, description: e.target.value })
                }
                placeholder="Enter detailed task description"
                rows={8}
                className="w-full bg-gray-700 border-none text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 transition-all duration-300"
              />
            </div>
            <button
              onClick={addTask}
              className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg flex items-center justify-center space-x-2 transition-all duration-300 transform hover:scale-105"
            >
              <Save className="mr-2 h-5 w-5" />
              Schedule Task
            </button>
          </div>
        </div>

        {/* Scheduled Tasks Section */}
        {tasks.length > 0 && (
          <div className="mt-10 bg-gray-800/50 blur-60  border-x-2 border-green-800  rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-4 text-white flex items-center">
              <Check className="mr-2 text-green-500" /> Scheduled Tasks
            </h3>
            <div className="space-y-4">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="bg-gray-700/50 rounded-lg p-4 flex justify-between items-center hover:bg-gray-700/70 transition-all duration-300"
                >
                  <div>
                    <div className="font-medium text-white">{task.title}</div>
                    <div className="text-sm text-gray-400">
                      {task.shiftIncharge} | {task.startTime} - {task.endTime}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{task.description}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold 
                      ${
                        task.priority === "high"
                          ? "bg-red-600/20 text-red-400"
                          : task.priority === "medium"
                          ? "bg-yellow-600/20 text-yellow-400"
                          : "bg-green-600/20 text-green-400"
                      }`}
                    >
                      {task.priority.toUpperCase()}
                    </span>
                    <div className="flex items-center space-x-1 text-gray-300">
                      <Clock className="w-4 h-4" />
                      <span className="text-xs">{task.createdAt}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SchedulerPage;