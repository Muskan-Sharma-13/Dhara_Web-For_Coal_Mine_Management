import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

// Example permissions data for roles
const rolePermissions = {
  Owner: [
    'Access all user data',
    'Manage settings',
    'Full control over teams and roles',
    'Edit roles',
    'Add Users',
    'Overlook Mine'

  ],
  Admin: [
    'Manage users',
    'Edit settings',
    'Limited team and role control',
  ],
  'Mine Manager': [
    'Oversee mine operations',
    'Generate reports',
    'View team performance',
    'Log Summary Access'
  ],
  'Shift Incharge': ['Manage shifts', 'Supervise team', 'Limited report access', 'Safety Checklist'],
};

const PermissionsPage = () => {
  const { roleName } = useParams(); // Use role name from the URL
  const navigate = useNavigate();

  const permissions = rolePermissions[roleName] || [];

  return (
    <div className="flex flex-col h-full bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-900/80 p-6 flex justify-between items-center border-b border-gray-800">
        <button
          className="text-gray-400 hover:text-white flex items-center gap-2"
          onClick={() => navigate(-1)} // Navigate back to roles
        >
          <FaArrowLeft size={20} />
          <span>Back</span>
        </button>
        <h2 className="text-xl font-semibold">{roleName} Permissions</h2>
      </div>

      {/* Permissions List */}
      <div className="flex-1 bg-gray-900/95 p-6">
        <h3 className="text-lg font-semibold text-gray-300 mb-4">
          Permissions for <span className="text-green-400">{roleName}</span>
        </h3>

        {permissions.length > 0 ? (
          <ul className="bg-gray-800/50 rounded-lg shadow-md p-4 divide-y divide-gray-700">
            {permissions.map((permission, index) => (
              <li
                key={index}
                className="py-3 px-2 hover:bg-gray-700/50 rounded-md transition"
              >
                {permission}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400">No permissions found for this role.</p>
        )}
      </div>
    </div>
  );
};

export default PermissionsPage;
