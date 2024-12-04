import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import cloudyImage from '../assets/cloudy.png';
import sunImage from '../assets/sun.png';
import windImage from '../assets/wind.png';
import rainImage from '../assets/rain.png';
import worker from '../assets/worker.png';


const cloudyIcon = cloudyImage;
const sunIcon = sunImage;
const windIcon = windImage;
const rainIcon = rainImage;

const GlassCard = ({ children }) => {
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border-x-2 border-green-700 shadow-lg">
      {children}
    </div>
  );
};
const Alert = ({ severity, children }) => {
  const colorClasses = {
    warning: 'bg-yellow-100 text-yellow-800 border-yellow-500',
    error: 'bg-red-100 text-red-800 border-red-500',
    success: 'bg-green-100 text-green-800 border-green-500',
    info: 'bg-blue-100 text-blue-800 border-blue-500',
  };

  return (
    <div className={`p-4 border-l-4 w-1/2 rounded-md ${colorClasses[severity] || ''} animate-pulse`}>
      {children}
    </div>
  );
};

const AlertTitle = ({ children }) => (
  <h3 className="text-lg font-semibold mb-1">{children}</h3>
);

const AlertDescription = ({ children }) => (
  <p className="text-sm">{children}</p>
);

const WeatherBot = () => {
  // useEffect(() => {
  //   // Disable scrolling when this page is rendered
  //   document.body.style.overflow = 'hidden';
  // },
  //   []);

    
  const [weatherData, setWeatherData] = useState(null);
  const [weatherAlert, setWeatherAlert] = useState(null);
//backend wala part
  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get('/api/weather');
        setWeatherData(response.data);

        // Check for weather alerts
        if (response.data.alerts) {
          setWeatherAlert(response.data.alerts[0]);
        } else {
          setWeatherAlert(null);
        }
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeatherData();
  }, []);

  const WeatherIcon = ({ type }) => {
    switch (type) {
      case 'cloudy':
        return <img src={cloudyIcon} alt="Cloudy" className="w-auto h-auto mb-10" />;
      case 'sun':
        return <img src={sunIcon} alt="Sun" className="w-auto h-44" />;
      case 'wind':
        return <img src={windIcon} alt="Wind" className="w-auto h-44" />;
      case 'rain':
        return <img src={rainIcon} alt="Snow" className="w-auto h-44" />;
      default:
        return null;
    }
  };

  const temperatureData = [
    { name: 'Mon', temperature: 18 },
    { name: 'Tue', temperature: 20 },
    { name: 'Wed', temperature: 22 },
    { name: 'Thu', temperature: 19 },
    { name: 'Fri', temperature: 21 },
    { name: 'Sat', temperature: 23 },
    { name: 'Sun', temperature: 20 },
  ];

  const aqiData = [
    { name: 'Mon', aqi: 55 },
    { name: 'Tue', aqi: 60 },
    { name: 'Wed', aqi: 50 },
    { name: 'Thu', aqi: 70 },
    { name: 'Fri', aqi: 65 },
    { name: 'Sat', aqi: 80 },
    { name: 'Sun', aqi: 75 },
  ];

  
  return (
    <div className="h-screen bg-gray-900 bg-gradient-to-br from-gray-900 to-green-800 text-white p-8 overflow-hidden">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* <div className="bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 flex flex-col items-center justify-center  border-x-2 border-green-700"> */}
        <GlassCard>
          <div className="bg-gray-700/80 backdrop-blur-lg rounded-2xl p-4 w-full">
            <div className="flex items-center justify-center">
              <WeatherIcon  type={weatherData?.currentCondition || 'cloudy'} />
              <h2 className="text-4xl font-bold absolute bottom-0 ">{weatherData?.temperature || '25'}°C</h2>

            </div>
           
          </div>
          <div className="mt-1 w-full">
          <p className="text-gray-400 mt-1 text-center">{weatherData?.description || 'Cloudy with chances of rain'}</p>
            <h2 className="text-2xl font-bold mb-2 text-center">Safety Recommendations</h2>
            <ul className="space-y-2 justify-center text-center">
              <li>• Check for proper ventilation and air quality</li>
              <li>• Ensure all electrical equipment is functioning correctly</li>
              <li>• Monitor ground stability and roof conditions</li>
              <li>• Provide adequate lighting for all work areas</li>
            </ul>
          </div>
          </GlassCard>
        {/* </div> */}
         {/* Graph Section */}
         <div className="bg-gray-800/80 backdrop-blur-lg rounded-2xl pr-9 pt-14 space-y-14  border-x-2 border-green-700">
          {/* Temperature Graph */}
          <ResponsiveContainer width="100%" height={150}>
            <LineChart data={temperatureData}>
              <XAxis dataKey="name" stroke="#9CA3AF" />
              <YAxis type="number" domain={[0, 'dataMax']} stroke="#9CA3AF" />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="temperature" stroke="#FCD34D" />
            </LineChart>
          </ResponsiveContainer>

          {/* AQI Graph */}
          <ResponsiveContainer width="100%" height={150}>
            <LineChart data={aqiData}>
              <XAxis dataKey="name" stroke="#9CA3AF" />
              <YAxis type="number" domain={[0, 'dataMax']} stroke="#9CA3AF" />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="aqi" stroke="#10B981" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* {weatherAlert && (
        <div className=" bottom-0 right-0 m-8 z-10 ">
          <Alert severity="warning" className="mb-8">
            {/* <AlertTitle>{weatherAlert.event}</AlertTitle> 
            <AlertTitle>Weather Alert</AlertTitle>
            {/* <AlertDescription>{weatherAlert.description}</AlertDescription> 
            <AlertDescription>Severe thunderstorms expected in your area. Stay indoors</AlertDescription>
          </Alert>
        </div>
      )} */}
<div className="mt-6 flex justify-center items-center">
  <Alert severity="error">
    <AlertTitle>Weather Alert</AlertTitle>
    <AlertDescription>
    Current weather conditions are severe with high winds, low temperatures, and high humidity. Suspend all non-essential outdoor operations and ensure workers are in a safe, sheltered environment.
    </AlertDescription>
  </Alert>
</div>

      <div className="absolute bottom-0 right-0 ">
        <img src={worker} alt="Worker" className="h-96 w-auto" />
      </div>
    </div>
  );
};

export default WeatherBot;