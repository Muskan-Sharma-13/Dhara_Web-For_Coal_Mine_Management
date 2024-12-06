import React, { useState,useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Modal, TextField, Button, Chip, MenuItem, Select } from "@mui/material";
import { NotificationsNone, CalendarToday } from "@mui/icons-material";
import CalenderImg from "../assets/calender.png";
import taskdone from "../assets/taskdone.gif";
import axios from "axios";

const CalendarApp = () => {
    const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date());
  // Dummy data
  const dummyEvents = [
    // {
    //   title: "Safety Inspection",
    //   start: "2024-12-05",
    //   end: "2024-12-06",
    //   type: "Maintenance",
    //   priority: "high",
    //   description: "Check all the workers wear the safety kit",
    //   completed: false,
    // },
    // {
    //   title: "Equipment Maintenance",
    //   start: "2024-12-10",
    //   type: "Maintenance",
    //   priority: "medium",
    //   description: "Perform routine maintenance on all equipment",
    //   completed: false,
    // },
    // {
    //   title: "Team Meeting",
    //   start: "2024-12-15",
    //   end: "2024-12-15",
    //   type: "Meeting",
    //   priority: "low",
    //   description: "Discuss quarterly goals and action items",
    //   completed: true,
    // },
    // {
    //   title: "Quarterly Review",
    //   start: "2024-12-20",
    //   end: "2024-12-20",
    //   type: "Meeting",
    //   priority: "high",
    //   description: "Review company performance for the quarter",
    //   completed: false,
    // },
  ];
  const handleViewNotifications = () => {
    navigate('/app/notifications'); // Navigate to the notifications page when the button is clicked
};
  const storedEvents =
    JSON.parse(localStorage.getItem("events")) || dummyEvents;
  const [events, setEvents] = useState(storedEvents);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());

  const handleDateClick = (info) => {
    setSelectedEvent({
      start: info.dateStr,
      end: info.dateStr,
      type: "",
      priority: "",
      description: "",
      completed: false,
    });
    setIsModalOpen(true);
  };
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateEvent = () => {
    setSelectedEvent({
      title: "",
      start: "",
      end: "",
      type: "",
      priority: "",
      description: "",
      completed: false,
    });
    setIsModalOpen(true);
  };

  const handleSaveEvent = () => {
    if (selectedEvent?.title) {
      const newEvent = { ...selectedEvent };
      setEvents([...events, newEvent]);
      localStorage.setItem("events", JSON.stringify([...events, newEvent]));
    }
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  const handleEditEvent = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

const handleDeleteEvent = () => {
    if (selectedEvent) {
      const updatedEvents = events.filter((e) => e.id !== selectedEvent.id);
      setEvents(updatedEvents);
      localStorage.setItem("events", JSON.stringify(updatedEvents));
      setIsModalOpen(false);
      setSelectedEvent(null);
    }
  };
  const handleMarkAsDone = (event) => {
    setEvents(events.map((e) => (e === event ? { ...e, completed: true } : e)));
    localStorage.setItem(
      "events",
      JSON.stringify(
        events.map((e) => (e === event ? { ...e, completed: true } : e))
      )
    );
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const filteredEvents = events.filter((event) => {
    const today = new Date();
    const eventDate = new Date(event.start);
    return eventDate.getMonth() === currentMonth;
  });


const [tasks, setTasks] = useState([]);

useEffect(() => {
  const pendingEvents = async () => {
    try {
      const response = await axios.post('http://localhost:3000/task');
      console.log('Response from backend:', response.data);
      setTasks(response.data.tasks || []); 
    } catch (error) {
      console.error('Error fetching data from backend:', error);
    }
  };

  pendingEvents();
}, []);


  const getPriorityColorClass = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-400";
      case "medium":
        return "bg-orange-400";
      case "low":
        return "bg-blue-400";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen flex">
      {/* Green Glows */}
      <div className="absolute bottom-20 left-60 w-40 h-56 rounded-full bg-green-800 opacity-75 blur-3xl z-10"></div>
      <div className="absolute top-10 right-16 w-40 h-40 rounded-full bg-green-500/80 opacity-81 blur-3xl"></div>

      {/* Sidebar */}
      <div className="flex-1 bg-lime-800/10 p-6 min-h-screen">
        {/* top part */}
        <div className="flex space-x-4 mb-6">
          {/* Left Header Div */}
          <div className="bg-gray-800/50 blur-60  border-x-2 border-green-800 pl-3 rounded-lg flex justify-between items-center w-2/3">
            <div className="flex-1  pr-4  w-auto">
              <h1 className="text-3xl text-white font-semibold">
                Mine Manager Calendar
              </h1>
              <h2 className="text-gray-200 mb-3">
                Plan and manage our tasks efficiently.
              </h2>
              <p className="text-gray-400">View Your Notifications here</p>
              <Button
                variant="contained"
                color="primary"
                size="small"
                style={{
                  backgroundColor: "#10b981",
                  marginTop: "10px",
                  marginLeft: "5px",
                }}
                onClick={handleViewNotifications}
              >
                View
              </Button>
            </div>
            <img
              src={CalenderImg}
              alt="Mining"
              className="w-[45%] h-auto object-contain"
            />
          </div>
          {/* Right Calendar Preview Div */}
          <div className="bg-gray-800/50 blur-60  border-x-2 border-green-800  p-4 rounded-lg w-1/2 pending task">
            <div className="flex items-center mb-4">
              <CalendarToday className="text-white mr-2" />
              <h2 className="text-xl text-white font-semibold">
                Pending Tasks
              </h2>
            </div>
            {tasks.length > 0 ? (
              <div className="notifications-list space-y-2">
                {tasks.map((task,index) => (
                  <div
                    key={index}
                    className="notification p-2 rounded-lg bg-gray-800 text-white flex items-center justify-between"
                  >
                    <div>
                      <h3 className="text-lg font-medium">{task.title}</h3>
                      <p className="text-gray-400">{task.type}</p>
                      <p className="text-gray-400">{task.description}</p>
                    </div>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      style={{ backgroundColor: "#10b981" }}
                      onClick={() => handleEventClick(event)}
                    >
                      View
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex justify-center items-center">
                <img
                  src={taskdone}
                  alt="No pending tasks"
                  className="w-48 h-48"
                />
              </div>
            )}
          </div>
        </div>

        <div className="bg-gray-700/50 blur-60  border-x-2 border-green-800  p-4 rounded-lg flex">
          <div className="calendar-container flex-1">
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              editable
              selectable
              date={selectedDate}
              events={filteredEvents}
              dateClick={handleDateClick}
              eventClick={handleEventClick}
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay",
              }}
              height="80vh"
              eventContent={(info) => (
                <div
                  className={`event-item p-2 rounded-lg ${
                    info.event.extendedProps.completed
                      ? "line-through"
                      : `${getPriorityColorClass(info.event.extendedProps.priority)}`
                  }`}
                >
                  <h3 className="text-white font-medium">{info.event.title}</h3>
                  <p className="text-white text-sm">
                    {info.event.extendedProps.type} |{" "}
                    {info.event.extendedProps.completed ? "Completed" : "Pending"}
                  </p>
                </div>
              )}
            />
          </div>
        </div>

        {isModalOpen && (
          <Modal open={true} onClose={() => setIsModalOpen(false)}>
            <div className="glassmorphic-modal w-1/3 mx-auto mt-20 p-6 rounded-lg">
              <h2 className="text-lg font-bold text-white mb-4">
                {selectedEvent?.title ? "Edit Event" : "Create Event"}
              </h2>
              <TextField
                label="Event Title"
                className="text-lg font-bold text-white mb-4"
                value={selectedEvent?.title || ""}
                onChange={(e) =>
                  setSelectedEvent({ ...selectedEvent, title: e.target.value })
                }
                fullWidth
                margin="normal"
                InputLabelProps={{
                  style: { color: "#9ca3af" },
                }}
              />
              <TextField
                label="Start Date"
                type="date"
                value={selectedEvent?.start || ""}
                onChange={(e) =>
                  setSelectedEvent({ ...selectedEvent, start: e.target.value })
                }
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true, style: { color: "#9ca3af" } }}
              />
              <TextField
                label="End Date"
                type="date"
                value={selectedEvent?.end || ""}
                onChange={(e) =>
                  setSelectedEvent({ ...selectedEvent, end: e.target.value })
                }
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true, style: { color: "#9ca3af" } }}
              />
              <TextField
                label="Description"
                value={selectedEvent?.description || ""}
                onChange={(e) =>
                  setSelectedEvent({
                    ...selectedEvent,
                    description: e.target.value,
                  })
                }
                fullWidth
                margin="normal"
                className="text-white"
                InputLabelProps={{
                  style: { color: "#9ca3af" },
                }}
              />
              <Select
                label="Event Type"
                value={selectedEvent?.type || ""}
                onChange={(e) =>
                  setSelectedEvent({ ...selectedEvent, type: e.target.value })
                }
                fullWidth
                margin="normal"
                className="text-white text-lg font-bold mb-2"
                InputLabelProps={{
                  style: { color: "#9ca3af" },
                }}
              >Event Type
                <MenuItem value="Maintenance">Maintenance</MenuItem>
                <MenuItem value="Meeting">Meeting</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
              <Select
                label="Priority"
                value={selectedEvent?.priority || ""}
                onChange={(e) =>
                  setSelectedEvent({
                    ...selectedEvent,
                    priority: e.target.value,
                  })
                }
                fullWidth
                margin="normal"
                className="text-white  text-lg font-bold mb-2"
                InputLabelProps={{
                  style: { color: "#9ca3af" },
                }}
              >Priority
                <MenuItem value="high" className={`${getPriorityColorClass('high')} text-white hover:bg-slate-500`}>High</MenuItem>
                <MenuItem value="medium" className={`${getPriorityColorClass('medium')} text-white hover:bg-slate-500`}>Medium</MenuItem>
                <MenuItem value="low" className={`${getPriorityColorClass('low')} text-white hover:bg-slate-500`}>Low</MenuItem>
              </Select>
              <div className="flex justify-end space-x-4 mt-4">
                {!selectedEvent.completed && (
                  <>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleSaveEvent}
                      style={{ backgroundColor: "#10b981" }}
                    >
                      Save
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() => handleDeleteEvent(selectedEvent)}
                      style={{ borderColor: "#f87171", color: "#6b7280" }}
                    >
                      Delete
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() => handleMarkAsDone(selectedEvent)}
                      style={{ borderColor: "#2dd4bf", color: "#6b7280" }}
                    >
                      Mark as Done
                    </Button>
                  </>
                )}
                <Button
                  variant="outlined"
                  onClick={() => setIsModalOpen(false)}
                  style={{ borderColor: "#0f172a", color: "#6b7280" }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default CalendarApp;