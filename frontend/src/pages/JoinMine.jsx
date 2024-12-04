import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Lock, Mail, Hash, UserPlus, LogIn, AlertTriangle } from "lucide-react";
import Lottie from "lottie-react";
import AnimatedMining from "../assets/animated-mining.json"; // Import Lottie JSON
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { InputField, SelectField } from "../components/InputFields";

const JoinMine = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    mineCode: "",
    role: "",
  });
  const [registeredUsers, setRegisteredUsers] = useState([]); // Mimic database
  const [errors, setErrors] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData, // Copy previous state
      [name]: value, // Update only the changed field
    });

    // Clear errors if the field is valid
    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "", // Reset the specific error
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (!isLogin) {
      if (!formData.name) newErrors.name = "Name is required";
      if (!formData.mineCode) newErrors.mineCode = "Mine Code is required";
      if (!formData.role) newErrors.role = "Role is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (isLogin) {
      // Handle login
      const user = registeredUsers.find(
        (user) => user.email === formData.email && user.password === formData.password
      );
      if (user) {
        toast.success("Login Successful!");
        navigate("/app/dashboard");
      } else {
        toast.error("Invalid email or password");
      }
    } else {
      // Handle registration
      const userExists = registeredUsers.some((user) => user.email === formData.email);
      if (userExists) {
        toast.error("User already exists. Please login instead.");
      } else {
        setRegisteredUsers([...registeredUsers, formData]);
        toast.success("Registration Successful!");
        navigate("/app/dashboard");
      }
    }
  };

  const handleFinalSubmit = () => {
    toast.success("Directing to Your Dashboad!");
    navigate("/app");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6 relative"
      style={{
        backgroundImage:
          'url("https://img.freepik.com/free-photo/view-heavy-machinery-used-construction-industry_23-2151307816.jpg?t=st=1732964574~exp=1732968174~hmac=4d260f3e159506dea7c07ce6b1547da02ec8064c3b6a75c40dfefc167c485be5&w=1380")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <ToastContainer />
      <div
        className="relative z-10 max-w-5xl w-full bg-gray-900/70 backdrop-blur-md 
        rounded-2xl shadow-2xl border border-green-800 overflow-hidden grid md:grid-cols-2"
      >
        {/* Left Side - Animated Illustration */}
        <div className="hidden md:flex items-center justify-center bg-green-900/20 p-8">
          <Lottie animationData={AnimatedMining} loop={true} className="w-full max-w-md" />
        </div>

        {/* Right Side - Authentication Form */}
        <div className="p-8 flex flex-col justify-center">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">
              {isLogin ? "Welcome Back" : "Join a Mine"}
            </h2>
            <p className="text-gray-400">
              {isLogin
                ? "Login to access your mine dashboard"
                : "Create your worker account"}
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <>
                <InputField
                  icon={User}
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  error={errors.name}
                />
                <SelectField
                  icon={Hash}
                  label="Role"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  options={["Worker", "Engineer", "Supervisor", "Safety Officer"]}
                  error={errors.role}
                />
                <InputField
                  icon={Hash}
                  label="Mine Code"
                  name="mineCode"
                  value={formData.mineCode}
                  onChange={handleInputChange}
                  error={errors.mineCode}
                />
              </>
            )}

            <InputField
              icon={Mail}
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              error={errors.email}
            />

            <InputField
              icon={Lock}
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              error={errors.password}
            />

            <button
              type="submit"
              onClick={handleFinalSubmit}
              className="w-full bg-green-600 hover:bg-green-700 text-white 
              py-3 rounded-lg mt-4 flex items-center justify-center gap-2"
            >  
              {isLogin ? (
                <>
                  <LogIn size={20} /> Login
                </>
              ) : (
                <>
                  <UserPlus size={20} /> Register
                </>
              )}
            </button>
          </form>

          <div className="text-center mt-6">
            <p className="text-gray-400">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <span
                onClick={() => setIsLogin(!isLogin)}
                className="text-green-500 hover:text-green-400 cursor-pointer"
              >
                {isLogin ? "Register" : "Login"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinMine;


// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { User, Lock, Mail, Hash, UserPlus, LogIn, AlertTriangle } from 'lucide-react';
// import MiningVector from "../assets/join-mine.svg";
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const JoinMine = () => {
//   const navigate = useNavigate();
//   const [isLogin, setIsLogin] = useState(true);
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     mineCode: '',
//     role: ''
//   });
//   const [errors, setErrors] = useState({});

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//     // Clear specific field error when typing
//     if (errors[name]) {
//       setErrors(prev => ({ ...prev, [name]: '' }));
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};
    
//     // Common validations
//     if (!formData.email) newErrors.email = "Email is required";
//     if (!formData.password) newErrors.password = "Password is required";
    
//     // Additional registration validations
//     if (!isLogin) {
//       if (!formData.name) newErrors.name = "Name is required";
//       if (!formData.mineCode) newErrors.mineCode = "Mine Code is required";
//       if (!formData.role) newErrors.role = "Role is required";
//     }
    
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     if (validateForm()) {
//       if (isLogin) {
//         // Login logic
//         toast.success("Login Successful!");
//         navigate("/app/dashboard");
//       } else {
//         // Registration logic
//         toast.success("Registration Successful!");
//         navigate("/app/dashboard");
//       }
//     } else {
//       toast.error("Please fill in all required fields");
//     }
//   };

//   const InputField = ({ 
//     icon: Icon, 
//     label, 
//     name, 
//     type = "text", 
//     value, 
//     onChange, 
//     error 
//   }) => (
//     <div className="mb-4">
//       <div className="relative">
//         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//           <Icon className="text-gray-400 w-5 h-5" />
//         </div>
//         <input
//           type={type}
//           name={name}
//           value={value}
//           onChange={onChange}
//           placeholder={label}
//           className="w-full bg-green-900/30 text-gray-300 pl-10 p-3 rounded-lg 
//             focus:outline-none focus:ring-2 focus:ring-green-600"
//         />
//       </div>
//       {error && (
//         <div className="text-red-500 text-sm mt-1 flex items-center">
//           <AlertTriangle className="mr-2 w-4 h-4" />
//           {error}
//         </div>
//       )}
//     </div>
//   );

//   const SelectField = ({ 
//     icon: Icon, 
//     label, 
//     name, 
//     value, 
//     onChange, 
//     options, 
//     error 
//   }) => (
//     <div className="mb-4">
//       <div className="relative">
//         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//           <Icon className="text-gray-400 w-5 h-5" />
//         </div>
//         <select
//           name={name}
//           value={value}
//           onChange={onChange}
//           className="w-full bg-green-900/30 text-gray-300 pl-10 p-3 rounded-lg 
//             focus:outline-none focus:ring-2 focus:ring-green-600"
//         >
//           <option value="">{label}</option>
//           {options.map(option => (
//             <option key={option} value={option} className="bg-green-800 text-gray-200">
//               {option}
//             </option>
//           ))}
//         </select>
//       </div>
//       {error && (
//         <div className="text-red-500 text-sm mt-1 flex items-center">
//           <AlertTriangle className="mr-2 w-4 h-4" />
//           {error}
//         </div>
//       )}
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-gradient-to-tl from-gray-900 via-black to-green-900 
//       flex items-center justify-center p-6 relative overflow-hidden">
//       <ToastContainer />
      
//       <div className="relative z-10 max-w-5xl w-full bg-gray-900/80 backdrop-blur-lg 
//         rounded-2xl shadow-2xl border-2 border-green-900 overflow-hidden grid md:grid-cols-2">
        
//         {/* Left Side - Illustration */}
//         <div className="hidden md:flex items-center justify-center bg-green-900/20 p-8">
//           <img 
//             src={MiningVector} 
//             alt="Join Mine" 
//             className="w-full max-w-md transform hover:scale-105 transition-transform duration-300" 
//           />
//         </div>
        
//         {/* Right Side - Authentication Form */}
//         <div className="p-8 flex flex-col justify-center">
//           <div className="text-center mb-8">
//             <h2 className="text-3xl font-bold text-white mb-2">
//               {isLogin ? 'Welcome Back' : 'Join a Mine'}
//             </h2>
//             <p className="text-gray-400">
//               {isLogin 
//                 ? 'Login to access your mine dashboard' 
//                 : 'Create your worker account'}
//             </p>
//           </div>
          
//           <form onSubmit={handleSubmit}>
//             {!isLogin && (
//               <>
//                 <InputField
//                   icon={User}
//                   label="Full Name"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleInputChange}
//                   error={errors.name}
//                 />
//                 <SelectField
//                   icon={Hash}
//                   label="Role"
//                   name="role"
//                   value={formData.role}
//                   onChange={handleInputChange}
//                   options={['Worker', 'Engineer', 'Supervisor', 'Safety Officer']}
//                   error={errors.role}
//                 />
//                 <InputField
//                   icon={Hash}
//                   label="Mine Code"
//                   name="mineCode"
//                   value={formData.mineCode}
//                   onChange={handleInputChange}
//                   error={errors.mineCode}
//                 />
//               </>
//             )}
            
//             <InputField
//               icon={Mail}
//               label="Email Address"
//               name="email"
//               type="email"
//               value={formData.email}
//               onChange={handleInputChange}
//               error={errors.email}
//             />
            
//             <InputField
//               icon={Lock}
//               label="Password"
//               name="password"
//               type="password"
//               value={formData.password}
//               onChange={handleInputChange}
//               error={errors.password}
//             />
            
//             <button 
//               type="submit"
//               className="w-full bg-green-600 hover:bg-green-700 text-white 
//               py-3 rounded-lg mt-4 flex items-center justify-center gap-2"
//             >
//               {isLogin ? (
//                 <>
//                   <LogIn size={20} /> Login
//                 </>
//               ) : (
//                 <>
//                   <UserPlus size={20} /> Register
//                 </>
//               )}
//             </button>
//           </form>
          
//           <div className="text-center mt-6">
//             <p className="text-gray-400">
//               {isLogin 
//                 ? "Don't have an account? " 
//                 : "Already have an account? "}
//               <span 
//                 onClick={() => setIsLogin(!isLogin)}
//                 className="text-green-500 hover:text-green-400 cursor-pointer"
//               >
//                 {isLogin ? 'Register' : 'Login'}
//               </span>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default JoinMine;

