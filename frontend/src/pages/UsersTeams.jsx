import React, { useState } from 'react';
import { FaUserCircle, FaUserFriends, FaUserTag } from 'react-icons/fa';
 import { Search, Settings, Edit2, Trash2, Plus, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Info } from 'lucide-react'; // Add this icon import at the top

const UserTeams = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('users');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('All');
  const [editingUser, setEditingUser] = useState(null);
 // State for modals
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [isAddTeamModalOpen, setIsAddTeamModalOpen] = useState(false);
  const [isAddRoleModalOpen, setIsAddRoleModalOpen] = useState(false);
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  // State for form data
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    status: true
  });

  const [newTeam, setNewTeam] = useState({
    name: '',
    selectedUsers: []
  });

  const [newRole, setNewRole] = useState({
    name: '',
    authorityLevel: 50
  });


  

  // Initial state for users, teams, and roles
  const [users, setUsers] = useState([
    { id: 1, name: 'Kiran ', role: 'Owner', email: 'kiran@gmail.com', phone: '7854162158', status: true, lastLogin: '2024-03-15' },
    { id: 2, name: 'John ', role: 'Shift Incharge', email: 'john@gmail.com', phone: '7854162158', status: true, lastLogin: '2024-03-15' },
    { id: 3, name: 'Jane Smith', role: 'Mine Manager', email: 'jane.smith@company.com', phone: '987-654-3210', status: true, lastLogin: '2024-03-14' },
    { id: 4, name: 'Bob Johnson', role: 'Shift Incharge', email: 'bob.johnson@company.com', phone: '456-789-0123', status: false, lastLogin: '2024-03-13' },
    { id: 5, name: 'Alice Williams', role: 'Mine Manager', email: 'alice.williams@company.com', phone: '321-987-6543', status: true, lastLogin: '2024-03-12' },
  ]);

  const [teams, setTeams] = useState([
    { id: 1, name: 'Mine Manager 1', members: 10, shiftIncharges: 2, users: [] },
    { id: 2, name: 'Mine Manager 2', members: 12, shiftIncharges: 3, users: [] },
    { id: 3, name: 'Security Team', members: 6, shiftIncharges: 1, users: [] },
    { id: 4, name: 'HR Team', members: 4, shiftIncharges: 1, users: [] },
  ]);

  const [roles, setRoles] = useState([
    { id: 1, name: 'Owner', users: 1, lastUpdated: '2024-03-15', authorityLevel: 100 },
    { id: 2, name: 'Admin', users: 1, lastUpdated: '2024-03-15', authorityLevel: 75 },
    { id: 3, name: 'Mine Manager', users: 11, lastUpdated: '2024-03-20', authorityLevel: 60 },
    { id: 4, name: 'Shift Incharge', users: 21, lastUpdated: '2024-03-20', authorityLevel: 50 },
  ]);


   //Add User Handler
  const handleAddUser = () => {
    const newUserWithId = {
      ...newUser,
      id: users.length + 1,
      lastLogin: new Date().toISOString().split('T')[0]
    };
    
    setUsers([...users, newUserWithId]);
    setIsAddUserModalOpen(false);
    // Reset form
    setNewUser({
      name: '',
      email: '',
      phone: '',
      role: '',
      status: true
    });
  };



  // Delete User Handler
  const handleDeleteUser = (userId) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  const handleDeleteTeam = (teamId) => {
    setTeams(teams.filter(team => team.id !== teamId));
  };
  

  // Add Team Handler
  const handleAddTeam = () => {
    const shiftIncharges = newTeam.selectedUsers.filter(userId => 
      users.find(user => user.id === userId && user.role === 'Shift Incharge')
    ).length;

    const newTeamWithId = {
      id: teams.length + 1,
      name: newTeam.name,
      members: newTeam.selectedUsers.length,
      shiftIncharges: shiftIncharges,
      users: newTeam.selectedUsers
    };
    
    setTeams([...teams, newTeamWithId]);
    setIsAddTeamModalOpen(false);
    // Reset form
    setNewTeam({
      name: '',
      selectedUsers: []
    });
  };

  // Add Role Handler
  const handleAddRole = () => {
    const newRoleWithId = {
      ...newRole,
      id: roles.length + 1,
      users: 0,
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    
    setRoles([...roles, newRoleWithId]);
    setIsAddRoleModalOpen(false);
    // Reset form
    setNewRole({
      name: '',
      authorityLevel: 50
    });
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  const getRoleStyles = (role) => {
    const styles = {
      'Admin': 'bg-sky-900/80 text-sky-200',
      'Owner': 'bg-blue-900/80 text-blue-200',
      'Shift Incharge': 'bg-emerald-900/80 text-emerald-200',
      'Mine Manager': 'bg-purple-900/80 text-purple-200',
    };
    return styles[role] || 'bg-gray-900/80 text-gray-200';
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  // Edit User Handler
  const handleEditUser = () => {
    if (editingUser) {
      const updatedUsers = users.map(user => 
        user.id === editingUser.id ? { ...editingUser } : user
      );
      
      setUsers(updatedUsers);
      setIsEditUserModalOpen(false);
      setEditingUser(null);
    }
  };
  const getAddButtonText = () => {
    switch (activeTab) {
      case 'users': return 'Add User';
      case 'teams': return 'Create Team';
      case 'roles': return 'Add Role';
      default: return 'Add';
    }
  };
  const handleAddButtonClick = () => {
    switch (activeTab) {
      case 'users':
        setIsAddUserModalOpen(true);  // Open Add User Modal
        break;
      case 'teams':
        setIsAddTeamModalOpen(true);  // Open Add Team Modal
        break;
      case 'roles':
        setIsAddRoleModalOpen(true);  // Open Add Role Modal
        break;
      default:
        break;
    }
  };
  
  // Rendering the corresponding modal based on the activeTab
  const renderModal = () => {
    switch (activeTab) {
      case 'users':
        return isAddUserModalOpen && renderAddUserModal();  // Return Add User Modal if open
      case 'teams':
        return isAddTeamModalOpen && renderAddTeamModal();  // Return Add Team Modal if open
      case 'roles':
        return isAddRoleModalOpen && renderAddRoleModal();  // Return Add Role Modal if open
      default:
        return null;
    }
  };
  


  const filteredData = () => {
    const searchLower = searchTerm.toLowerCase();
    switch (activeTab) {
      case 'users':
        return users.filter(user => 
          (selectedRole === 'All' || user.role === selectedRole) &&
          (user.name.toLowerCase().includes(searchLower) || 
           user.email.toLowerCase().includes(searchLower))
        );
      case 'teams':
        return teams.filter(team => 
          team.name.toLowerCase().includes(searchLower)
        );
      case 'roles':
        return roles.filter(role => 
          role.name.toLowerCase().includes(searchLower)
        );
      default:
        return [];
    }
  };

  // Render Modals
  const renderAddUserModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Add User</h2>
          <button onClick={() => setIsAddUserModalOpen(false)}>
            <X className="text-gray-400 hover:text-white" />
          </button>
        </div>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={newUser.name}
            onChange={(e) => setNewUser({...newUser, name: e.target.value})}
            className="w-full p-2 bg-gray-700 rounded"
          />
          <input
            type="email"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({...newUser, email: e.target.value})}
            className="w-full p-2 bg-gray-700 rounded"
          />
          <input
            type="tel"
            placeholder="Phone"
            value={newUser.phone}
            onChange={(e) => setNewUser({...newUser, phone: e.target.value})}
            className="w-full p-2 bg-gray-700 rounded"
          />
          <select
            value={newUser.role}
            onChange={(e) => setNewUser({...newUser, role: e.target.value})}
            className="w-full p-2 bg-gray-700 rounded"
          >
            <option value="">Select Role</option>
            {roles.map(role => (
              <option key={role.id} value={role.name}>{role.name}</option>
            ))}
          </select>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={newUser.status}
              onChange={(e) => setNewUser({...newUser, status: e.target.checked})}
              className="mr-2"
            />
            <span>Active</span>
          </div>
          <button 
            onClick={handleAddUser}
            className="w-full bg-green-700 p-2 rounded hover:bg-green-600"
          >
            Add User
          </button>
        </div>
      </div>
    </div>
  );

  const renderAddTeamModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Create Team</h2>
          <button onClick={() => setIsAddTeamModalOpen(false)}>
            <X className="text-gray-400 hover:text-white" />
          </button>
        </div>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Team Name"
            value={newTeam.name}
            onChange={(e) => setNewTeam({...newTeam, name: e.target.value})}
            className="w-full p-2 bg-gray-700 rounded"
          />
          <div>
            <label className="block mb-2">Select Team Members</label>
            {users.map(user => (
              <div key={user.id} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id={`user-${user.id}`}
                  checked={newTeam.selectedUsers.includes(user.id)}
                  onChange={(e) => {
                    const updatedUsers = e.target.checked
                      ? [...newTeam.selectedUsers, user.id]
                      : newTeam.selectedUsers.filter(id => id !== user.id);
                    setNewTeam({...newTeam, selectedUsers: updatedUsers});
                  }}
                  className="mr-2"
                />
                <label htmlFor={`user-${user.id}`}>{user.name} - {user.role}</label>
              </div>
            ))}
          </div>
          <button 
            onClick={handleAddTeam}
            className="w-full bg-green-700 p-2 rounded hover:bg-green-600"
          >
            Create Team
          </button>
        </div>
      </div>
    </div>
  );

  const renderAddRoleModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Add Role</h2>
          <button onClick={() => setIsAddRoleModalOpen(false)}>
            <X className="text-gray-400 hover:text-white" />
          </button>
        </div>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Role Name"
            value={newRole.name}
            onChange={(e) => setNewRole({...newRole, name: e.target.value})}
            className="w-full p-2 bg-gray-700 rounded"
          />
          <div>
            <label className="block mb-2">Authority Level: {newRole.authorityLevel}%</label>
            <input
              type="range"
              min="0"
              max="100"
              value={newRole.authorityLevel}
              onChange={(e) => setNewRole({...newRole, authorityLevel: parseInt(e.target.value)})}
              className="w-full"
            />
          </div>
          <button 
            onClick={handleAddRole}
            className="w-full bg-green-700 p-2 rounded hover:bg-green-600"
          >
            Add Role
          </button>
        </div>
      </div>
    </div>
  );

  const renderEditUserModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Edit User</h2>
          <button onClick={() => setIsEditUserModalOpen(false)}>
            <X className="text-gray-400 hover:text-white" />
          </button>
        </div>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={editingUser?.name || ''}
            onChange={(e) => setEditingUser({...editingUser, name: e.target.value})}
            className="w-full p-2 bg-gray-700 rounded"
          />
          <input
            type="email"
            placeholder="Email"
            value={editingUser?.email || ''}
            onChange={(e) => setEditingUser({...editingUser, email: e.target.value})}
            className="w-full p-2 bg-gray-700 rounded"
          />
          <input
            type="tel"
            placeholder="Phone"
            value={editingUser?.phone || ''}
            onChange={(e) => setEditingUser({...editingUser, phone: e.target.value})}
            className="w-full p-2 bg-gray-700 rounded"
            />
            <select
              value={editingUser?.role || ''}
              onChange={(e) => setEditingUser({...editingUser, role: e.target.value})}
              className="w-full p-2 bg-gray-700 rounded"
            >
              <option value="">Select Role</option>
              {roles.map(role => (
                <option key={role.id} value={role.name}>{role.name}</option>
              ))}
            </select>
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={editingUser?.status || false}
                onChange={(e) => setEditingUser({...editingUser, status: e.target.checked})}
                className="mr-2"
              />
              <span>Active</span>
            </div>
            <button 
              onClick={handleEditUser}
              className="w-full bg-blue-700 p-2 rounded hover:bg-blue-600"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    );
  
  return (
    <div className="flex flex-col h-full bg-gradient-to-r from-gray-900 to-black-800  text-white">
        <div className="absolute bottom-20 left-60 w-40 h-56 rounded-full bg-green-800 opacity-75 blur-3xl z-10"></div>
      <div className="absolute top-10 right-16 w-40 h-40 rounded-full bg-green-700/50 opacity-81 blur-3xl"></div>

      {/* Header */}
      {/* Tabs*/}
      <div className=" bg-gradient-to-r from-gray-900/80 to-black-800  p-6 flex justify-between items-center border-b border-gray-800">
      <div className="flex items-center gap-2 bg-gray-800/50 rounded-lg p-1">
            <button
              className={`flex items-center px-4 py-2 rounded-md ${activeTab === 'users' ? 'bg-green-700 text-white' : 'text-gray-400 hover:bg-gray-700/50'}`}
              onClick={() => setActiveTab('users')}
            >
              <FaUserCircle className="mr-2" />
              Users
            </button>
            <button
              className={`flex items-center px-4 py-2 rounded-md ${activeTab === 'teams' ? 'bg-green-700 text-white' : 'text-gray-400 hover:bg-gray-700/50'}`}
              onClick={() => setActiveTab('teams')}
            >
              <FaUserFriends className="mr-2" />
              Teams
            </button>
            <button
              className={`flex items-center px-4 py-2 rounded-md ${activeTab === 'roles' ? 'bg-green-700 text-white' : 'text-gray-400 hover:bg-gray-700/50'}`}
              onClick={() => setActiveTab('roles')}
            >
              <FaUserTag className="mr-2" />
              Roles
            </button>
          </div>

        <button className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-md flex items-center gap-2 cursor-pointer	"
             onClick={handleAddButtonClick}>
          <Plus size={20} />
          {getAddButtonText()}
          
        </button>
          {/* Conditionally render modals */}
    {/* {renderModal()} */}
      </div>
      

      {/* Main Content */}
      <div className="flex-1  bg-gradient-to-r from-gray-900/95 to-black-800  p-6">
        {/* Search */}
        <div className="flex justify-between items-center mb-6 flex-row-reverse">
          <div className="flex items-center gap-4">
            <select
              className="bg-gray-800 text-white rounded-md px-4 py-2 border border-gray-700 focus:outline-none focus:border-green-600"
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
            >
              <option value="All">All Roles</option>
              {roles.map((role) => (
                <option key={role.id} value={role.name}>
                  {role.name}
                </option>
              ))}

            </select>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:border-green-600 text-white w-64"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          </div>
        </div>

        {/* Tables */}
        <div className="bg-gray-800/50 rounded-lg shadow-xl backdrop-blur-xl bg-opacity-10">
          {activeTab === 'users' && (
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700 text-gray-400 ">
                  <th className="px-6 py-4 text-left">Name</th>
                  <th className="px-6 py-4 text-left">Role</th>
                  <th className="px-6 py-4 text-left">Email</th>
                  <th className="px-6 py-4 text-left">Last Login</th>
                  <th className="px-6 py-4 text-left">Status</th>
                  <th className="px-6 py-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredData().map((user) => (
                  <tr key={user.id} className="border-b border-gray-700/50 hover:bg-gray-700/30">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getRoleStyles(user.role)}`}>
                          {getInitials(user.name)}
                        </div>
                        <span className="ml-3">{user.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-sm ${getRoleStyles(user.role)}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-300">{user.email}</td>
                    <td className="px-6 py-4 text-gray-300">{user.lastLogin}</td>
                    <td className="px-6 py-4">
                      <div className={`px-3 py-1 rounded-full text-sm inline-flex ${user.status ? 'bg-green-900/60 text-green-200' : 'bg-gray-900/60 text-gray-300'}`}>
                        {user.status ? 'Active' : 'Inactive'}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-3">
                        <button onClick={() => { setEditingUser(users); setIsEditUserModalOpen(true); }} className="text-gray-400 hover:text-green-400">
                          <Edit2 size={18} />
                        </button>
                        <button 
                        onClick={() => handleDeleteUser(user.id)} 
                        className="text-gray-400 hover:text-red-400">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {activeTab === 'teams' && (
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700 text-gray-400">
                  <th className="px-6 py-4 text-left">Team Name</th>
                  <th className="px-6 py-4 text-left">Members</th>
                  <th className="px-6 py-4 text-left">Shift Incharges</th>
                  <th className="px-6 py-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredData().map((team) => (
                  <tr key={team.id} className="border-b border-gray-700/50 hover:bg-gray-700/30">
                    <td className="px-6 py-4">{team.name}</td>
                    <td className="px-6 py-4">{team.members}</td>
                    <td className="px-6 py-4">{team.shiftIncharges}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-3">
                        <button onClick={() => { setEditingUser(users); setIsEditUserModalOpen(true); }} className="text-gray-400 hover:text-green-400">
                          <Edit2 size={18} />
                        </button>
                        <button onClick={() => handleDeleteTeam(team.id)} 
                        className="text-gray-400 hover:text-red-400">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}


{activeTab === 'roles' && (
  <table className="w-full">
    <thead>
      <tr className="border-b border-gray-700 text-gray-400">
        <th className="px-6 py-4 text-left">Role Name</th>
        <th className="px-6 py-4 text-left">Users</th>
        <th className="px-6 py-4 text-left">Authority Level</th>
        <th className="px-6 py-4 text-left">Last Updated</th>
        <th className="px-6 py-4 text-left">Actions</th>
      </tr>
    </thead>
    <tbody>
      {filteredData().map((role) => (
        <tr key={role.id} className="border-b border-gray-700/50 hover:bg-gray-700/30">
          <td className="px-6 py-4">{role.name}</td>
          <td className="px-6 py-4">{role.users}</td>
          <td className="px-6 py-4">
            <div className="flex items-center">
              <div className="h-2 w-24 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-600"
                  style={{ width: `${role.authorityLevel}%` }}
                />
              </div>
              <span className="ml-2 text-sm text-gray-400">{role.authorityLevel}%</span>
            </div>
          </td>
          <td className="px-6 py-4">{role.lastUpdated}</td>
          <td className="px-6 py-4">
            <button
              className="text-gray-400 hover:text-green-400"
              onClick={() => navigate(`/permissions/${role.name}`)}
              // onClick={() => {
              //   // Navigate to permissions page with the role ID
              //   // window.location.href = `/permissions/${role.id}`;
              // }}
            >
              <Info size={18} />
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
)}

        </div>
      </div>
      {isAddUserModalOpen && renderAddUserModal()}
  
  {/* Modal for Editing User */}
  {isEditUserModalOpen && renderEditUserModal()}

  {/* Modal for Adding Team */}
  {isAddTeamModalOpen && renderAddTeamModal()}

  {/* Modal for Adding Role */}
  {isAddRoleModalOpen && renderAddRoleModal()}
    </div>
  );
};

export default UserTeams;




// import React, { useState } from 'react';
// import { FaUserCircle, FaUserFriends, FaUserTag } from 'react-icons/fa';
// import { Search, Settings, Edit2, Trash2, Plus, X } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import { Info } from 'lucide-react';

// const UserTeams = () => {
//   const navigate = useNavigate();
//   const [activeTab, setActiveTab] = useState('users');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedRole, setSelectedRole] = useState('All');
  
//   // State for modals
//   const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
//   const [isAddTeamModalOpen, setIsAddTeamModalOpen] = useState(false);
//   const [isAddRoleModalOpen, setIsAddRoleModalOpen] = useState(false);
//   const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);

//   // State for form data
//   const [newUser, setNewUser] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     role: '',
//     status: true
//   });

//   const [newTeam, setNewTeam] = useState({
//     name: '',
//     selectedUsers: []
//   });

//   const [newRole, setNewRole] = useState({
//     name: '',
//     authorityLevel: 50
//   });

//   const [editingUser, setEditingUser] = useState(null);

//   // Initial state for users, teams, and roles
//   const [users, setUsers] = useState([
//     { id: 1, name: 'Kiran ', role: 'Owner', email: 'kiran@gmail.com', phone: '7854162158', status: true, lastLogin: '2024-03-15' },
//     { id: 2, name: 'John ', role: 'Shift Incharge', email: 'john@gmail.com', phone: '7854162158', status: true, lastLogin: '2024-03-15' },
//     { id: 3, name: 'Jane Smith', role: 'Mine Manager', email: 'jane.smith@company.com', phone: '987-654-3210', status: true, lastLogin: '2024-03-14' },
//     { id: 4, name: 'Bob Johnson', role: 'Shift Incharge', email: 'bob.johnson@company.com', phone: '456-789-0123', status: false, lastLogin: '2024-03-13' },
//     { id: 5, name: 'Alice Williams', role: 'Mine Manager', email: 'alice.williams@company.com', phone: '321-987-6543', status: true, lastLogin: '2024-03-12' },
//   ]);

//   const [teams, setTeams] = useState([
//     { id: 1, name: 'Mine Manager 1', members: 10, shiftIncharges: 2, users: [] },
//     { id: 2, name: 'Mine Manager 2', members: 12, shiftIncharges: 3, users: [] },
//     { id: 3, name: 'Security Team', members: 6, shiftIncharges: 1, users: [] },
//     { id: 4, name: 'HR Team', members: 4, shiftIncharges: 1, users: [] },
//   ]);

//   const [roles, setRoles] = useState([
//     { id: 1, name: 'Owner', users: 1, lastUpdated: '2024-03-15', authorityLevel: 100 },
//     { id: 2, name: 'Admin', users: 1, lastUpdated: '2024-03-15', authorityLevel: 75 },
//     { id: 3, name: 'Mine Manager', users: 11, lastUpdated: '2024-03-20', authorityLevel: 60 },
//     { id: 4, name: 'Shift Incharge', users: 21, lastUpdated: '2024-03-20', authorityLevel: 50 },
//   ]);

//   // Add User Handler
//   const handleAddUser = () => {
//     const newUserWithId = {
//       ...newUser,
//       id: users.length + 1,
//       lastLogin: new Date().toISOString().split('T')[0]
//     };
    
//     setUsers([...users, newUserWithId]);
//     setIsAddUserModalOpen(false);
//     // Reset form
//     setNewUser({
//       name: '',
//       email: '',
//       phone: '',
//       role: '',
//       status: true
//     });
//   };

//   // Edit User Handler
//   const handleEditUser = () => {
//     if (editingUser) {
//       const updatedUsers = users.map(user => 
//         user.id === editingUser.id ? { ...editingUser } : user
//       );
      
//       setUsers(updatedUsers);
//       setIsEditUserModalOpen(false);
//       setEditingUser(null);
//     }
//   };

//   // Delete User Handler
//   const handleDeleteUser = (userId) => {
//     setUsers(users.filter(user => user.id !== userId));
//   };

//   // Add Team Handler
//   const handleAddTeam = () => {
//     const shiftIncharges = newTeam.selectedUsers.filter(userId => 
//       users.find(user => user.id === userId && user.role === 'Shift Incharge')
//     ).length;

//     const newTeamWithId = {
//       id: teams.length + 1,
//       name: newTeam.name,
//       members: newTeam.selectedUsers.length,
//       shiftIncharges: shiftIncharges,
//       users: newTeam.selectedUsers
//     };
    
//     setTeams([...teams, newTeamWithId]);
//     setIsAddTeamModalOpen(false);
//     // Reset form
//     setNewTeam({
//       name: '',
//       selectedUsers: []
//     });
//   };

//   // Add Role Handler
//   const handleAddRole = () => {
//     const newRoleWithId = {
//       ...newRole,
//       id: roles.length + 1,
//       users: 0,
//       lastUpdated: new Date().toISOString().split('T')[0]
//     };
    
//     setRoles([...roles, newRoleWithId]);
//     setIsAddRoleModalOpen(false);
//     // Reset form
//     setNewRole({
//       name: '',
//       authorityLevel: 50
//     });
//   };

//   // Existing helper functions remain the same...
//   const getInitials = (name) => {
//     return name
//       .split(' ')
//       .map(part => part[0])
//       .join('')
//       .toUpperCase();
//   };

//   const getRoleStyles = (role) => {
//     const styles = {
//       'Admin': 'bg-sky-900/80 text-sky-200',
//       'Owner': 'bg-blue-900/80 text-blue-200',
//       'Shift Incharge': 'bg-emerald-900/80 text-emerald-200',
//       'Mine Manager': 'bg-purple-900/80 text-purple-200',
//     };
//     return styles[role] || 'bg-gray-900/80 text-gray-200';
//   };

//   const filteredData = () => {
//     const searchLower = searchTerm.toLowerCase();
//     switch (activeTab) {
//       case 'users':
//         return users.filter(user => 
//           (selectedRole === 'All' || user.role === selectedRole) &&
//           (user.name.toLowerCase().includes(searchLower) || 
//            user.email.toLowerCase().includes(searchLower))
//         );
//       case 'teams':
//         return teams.filter(team => 
//           team.name.toLowerCase().includes(searchLower)
//         );
//       case 'roles':
//         return roles.filter(role => 
//           role.name.toLowerCase().includes(searchLower)
//         );
//       default:
//         return [];
//     }
//   };

//   // Render Modals
//   const renderAddUserModal = () => (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-gray-800 rounded-lg p-6 w-96">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-bold">Add User</h2>
//           <button onClick={() => setIsAddUserModalOpen(false)}>
//             <X className="text-gray-400 hover:text-white" />
//           </button>
//         </div>
//         <div className="space-y-4">
//           <input
//             type="text"
//             placeholder="Name"
//             value={newUser.name}
//             onChange={(e) => setNewUser({...newUser, name: e.target.value})}
//             className="w-full p-2 bg-gray-700 rounded"
//           />
//           <input
//             type="email"
//             placeholder="Email"
//             value={newUser.email}
//             onChange={(e) => setNewUser({...newUser, email: e.target.value})}
//             className="w-full p-2 bg-gray-700 rounded"
//           />
//           <input
//             type="tel"
//             placeholder="Phone"
//             value={newUser.phone}
//             onChange={(e) => setNewUser({...newUser, phone: e.target.value})}
//             className="w-full p-2 bg-gray-700 rounded"
//           />
//           <select
//             value={newUser.role}
//             onChange={(e) => setNewUser({...newUser, role: e.target.value})}
//             className="w-full p-2 bg-gray-700 rounded"
//           >
//             <option value="">Select Role</option>
//             {roles.map(role => (
//               <option key={role.id} value={role.name}>{role.name}</option>
//             ))}
//           </select>
//           <div className="flex items-center">
//             <input
//               type="checkbox"
//               checked={newUser.status}
//               onChange={(e) => setNewUser({...newUser, status: e.target.checked})}
//               className="mr-2"
//             />
//             <span>Active</span>
//           </div>
//           <button 
//             onClick={handleAddUser}
//             className="w-full bg-green-700 p-2 rounded hover:bg-green-600"
//           >
//             Add User
//           </button>
//         </div>
//       </div>
//     </div>
//   );

//   const renderAddTeamModal = () => (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-gray-800 rounded-lg p-6 w-96">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-bold">Create Team</h2>
//           <button onClick={() => setIsAddTeamModalOpen(false)}>
//             <X className="text-gray-400 hover:text-white" />
//           </button>
//         </div>
//         <div className="space-y-4">
//           <input
//             type="text"
//             placeholder="Team Name"
//             value={newTeam.name}
//             onChange={(e) => setNewTeam({...newTeam, name: e.target.value})}
//             className="w-full p-2 bg-gray-700 rounded"
//           />
//           <div>
//             <label className="block mb-2">Select Team Members</label>
//             {users.map(user => (
//               <div key={user.id} className="flex items-center mb-2">
//                 <input
//                   type="checkbox"
//                   id={`user-${user.id}`}
//                   checked={newTeam.selectedUsers.includes(user.id)}
//                   onChange={(e) => {
//                     const updatedUsers = e.target.checked
//                       ? [...newTeam.selectedUsers, user.id]
//                       : newTeam.selectedUsers.filter(id => id !== user.id);
//                     setNewTeam({...newTeam, selectedUsers: updatedUsers});
//                   }}
//                   className="mr-2"
//                 />
//                 <label htmlFor={`user-${user.id}`}>{user.name} - {user.role}</label>
//               </div>
//             ))}
//           </div>
//           <button 
//             onClick={handleAddTeam}
//             className="w-full bg-green-700 p-2 rounded hover:bg-green-600"
//           >
//             Create Team
//           </button>
//         </div>
//       </div>
//     </div>
//   );

//   const renderAddRoleModal = () => (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-gray-800 rounded-lg p-6 w-96">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-bold">Add Role</h2>
//           <button onClick={() => setIsAddRoleModalOpen(false)}>
//             <X className="text-gray-400 hover:text-white" />
//           </button>
//         </div>
//         <div className="space-y-4">
//           <input
//             type="text"
//             placeholder="Role Name"
//             value={newRole.name}
//             onChange={(e) => setNewRole({...newRole, name: e.target.value})}
//             className="w-full p-2 bg-gray-700 rounded"
//           />
//           <div>
//             <label className="block mb-2">Authority Level: {newRole.authorityLevel}%</label>
//             <input
//               type="range"
//               min="0"
//               max="100"
//               value={newRole.authorityLevel}
//               onChange={(e) => setNewRole({...newRole, authorityLevel: parseInt(e.target.value)})}
//               className="w-full"
//             />
//           </div>
//           <button 
//             onClick={handleAddRole}
//             className="w-full bg-green-700 p-2 rounded hover:bg-green-600"
//           >
//             Add Role
//           </button>
//         </div>
//       </div>
//     </div>
//   );

//   const renderEditUserModal = () => (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-gray-800 rounded-lg p-6 w-96">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-bold">Edit User</h2>
//           <button onClick={() => setIsEditUserModalOpen(false)}>
//             <X className="text-gray-400 hover:text-white" />
//           </button>
//         </div>
//         <div className="space-y-4">
//           <input
//             type="text"
//             placeholder="Name"
//             value={editingUser?.name || ''}
//             onChange={(e) => setEditingUser({...editingUser, name: e.target.value})}
//             className="w-full p-2 bg-gray-700 rounded"
//           />
//           <input
//             type="email"
//             placeholder="Email"
//             value={editingUser?.email || ''}
//             onChange={(e) => setEditingUser({...editingUser, email: e.target.value})}
//             className="w-full p-2 bg-gray-700 rounded"
//           />
//           <input
//             type="tel"
//             placeholder="Phone"
//             value={editingUser?.phone || ''}
//             onChange={(e) => setEditingUser({...editingUser, phone: e.target.value})}
//             className="w-full p-2 bg-gray-700 rounded"
//             />
//             <select
//               value={editingUser?.role || ''}
//               onChange={(e) => setEditingUser({...editingUser, role: e.target.value})}
//               className="w-full p-2 bg-gray-700 rounded"
//             >
//               <option value="">Select Role</option>
//               {roles.map(role => (
//                 <option key={role.id} value={role.name}>{role.name}</option>
//               ))}
//             </select>
//             <div className="flex items-center">
//               <input
//                 type="checkbox"
//                 checked={editingUser?.status || false}
//                 onChange={(e) => setEditingUser({...editingUser, status: e.target.checked})}
//                 className="mr-2"
//               />
//               <span>Active</span>
//             </div>
//             <button 
//               onClick={handleEditUser}
//               className="w-full bg-blue-700 p-2 rounded hover:bg-blue-600"
//             >
//               Save Changes
//             </button>
//           </div>
//         </div>
//       </div>
//     );
  
//     return (
//       <div className="p-6 bg-gray-900 min-h-screen">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-3xl text-white font-semibold">User & Team Management</h1>
//           <div className="flex space-x-4">
//             <button onClick={() => setActiveTab('users')} className="text-white">Users</button>
//             <button onClick={() => setActiveTab('teams')} className="text-white">Teams</button>
//             <button onClick={() => setActiveTab('roles')} className="text-white">Roles</button>
//           </div>
//         </div>
  
//         {/* Search Bar */}
//         <div className="mb-6 flex items-center space-x-2">
//           <Search className="text-gray-400" />
//           <input 
//             type="text"
//             placeholder="Search..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="p-2 bg-gray-700 rounded text-white w-1/2"
//           />
//         </div>
  
//         {/* Content based on active tab */}
//         <div>
//           {activeTab === 'users' && (
//             <div>
//               <button 
//                 onClick={() => setIsAddUserModalOpen(true)}
//                 className="mb-4 bg-green-700 p-2 rounded hover:bg-green-600"
//               >
//                 <Plus className="mr-2" /> Add User
//               </button>
//               <div className="space-y-4">
//                 {filteredData().map(user => (
//                   <div key={user.id} className="bg-gray-800 p-4 rounded flex justify-between items-center">
//                     <div className="flex items-center">
//                       <FaUserCircle className="text-white mr-3" />
//                       <div>
//                         <h4 className="text-white font-semibold">{user.name}</h4>
//                         <p className="text-gray-400">{user.role}</p>
//                       </div>
//                     </div>
//                     <div className="flex space-x-2">
//                       <button onClick={() => { setEditingUser(user); setIsEditUserModalOpen(true); }} className="text-yellow-400">
//                         <Edit2 />
//                       </button>
//                       <button onClick={() => handleDeleteUser(user.id)} className="text-red-500">
//                         <Trash2 />
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
  
//           {activeTab === 'teams' && (
//             <div>
//               <button 
//                 onClick={() => setIsAddTeamModalOpen(true)}
//                 className="mb-4 bg-blue-700 p-2 rounded hover:bg-blue-600"
//               >
//                 <Plus className="mr-2" /> Create Team
//               </button>
//               <div className="space-y-4">
//                 {filteredData().map(team => (
//                   <div key={team.id} className="bg-gray-800 p-4 rounded flex justify-between items-center">
//                     <div>
//                       <h4 className="text-white font-semibold">{team.name}</h4>
//                       <p className="text-gray-400">Members: {team.members}, Shift Incharges: {team.shiftIncharges}</p>
//                     </div>
//                     <button onClick={() => navigate(`/teams/${team.id}`)} className="text-blue-500">
//                       View Team
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
  
//           {activeTab === 'roles' && (
//             <div>
//               <button 
//                 onClick={() => setIsAddRoleModalOpen(true)}
//                 className="mb-4 bg-purple-700 p-2 rounded hover:bg-purple-600"
//               >
//                 <Plus className="mr-2" /> Add Role
//               </button>
//               <div className="space-y-4">
//                 {filteredData().map(role => (
//                   <div key={role.id} className="bg-gray-800 p-4 rounded flex justify-between items-center">
//                     <div>
//                       <h4 className="text-white font-semibold">{role.name}</h4>
//                       <p className="text-gray-400">Authority Level: {role.authorityLevel}%</p>
//                     </div>
//                     <button onClick={() => navigate(`/roles/${role.id}`)} className="text-blue-500">
//                       View Role
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
  
//         {/* Modal for Adding User */}
        // {isAddUserModalOpen && renderAddUserModal()}
  
        // {/* Modal for Editing User */}
        // {isEditUserModalOpen && renderEditUserModal()}
  
        // {/* Modal for Adding Team */}
        // {isAddTeamModalOpen && renderAddTeamModal()}
  
        // {/* Modal for Adding Role */}
        // {isAddRoleModalOpen && renderAddRoleModal()}
//       </div>
//     );
//   };
  
//   export default UserTeams;
  