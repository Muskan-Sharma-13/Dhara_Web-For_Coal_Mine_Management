import React, { useState } from 'react';
// import { getDatabase,ref,set} from "firebase/database";
// import { app } from "./firebase";

import { 
  BrowserRouter as Router, 
  Route, 
  Routes, 
  Navigate, 
  Outlet ,
  useLocation,
} from 'react-router-dom';
import { 
  Menu as MenuIcon, 
  ChevronRight as ChevronRightIcon ,
  ChevronLeft as ChevronLeftIcon
} from '@mui/icons-material';

// Import all necessary components
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MineLandingPage from './pages/LandingPage';
import MineOnboarding from './pages/MineOnboarding';
import JoinMine from './pages/JoinMine';
import axios from 'axios';

// Dashboard Related Imports
import Home from './pages/Home';
import UsersTeams from './pages/UsersTeams';
import Notifications from './pages/Notifications';
import DailyTasks from './pages/DailyTasks';
import WeatherBot from './pages/WeatherBot';
import CalenderPage from './pages/CalenderPage';
import PermissionsPage from './pages/PermissionPage';
import SchedulerPage from './pages/SchedulerPage';
import LogSummarizer from './pages/LogSummry';
import Iot from './pages/Iot';

// const db=getDatabase(app);

// const putData=()=>{
//   set(ref(db,"users/muskan"),{
//     id:1,
//     name:"Muskan",
//     age: 20,
//   });
// };

function handleSubmit() {
  const formData =
    {
      id:3,
      name:"Muskan Sharma",
      age:34,
    };
    axios.post('http://localhost:3000/api', formData)
        .then((response) => {
            console.log('Response from backend:', response.data);
        })
        .catch((error) => {
            console.error('Error sending data to backend:', error);
        });
}

function OnboardMineWrapper() {
  // Call handleSubmit with sample data (modify as needed)
  // const formData = { user: 'exampleUser', action: 'onboard' };
  handleSubmit();
  // putData();

  // Render the target component
  return <MineOnboarding />;
}


function MainLayout() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const location = useLocation();  // Get current route

  const getCurrentSection = () => {
    // Map URL paths to section names
    const path = location.pathname;
    if (path.includes('users-teams')) return 'Users & Teams';
    if (path.includes('notifications')) return 'Notifications';
    if (path.includes('daily-tasks')) return 'Daily Tasks';
    if (path.includes('weather-bot')) return 'Weather Bot';
    if (path.includes('calender')) return 'Calender';
    if (path.includes('schedular')) return 'Schedular';
    if (path.includes('summary')) return 'Log Summary';
    if (path.includes('Iot')) return 'Iot';
    return 'Home';  // Default to Home
  };
const toggleSidebar = () => {
  setIsSidebarCollapsed(!isSidebarCollapsed);
};

return (
  <div className="flex min-h-screen bg-[#121212] text-white overflow-auto ">
    <div 
      className={`
        fixed left-0 top-0 bottom-0 z-40 
        transition-all duration-400 ease-in-out
        ${isSidebarCollapsed ? 'w-16' : 'w-48'}
      `}
    >
      <Sidebar isCollapsed={isSidebarCollapsed} />

      <button
        onClick={toggleSidebar}
        className="absolute top-4 right-0 transform translate-x-1/2 
          bg-green-700 text-black p-2 rounded-full shadow-lg z-50 
          hover:bg-green-600 transition-all duration-300 ease-out"
      >
        {isSidebarCollapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
      </button>
    </div>

    <div 
      className={`
        flex-1 flex flex-col transition-all duration-400 ease-in-out
        ${isSidebarCollapsed ? 'ml-16' : 'ml-48'}
      `}
    >
       <Header currentSection={getCurrentSection()} />
      <main className="flex-grow  overflow-y-auto">
        <Outlet />
      </main>
    </div>
  </div>
);
}
function App() {
  return (
    <Router>
      <Routes>

       

       {/* Landing Page - First Entry Point */}
       <Route path="/" element={<MineLandingPage />} /> 
        
        {/* Onboarding Routes */}
        <Route path="/onboard-mine" element={<OnboardMineWrapper />} />
        <Route path="/join-mine" element={<JoinMine />} />
        
        {/* Main Application Layout with Nested Routes */}
        <Route path="/app" element={<MainLayout />}>
          {/* Default Home Page */}
          <Route index element={<Home />} />
          
          {/* Dashboard Routes */}
          <Route path="users-teams" element={<UsersTeams />} />
          <Route path="permissions/:roleName" element={<PermissionsPage />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="daily-tasks" element={<DailyTasks />} />
          <Route path="weather-bot" element={<WeatherBot />} />
          <Route path="calendar" element={<CalenderPage />} />
          <Route path="scheduler" element={<SchedulerPage />} />
          <Route path="summary" element={<LogSummarizer />} />
          <Route path="Iot" element={<Iot />} />
        </Route>
        
        {/* Catch-all Route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;



//og
// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Header from './components/Header';
// import Sidebar from './components/Sidebar';
// import Home from './pages/Home';
// import UsersTeams from './pages/UsersTeams';
// import Notifications from './pages/Notifications';
// import DailyTasks from './pages/DailyTasks';
// // import Equipment from './pages/Equipment';
// // import Projects from './pages/Projects';
// import MineOnboarding from './pages/MineOnboarding';
// import JoinMine from './pages/JoinMine';
// import PermissionsPage from './pages/PermissionPage';
// import WeatherBot from './pages/WeatherBot';
// function App() {
//   return (
//     <Router>
//       <div className="flex min-h-screen">
//         <Sidebar />
//         <div className="flex-1 bg-[#121212]">
//           <Header />
//           <Routes>
//             <Route path="/" element={<Home/>} />
//             <Route path="/users-teams" element={<UsersTeams/>} />
//             <Route path="/permissions/:roleName" element={<PermissionsPage />} />
//             <Route path="/notifications" element={<Notifications/>} />
//             <Route path="/daily-tasks" element={<DailyTasks/>} />
//             <Route path="/weather-bot" element={<WeatherBot/>} />
//             {/* <Route path="/equipment" component={Equipment} />
//             <Route path="/projects" component={Projects} /> */}
//             <Route path="/onboard-mine" element={<MineOnboarding/>} />
//             <Route path="/join-mine" element={<JoinMine/>} />
//           </Routes>
//         </div>
//       </div>
//     </Router>
//   );
// }
// export default App;