import React, { useState } from 'react';
import { TextField, IconButton, Button, Checkbox, CircularProgress, MenuItem, Select } from '@mui/material';
import { FilterList, Download, Menu } from '@mui/icons-material';

const LogSummary = () => {
  const [logs, setLogs] = useState([
    { id: 1, name: 'File A', shiftInCharge: 'John Doe', date: '2024-12-01', shiftType: 'Day Shift' },
    { id: 2, name: 'File B', shiftInCharge: 'Jane Smith', date: '2024-12-02', shiftType: 'Night Shift' },
    { id: 3, name: 'File C', shiftInCharge: 'Emily Davis', date: '2024-12-03', shiftType: 'Day Shift' },
    { id: 4, name: 'File d', shiftInCharge: ' hi ken ', date: '2023-11-05', shiftType: 'Night Shift' },
    { id: 5, name: 'File E', shiftInCharge: 'hi barbie ', date: '2024-11-03', shiftType: 'Day Shift' },
    { id: 6, name: 'File f', shiftInCharge: 'hermoine granger', date: '2024-11-29', shiftType: 'Night Shift' },
    { id: 7, name: 'File g', shiftInCharge: 'ross geller', date: '2023-12-03', shiftType: 'Day Shift' },
    { id: 8, name: 'File h', shiftInCharge: 'harry potter', date: '2024-12-02', shiftType: 'Night Shift' },
    { id: 9, name: 'File i', shiftInCharge: 'chandler bing', date: '2024-12-03', shiftType: 'Day Shift' },
  ]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
  const [shiftInChargeFilter, setShiftInChargeFilter] = useState('');
  const [dayFilter, setDayFilter] = useState('');

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSelectFile = (id) => {
    setSelectedFiles((prev) => {
      if (prev.includes(id)) {
        return prev.filter((fileId) => fileId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleGenerateSummary = () => {
    setIsGeneratingSummary(true);
    setTimeout(() => {
      setIsGeneratingSummary(false);
      alert('Summary generated successfully! Redirecting...');
    }, 3000);
  };

  const handleShiftInChargeFilter = (e) => {
    setShiftInChargeFilter(e.target.value);
  };

  const handleDayFilter = (e) => {
    setDayFilter(e.target.value);
  };

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.shiftInCharge.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesShiftInCharge =
      !shiftInChargeFilter || log.shiftInCharge === shiftInChargeFilter;

    const matchesDayFilter = (() => {
      if (!dayFilter) return true;
      const logDate = new Date(log.date);
      const today = new Date();

      switch (dayFilter) {
        case 'Today':
          return logDate.toDateString() === today.toDateString();
        case 'Yesterday':
          const yesterday = new Date();
          yesterday.setDate(today.getDate() - 1);
          return logDate.toDateString() === yesterday.toDateString();
        case 'Last 7 Days':
          const last7Days = new Date();
          last7Days.setDate(today.getDate() - 7);
          return logDate >= last7Days;
        case 'Last 30 Days':
          const last30Days = new Date();
          last30Days.setDate(today.getDate() - 30);
          return logDate >= last30Days;
        case 'Last Year':
          return logDate.getFullYear() === today.getFullYear() - 1;
        default:
          return true;
      }
    })();

    return matchesSearch && matchesShiftInCharge && matchesDayFilter;
  });

  return (
    <div className="min-h-screen bg-gray-900 bg-gradient-to-r from-gray-900 to-black text-white p-8 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute bottom-5 left-60 w-40 h-56 rounded-full bg-green-700 opacity-75 blur-3xl z-10"></div>
      <div className="absolute top-10 right-16 w-40 h-40 rounded-full bg-green-500/80 opacity-81 blur-3xl"></div>

      {/* Content */}
      <div className="relative ">
        {/* Welcome Message */}
        <h1 className="text-center text-3xl font-bold mb-6">Welcome to Log Summary</h1>

        {/* Search Bar with Glassmorphism */}
        <div className="flex justify-center mb-4 ">
          <TextField
            variant="outlined"
            placeholder="Search by file name or shift in charge"
            className="w-full md:w-1/2 bg-gray-700  backdrop-blur-lg text-white rounded-3xl border-x-2 border-green-800 py-5"
            style={{
                height: '45px',
                outline:'none',
              }}
            onChange={handleSearch}
          />
        </div>

        {/* Filters and Buttons with Glassmorphism */}
        <div className="flex justify-center space-x-6 mb-6">
          <div className="  flex bg-gray-700 border-x-1 border-green-800 items-center justify-center  rounded-lg mt-4 border-x-2 border-green-800 h-10">
            <Select
              value={dayFilter}
              onChange={handleDayFilter}
              displayEmpty
              className="bg-transparent text-white "
              style={{
                height: '35px',
                fontSize: '14px',  
                border: 'none',
                outline:'none',
              }}
            >
              <MenuItem value="">Filter by Day</MenuItem>
              <MenuItem value="Today">Today</MenuItem>
              <MenuItem value="Yesterday">Yesterday</MenuItem>
              <MenuItem value="Last 7 Days">Last 7 Days</MenuItem>
              <MenuItem value="Last 30 Days">Last 30 Days</MenuItem>
              <MenuItem value="Last Year">Last Year</MenuItem>
            </Select>
          </div>

          <div className=" flex bg-gray-700 border-x-1 border-green-800 items-center justify-center  rounded-lg border-x-2 border-green-800 h-10 mt-4">
            <Select
              value={shiftInChargeFilter}
              onChange={handleShiftInChargeFilter}
              displayEmpty
              className=" flex bg-gray-700 border-x-1 border-green-800 items-center justify-center  rounded-lg  h-10"
              style={{
                height: '35px',
                fontSize: '14px',  
                border: 'none',
                outline:'none',
              }}
            >
              <MenuItem value="">Filter by Shift In Charge</MenuItem>
              {[...new Set(logs.map((log) => log.shiftInCharge))].map((name) => (
                <MenuItem key={name} value={name}>{name}</MenuItem>
              ))}
            </Select>
          </div>
        

        {/* Summary Buttons */}
        <div className="flex justify-center space-x-4 my-4">
          <Button
            variant="outlined"
            color="primary"
            onClick={() => alert('Displaying Weekly Summary...')}
            className="bg-opacity-50 backdrop-blur-lg rounded-lg"
          >
            Weekly Summary
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => alert('Displaying Monthly Summary...')}
            className="bg-opacity-50 backdrop-blur-lg rounded-lg"
          >
            Monthly Summary
          </Button>
        </div>
        </div>

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Log Summary</h2>
          <div className="flex space-x-4">
            <Button
              variant="contained"
              color="primary"
              onClick={handleGenerateSummary}
              disabled={selectedFiles.length === 0 || isGeneratingSummary}
            >
              {isGeneratingSummary ? <CircularProgress size={20} /> : 'Generate Summary'}
            </Button>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<Download />}
              disabled={selectedFiles.length === 0}
            >
              Download Selected
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-gray-800 rounded-lg p-4 overflow-x-auto border-x-2 border-green-800">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="py-2 px-4">Select</th>
                <th className="py-2 px-4">Name of File</th>
                <th className="py-2 px-4">Shift In Charge</th>
                <th className="py-2 px-4">Date</th>
                <th className="py-2 px-4">Shift Type</th>
                <th className="py-2 px-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.length > 0 ? (
                filteredLogs.map((log) => (
                  <tr
                    key={log.id}
                    className={`border-b border-gray-700 cursor-pointer ${
                      selectedFiles.includes(log.id) ? 'bg-green-700/50' : 'hover:bg-gray-700'
                    }`}
                    onClick={() => handleSelectFile(log.id)}
                    onDoubleClick={() => alert(`Opening ${log.name}...`)}
                  >
                    <td className="py-2 px-4">
                      <Checkbox
                        checked={selectedFiles.includes(log.id)}
                        style={{ color: 'white' }}
                      />
                    </td>
                    <td className="py-2 px-4">{log.name}</td>
                    <td className="py-2 px-4">{log.shiftInCharge}</td>
                    <td className="py-2 px-4">{log.date}</td>
                    <td className="py-2 px-4">{log.shiftType}</td>
                    <td className="py-2 px-4">
                      <IconButton onClick={() => alert(`Action on ${log.name}`)}>
                        <Menu style={{ color: 'white' }} />
                      </IconButton>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-4">
                    No logs found for the selected filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LogSummary;

