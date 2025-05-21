import React, { useState,useEffect } from 'react';
import { FaUserCircle, FaUserFriends, FaUserTag } from 'react-icons/fa';
 import { Search, Settings, Edit2, Trash2, Plus, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Info } from 'lucide-react'; // Add this icon import at the top
import axios from 'axios';

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
    role: 'Shift Incharge',
    department: '',
    status: true
  });

  const [newTeam, setNewTeam] = useState({
    name: '',
    description:'',
    selectedUsers: []
  });

  const [newRole, setNewRole] = useState({
    name: '',
    authorityLevel: 50
  });


  

  // Initial state for users, teams, and roles
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const findPeople = async () => {
      try {
        const response = await axios.post('http://localhost:3000/team/people');
        console.log('Response from backend:', response.data);
        setUsers(response.data.users || []); 
      } catch (error) {
        console.error('Error fetching data from backend:', error);
      }
    };
    
    findPeople();
    }, []);

    const [SIs, setSIs] = useState([]);
  useEffect(() => {
    const findSI = async () => {
      try {
        const response = await axios.post('http://localhost:3000/team/SI');
        console.log('Response from backend:', response.data);
        setSIs(response.data.SIs || []); 
      } catch (error) {
        console.error('Error fetching data from backend:', error);
      }
    };
    
    findSI();
    }, []);

  //   { id: 1, name: 'Kiran ', role: 'Owner', email: 'kiran@gmail.com', phone: '7854162158', status: true, lastLogin: '2024-03-15' },
  //   { id: 2, name: 'John ', role: 'Shift Incharge', email: 'john@gmail.com', phone: '7854162158', status: true, lastLogin: '2024-03-15' },
  //   { id: 3, name: 'Jane Smith', role: 'Mine Manager', email: 'jane.smith@company.com', phone: '987-654-3210', status: true, lastLogin: '2024-03-14' },
  //   { id: 4, name: 'Bob Johnson', role: 'Shift Incharge', email: 'bob.johnson@company.com', phone: '456-789-0123', status: false, lastLogin: '2024-03-13' },
  //   { id: 5, name: 'Alice Williams', role: 'Mine Manager', email: 'alice.williams@company.com', phone: '321-987-6543', status: true, lastLogin: '2024-03-12' },
  // ]);

  const [shifts, setShifts] = useState([
    { id: 1, name: 'Morning Shift'},
    { id: 2, name: 'Afternoon Shift'},
    { id: 3, name: 'Evening Shift'},
    { id: 4, name: 'Night Shift'},
    { id: 5, name: 'Maintenance'},
  ]);



  // const [teams, setTeams] = useState([
  //   { id: 1, name: 'Mine Manager 1', members: 10, shiftIncharges: 2, users: [] },
  //   { id: 2, name: 'Mine Manager 2', members: 12, shiftIncharges: 3, users: [] },
  //   { id: 3, name: 'Security Team', members: 6, shiftIncharges: 1, users: [] },
  //   { id: 4, name: 'HR Team', members: 4, shiftIncharges: 1, users: [] },
  // ]);

  const [teams, setTeams] = useState([]);

useEffect(() => {
  const findTeams = async () => {
    try {
      const response = await axios.post('http://localhost:3000/team/team-list');
      console.log('Response from backend:', response.data);

      // Modify one field of all objects in the response
      const updatedTeams = (response.data.teams || []).map(team => ({
        ...team,
        // Change 'fieldName' to the field you want to modify
        shiftInchargeCount: team.shiftIncharge.length // Replace 'fieldName' and 'new value' as per your requirements
      }));

      setTeams(updatedTeams); // Update state with modified teams
    } catch (error) {
      console.error('Error fetching data from backend:', error);
    }
  };

  findTeams();
}, []);

  // const [roles, setRoles] = useState([
  //   { id: 1, name: 'Owner', users: 1, lastUpdated: '2024-03-15', authorityLevel: 100 },
  //   { id: 2, name: 'Admin', users: 1, lastUpdated: '2024-03-15', authorityLevel: 75 },
  //   { id: 3, name: 'Mine Manager', users: 11, lastUpdated: '2024-03-20', authorityLevel: 60 },
  //   { id: 4, name: 'Shift Incharge', users: 21, lastUpdated: '2024-03-20', authorityLevel: 50 },
  // ]);


const [roles, setRoles] = useState([]);
useEffect(() => {
const findAuthority = async () => {
  try {
    const response = await axios.post('http://localhost:3000/team/authority');
    console.log('Response from backend:', response.data);
    setRoles(response.data.roles || []); 
  } catch (error) {
    console.error('Error fetching data from backend:', error);
  }
};

findAuthority();
}, []);


    const handleAddUser = async () => {
      try {
        const newUserWithId = {
          ...newUser,
        };
  
        console.log('Adding user:', newUserWithId);
  
        const response = await axios.post('http://localhost:3000/team/addUser', newUserWithId);
  
        if (response.status === 200) {
          console.log('Response from backend:', response.data);
  
          // Update users state with the new user
          setUsers([...users, newUserWithId]);
  
          // Close modal
          setIsAddUserModalOpen(false);
  
          // Reset form
          setNewUser({
            name: '',
            email: '',
            phone: '',
            department: '',
            role: 'Shift Incharge',
            status: true,
          });
        } else {
          console.error('Failed to add user:', response.data);
          alert('Failed to add user. Please try again.');
        }
      } catch (error) {
        console.error('Error while adding user:', error);
        alert('An error occurred. Please try again later.');
      }
    };// Include dependencies
  
  


  // Delete User Handler
  const handleDeleteUser = (userId) => {
    // console.log(userId);

    // Call the backend to delete the user
    axios.post('http://localhost:3000/team/deleteUser', { userId })
        .then((response) => {
            console.log('Response from backend:', response.data);

            // Update frontend state after backend confirms deletion
            setUsers(users.filter(user => user._id !== userId));
        })
        .catch((error) => {
            console.error('Error sending data to backend:', error);
        });
};


  const handleDeleteTeam = (teamId) => {
    console.log(teamId);
    axios.post('http://localhost:3000/team/deleteTeam', { teamId })
    .then((response) => {
      console.log('Response from backend:', response.data);
      
      setTeams(teams.filter(team => team._id !== teamId));
            // Update frontend state after backend confirms deletion
        })
        .catch((error) => {
            console.error('Error sending data to backend:', error);
        });

  };
  

  // Add Team Handler
  const handleAddTeam = async() => {

    const newTeamWithId = {
      id: teams.length + 1,
      name: newTeam.name,
      description:newTeam.description,
      // members: newTeam.selectedUsers.length,
      shiftInchargeCount: newTeam.selectedUsers.length,
      users: newTeam.selectedUsers
    };
    console.log(newTeamWithId);
    const response = await axios.post('http://localhost:3000/team/addTeam', newTeamWithId);

    if(response.status===200){
      console.log(newTeamWithId);
      setTeams([...teams, newTeamWithId]);
      setIsAddTeamModalOpen(false);
      // Reset form
      setNewTeam({
        name: '',
        description:'',
        selectedUsers: []
    });
  }else{
    console.error('failed to add user',response.data);
    alert('failed to add user.please try again.');
  }
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
            <option value="Shift Incharge">Shift Incharge</option>
            {/* {roles.find(role => role.name === "Shift Incharge") && (
            <option value="Shift Incharge">Shift Incharge</option>
            )} */}

          </select>

          <select
            value={newUser.department}
            onChange={(e) => setNewUser({...newUser, department: e.target.value})}
            className="w-full p-2 bg-gray-700 rounded"
          >
            <option value="">Select Department</option>
            {shifts.map(shift => (
              <option key={shift.id} value={shift.name}>{shift.name}</option>
            ))}
          </select>
          {/* <div className="flex items-center">
            <input
              type="checkbox"
              checked={newUser.status}
              onChange={(e) => setNewUser({...newUser, status: e.target.checked})}
              className="mr-2"
            />
            <span>Active</span>
          </div> */}
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
          <input
            type="text"
            placeholder="Team Description"
            value={newTeam.description}
            onChange={(e) => setNewTeam({...newTeam, description: e.target.value})}
            className="w-full p-2 bg-gray-700 rounded"
          />
          <div>
            <label className="block mb-2">Select Team Members</label>
            {SIs.map(SI => (
              <div key={SI._id} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id={`SI-${SI._id}`}
                  checked={newTeam.selectedUsers.includes(SI._id)}
                  onChange={(e) => {
                    const updatedUsers = e.target.checked
                      ? [...newTeam.selectedUsers, SI._id]
                      : newTeam.selectedUsers.filter(id => id !== user._id);
                    setNewTeam({...newTeam, selectedUsers: updatedUsers});
                  }}
                  className="mr-2"
                />
                <label htmlFor={`user-${SI._id}`}>{SI.name} - {SI.department}</label>
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
                <option key={`${role.id}-${role.name}`} value={role.name}>
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
                  <th className="px-6 py-4 text-left">Department</th>
                  <th className="px-6 py-4 text-left">Email</th>
                  {/* <th className="px-6 py-4 text-left">Last Login</th>
                  <th className="px-6 py-4 text-left">Status</th> */}
                  <th className="px-6 py-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredData().map((user) => (
                  <tr key={user._id||user.email} className="border-b border-gray-700/50 hover:bg-gray-700/30">
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
                    <td className="px-6 py-4 text-gray-300">
                        {user.department?user.department:"Main"}
                    </td>
                    <td className="px-6 py-4 text-gray-300">{user.email}</td>
                    {/* <td className="px-6 py-4 text-gray-300">{user.lastLogin?user.lastLogin:"20204-12-07"}</td>
                    <td className="px-6 py-4">
                      <div className={`px-3 py-1 rounded-full text-sm inline-flex ${user.status ? 'bg-green-900/60 text-green-200' : 'bg-gray-900/60 text-gray-300'}`}>
                        {user.status ? 'Active' : 'Inactive'}
                      </div>
                    </td> */}
                    <td className="px-6 py-4">
                      <div className="flex gap-3">
                        {/* <button onClick={() => { setEditingUser(users); setIsEditUserModalOpen(true); }} className="text-gray-400 hover:text-green-400">
                          <Edit2 size={18} />
                        </button> */}
                        <button 
                        onClick={() => handleDeleteUser(user._id)} 
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
                  <th className="px-6 py-4 text-left">Description</th>
                  <th className="px-6 py-4 text-left">Shift Incharges</th>
                  <th className="px-6 py-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredData().map((team) => (
                  <tr key={team._id} className="border-b border-gray-700/50 hover:bg-gray-700/30">
                    <td className="px-6 py-4">{team.name}</td>
                    <td className="px-6 py-4">{team.description}</td>
                    <td className="px-6 py-4">{team.shiftInchargeCount}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-3">
                        <button onClick={() => { setEditingUser(users); setIsEditUserModalOpen(true); }} className="text-gray-400 hover:text-green-400">
                          <Edit2 size={18} />
                        </button>
                        <button onClick={() => handleDeleteTeam(team._id)} 
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




