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
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment-timezone';


const SchedulerPage = () => {
  const [users, setUsers] = useState([]);
  // const [teams, setTeams] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: '',
    allottedTo: '',
    allottedToId: null,
    priority: 'medium',
    description: '',
    endDate: '',
    endTime: '00:00',
  });

  // Simulate fetching users with shift incharge role
  useEffect(() => {
    const findUsers = async () => {
      try {
        const response = await axios.post('http://localhost:3000/scheduler');
        //console.log('Response from backend:', response.data);
        setUsers(response.data.incharges || []); 
      } catch (error) {
        console.error('Error fetching data from backend:', error);
      }
    };
  
    findUsers();
  }, []);


const addTask = async () => {
    // Validation
    if (!newTask.title || !newTask.allottedTo) {
      alert('Please fill in all required fields');
      return;
    }

    if (!newTask.endDate || !newTask.endTime) {
      alert('Please select both an end date and time');
      return;
    }

    // Combine date and time in IST as a moment object
    let endDateTimeIST = moment.tz(
      `${newTask.endDate}T${newTask.endTime}`,
      "Asia/Kolkata"
    );

    // Validate time: Check if end time is in the past
    if (endDateTimeIST.isBefore(moment())) {
      alert('End time must be after the current time');
      console.log('Current Time:', moment().toISOString());
      console.log('End Time:', endDateTimeIST.toISOString());
      return;
    }

    endDateTimeIST = moment.tz(
      `${moment(newTask.endDate).format('YYYY-MM-DD')}T${newTask.endTime}`,
      "Asia/Kolkata"
    ).toISOString();
    
  
    try {
      const taskToAdd = {
        ...newTask,
        // startTime: startDateTime, // Store as Date object
        // endTime: endDateTime, // Store as Date object
        end:endDateTimeIST,
        status: 'Pending',
        //createdAt, // MongoDB will automatically store it as Date
      };
      
      console.log(taskToAdd); // Debugging: Check the format of the task
  
      // Send POST request with task data
      const response = await axios.post('http://localhost:3000/scheduler/addTask', taskToAdd);
  
      if (response.status === 200) {
        // Successfully added task
        console.log('Task added successfully');
  
        // Update tasks state with the new task
        //setTasks((prevTasks) => [...prevTasks, response.data]);
        setOrders((prevOrders) => [...prevOrders, response.data]);
        //setOrders([...orders, response.data]);
  
        // Reset form
        setNewTask({
          title: '',
          allottedTo: '',
          allottedToId: null,
          priority: 'medium',
          description: '',
          endDate: '',
          endTime: '00:00',
        });
      } else {
        alert('Failed to add task. Please try again.');
      }
    } catch (error) {
      console.error('Error sending task data:', error);
      alert('Error sending task data. Please try again later.');
    }
  };

  const [orders, setOrders] = useState([]);
    useEffect(() => {
    const findworkOrders = async () => {
      try {
        const response = await axios.post('http://localhost:3000/scheduler/getTask');
        console.log('Response from backend:', response.data);
        setOrders(response.data.modifiedWorkOrders || []); 
      } catch (error) {
        console.error('Error fetching data from backend:', error);
      }
    };
  
    findworkOrders();
  }, []);

  

  const handleShiftInchargeChange = (e) => {
    // Get the selected name from the dropdown
    const selectedName = e.target.value;
  
    // Find the corresponding user object
    const selectedUser = users.find(
      (user) => `${user.name}` === selectedName
      // (user) => `${user.name} - ${user.department}` === selectedName
    );
  
    // Update the state with the selected user's name and ID
    if (selectedUser) {
      setNewTask((prev) => ({
        ...prev,
        allottedTo: `${selectedUser.name}`, // Set the name as the selected shift incharge
        allottedToId: selectedUser._id, // Set the corresponding ID for the shift incharge
      }));
    }
  };

  
  

  return (
    <div className="flex flex-col h-screen bg-gradient-to-r from-gray-900 to-black-800 text-white overflow-auto relative">
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
          Task Allotted To
        </label>
        <SelectField
          label="Select receipent of Task"
          name="allottedTo"
          value={newTask.allottedTo}
          onChange={handleShiftInchargeChange}
          options={users.map((user) => `${user.name}`)}
        />
      </div>


              {/* Time and Priority Inputs */}
      <div className="grid grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          End Date
        </label>
        <DatePicker
          selected={newTask.endDate ? new Date(newTask.endDate) : null} // Ensure the selected value is a proper Date object
          onChange={(date) =>
            setNewTask({
              ...newTask,
              endDate: new Date(date.getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Add one day to the selected date
            })
          }
          dateFormat="yyyy-MM-dd"
          className="w-full bg-gray-700 text-white border-gray-900 rounded-md px-3 py-2"
          placeholderText="Select End Date"
        />
      </div>
        <div>
          <label className="flex flex-col text-sm font-medium text-gray-300 mb-2">
            End Time
          </label>
          <TimePicker
            onChange={(value) => 
              setNewTask({ 
                ...newTask, 
                endTime: value || '00:00' 
              })
            }
            value={newTask.endTime || '00:00'}

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
        {orders.length > 0 && (
          <div className="mt-10 bg-gray-800/50 blur-60  border-x-2 border-green-800  rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-4 text-white flex items-center">
              <Check className="mr-2 text-green-500" /> Scheduled Tasks
            </h3>
            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order._id}
                  className="bg-gray-700/50 rounded-lg p-4 flex justify-between items-center hover:bg-gray-700/70 transition-all duration-300"
                >
                  <div>
                    <div className="font-medium text-white">{order.title}</div>
                    <div className="text-sm text-gray-400">
                      Allotted to: {order.allottedTo? order.allottedTo:'None'} | Due {order.end}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{order.description}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold 
                      ${
                        order.priority === "high"
                          ? "bg-red-600/20 text-red-400"
                          : order.priority === "medium"
                          ? "bg-yellow-600/20 text-yellow-400"
                          : "bg-green-600/20 text-green-400"
                      }`}
                    >
                      {order.priority ? order.priority.toUpperCase() : "N/A"}
                    </span>
                    <div className="flex items-center space-x-1 text-gray-300">
                      <Clock className="w-4 h-4 mr-2" />
                      {/* <span className="text-xs">{order.createdAt}</span> */}
                      <span
                      className={`px-3 py-1 rounded-full text-xs font-bold 
                      ${
                        order.status === "Past Due"
                          ? "bg-red-600/20 text-red-400"
                          : order.status === "Completed"
                          ? "bg-blue-600/20 text-blue-400"
                          : order.status ==='In Progress'
                          ? "bg-green-600/20 text-green-400"
                          : "bg-yellow-600/20 text-yellow-400"
                      }`}
                    >
                      {order.status ? order.status.toUpperCase() : "N/A"}
                    </span>
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