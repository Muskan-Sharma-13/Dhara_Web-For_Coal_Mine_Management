import React from 'react';
import { SosOutlined as SOSIcon, AccountCircleOutlined as ProfileIcon } from '@mui/icons-material';


function Header({ currentSection }) {
  return (
    <header 
      className="sticky top-0 bg-black text-white flex items-center p-4 z-10 border-b border-gray-800 text-md" style={{ height: '65.5px' }} >
         {/* Current Section Name */}
      <h2 className="text-xl font-bold text-green-700 pl-7">
        {currentSection || 'Dashboard'}
      </h2>

      {/* Spacer for alignment */}
      <div className="flex-grow"></div>
      
      {/* Left Section */}
      <div className="flex items-center space-x-4">
        <SOSIcon className="text-red-500 cursor-pointer" />
        <ProfileIcon className="text-green-700 cursor-pointer" />
      </div>
    </header>
  );
}

export default Header;
