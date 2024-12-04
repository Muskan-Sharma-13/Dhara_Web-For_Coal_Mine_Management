import React from 'react';
import { AccountCircleOutlined as ProfileIcon } from '@mui/icons-material';

function ProfileSection() {
  // This would typically come from an authentication context
  const mineName = "John Miner"; 

  return (
    <div className="p-4 bg-dark-green flex items-center space-x-3">
      <ProfileIcon className="text-3xl text-mine-green" />
      <div>
        <p className="font-bold text-white">{mineName}</p>
        <p className="text-xs text-gray-300">Coal Mine Professional</p>
      </div>
    </div>
  );
}

export default ProfileSection;