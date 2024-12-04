import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, ChevronLeft, ChevronRight, AlertTriangle, Copy } from "lucide-react";
import MiningIllustration from "../assets/mine.svg";
import SafetyVector from "../assets/SafetyVector.svg";
import EquipmentVector from "../assets/mine.svg";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {InputField, FileInputField, SelectField} from '../components/InputFields';

const MineOnboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    mineName: "",
    location: "",
    mineType: "",
    companyName: "",
    registrationNumber: "",
    companyName: "",
    mineArea: "",
    coalGrade: "",
    productionCapacity: "",
    currentDepth: "",
    miningMethod: "",
    safetyCertificate: null,
    safetyPlan: null,
    blueprint: null,
    rescuePlan: null,
    emergencyContact: "",
    totalWorkers: "",
    personnel: [],
    equipment: [],
    sensors: [],
  });
  const [errors, setErrors] = useState({});



  const handleFileChange = (field, files) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: files[0], // Assuming you want the first file
    }));
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  

  // const validateStep = () => {
  //   const newErrors = {};
  //   switch (step) {
  //     case 1:
  //       if (!formData.mineName) newErrors.mineName = "Mine Name is required";
  //       if (!formData.location) newErrors.location = "Location is required";
  //       if (!formData.mineType) newErrors.mineType = "Mine Type is required";
  //       if (!formData.companyName) newErrors.companyName = "Company Name is required";
  //       break;
  //       case 2:
  //         if (!formData.mineArea ) newErrors.mineArea = "Mine Area in hectares";
  //         if (!formData.coalGrade) newErrors.coalGrade = "Coal Grade is required";
  //         if (!formData.productionCapacity) newErrors.productionCapacity = "Production Capacity must be a number";
  //         if (!formData.currentDepth) newErrors.currentDepth = "Current Depth is required";
  //         if (!formData.miningMethod) newErrors.miningMethod = "Mining Method is required";
  //         break;
       
  //       case 3:
  // if (!formData.safetyCertificate) newErrors.safetyCertificate = "Safety Certificate is required";
  // if (!formData.blueprint) newErrors.blueprint = "Blueprint is required";
  // if (!formData.smp) newErrors.smp = "SMP upload is required";
  // if (!formData.rescuePlan) newErrors.rescuePlan = "Rescue Plan is required";
  // if (!formData.emergencyContact) newErrors.emergencyContact = "Emergency Contact is required";
  // break;

        
  //     default:
  //       break;
  //   }
  //   setErrors(newErrors);
  //   return Object.keys(newErrors).length === 0;
  // };

  const proceedToNextStep = () => {
    setStep(step + 1);
    // if (validateStep()) {
    //   setStep(step + 1);
    // }
    console.log("error");
  };

  const handleSubmit = () => {
    toast.success("Mine registered successfully!");
    navigate("/app");
  };

  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code);
    toast.info("Mine code copied to clipboard!");
  };

  const ErrorMessage = ({ message }) => (
    <div className="text-red-500 text-sm mt-1 flex items-center">
      <AlertTriangle className="mr-2 w-4 h-4" />
      {message}
    </div>
  );

  const ProgressBar = () => (
    <div className="w-full bg-green-900/30 h-2 rounded-full overflow-hidden">
      <div
        className="h-full bg-gradient-to-r from-green-600 to-green-400"
        style={{ width: `${(step / 4) * 100}%` }}
      />
    </div>
  );

  const StepIndicator = () => (
    <div className="text-gray-400 text-sm mb-4">Step {step}/4</div>
  );

  const renderStepVector = () => {
    switch (step) {
      case 1:
        return <img src={MiningIllustration} alt="Mining" className="w-full max-w-xs mx-auto rounded-full fill" />;
      case 2:
        return <img src={EquipmentVector} alt="Equipment" className="w-full max-w-xs mx-auto" />;
      case 3:
        return <img src={SafetyVector} alt="Safety" className="w-full max-w-xs mx-auto" />;
      default:
        return null;
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h2 className="text-2xl text-white mb-6 font-semibold">Basic Information</h2>
              <InputField
                label="Mine Name"
                name="mineName"
                value={formData.mineName}
                onChange={handleInputChange}
                placeholder="Enter Mine Name"
                error={errors.mineName}
              />
              <SelectField
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                options={["Location 1", "Location 2", "Location 3"]}
                error={errors.location}
              />
              <SelectField
                label="Mine Type"
                name="mineType"
                value={formData.mineType}
                onChange={handleInputChange}
                options={["open", "closed", "both"]}
                error={errors.mineType}
              />
               <InputField
                label="Operating Company"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                placeholder="Enter Company Name"
                error={errors.companyName}
              />
            </div>
            <div className="flex items-center justify-center">{renderStepVector()}</div>
          </div>
        );
      case 2:
        return (
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h2 className="text-2xl text-white mb-6 font-semibold">Mine Specifications</h2>
              <InputField
                label="Mine Area"
                name="mineArea"
                 type="number"
                value={formData.mineArea}
                onChange={handleInputChange}
                placeholder="Enter Mine Area in hectacer"
                error={errors.mineArea}
              />
              <InputField
                label="Coal Grade"
                name="coalGrade"
                value={formData.coalGrade}
                onChange={handleInputChange}
                placeholder="Enter Coal Grade"
                error={errors.coalGrade}
              />
              <InputField
                label="Production Capacity"
                name="productionCapacity"
                value={formData.productionCapacity}
                onChange={handleInputChange}
                placeholder="Enter Production Capacity"
                error={errors.productionCapacity}
              />
              <InputField
                label="Current Depth"
                name="currentDepth"
                value={formData.currentDepth}
                onChange={handleInputChange}
                placeholder="Enter Current Depth"
                error={errors.currentDepth}
              />
              <InputField
                label="Mining Method"
                name="miningMethod"
                value={formData.miningMethod}
                onChange={handleInputChange}
                placeholder="Enter Mining Method"
                error={errors.miningMethod}
              />
            </div>
            <div className="flex items-center justify-center">{renderStepVector()}</div>
          </div>
        );
      case 3:
        return (
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h2 className="text-2xl text-white mb-6 font-semibold">Safety and Compliance</h2>
              <FileInputField
                label="Safety Certificate"
                name="safetyCertificate"
                // value={formData.safetyCertificate}
                onChange={handleInputChange}
                placeholder="Upload Safety Certificate"
                error={errors.safetyCertificate}
              />
              <FileInputField
                label="Blueprint"
                name="blueprint"
                value={formData.blueprint}
                onChange={handleInputChange}
                placeholder="Upload Blueprint"
                error={errors.blueprint}
              />
              <FileInputField
                label="SMP"
                name="smp"
                value={formData.smp}
                onChange={handleInputChange}
                placeholder="Upload SMP Document"
                error={errors.smp}
              />
              <FileInputField
                label="Rescue Plan"
                name="rescuePlan"
                value={formData.rescuePlan}
                onChange={handleInputChange}
                placeholder="Upload Rescue Plan"
                error={errors.rescuePlan}
              />
              <InputField
                label="Emergency Contact"
                name="emergencyContact"
                value={formData.emergencyContact}
                onChange={handleInputChange}
                placeholder="Enter Emergency Contact"
                error={errors.emergencyContact}
              />
            </div>
            <div className="flex items-center justify-center">{renderStepVector()}</div>
          </div>
        );
        case 4:
          const mineCode = `MINE${Math.random().toString(36).substring(2, 8).toUpperCase()}`; // Generate random mine code
          return (
            <div className="text-center py-12 px-24">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check size={32} className="text-white" />
              </div>
              <h2 className="text-2xl text-white mb-4">Mine Registered Successfully</h2>
              <div
                className="bg-green-900/30 text-gray-300 p-4 rounded-lg mb-4 flex justify-between items-center"
                onClick={() => copyToClipboard(mineCode)}
                style={{ cursor: "pointer" }}
              >
                {mineCode}
                <Copy size={20} className="text-gray-400" />
              </div>
              <p className="text-gray-400">Share the code with the workers to allow them to join the mine</p>
            </div>
          );
        default:
          return null;
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-green-900 flex items-center justify-center p-6 relative">
   
      <ToastContainer />
       <div className="relative z-10 max-w-4xl w-full bg-gray-900/80 backdrop-blur-lg rounded-2xl shadow-2xl border-2 border-green-900 p-8">
        <div className="mb-8">
       
          <h1 className="text-3xl text-white mb-2 font-bold">Mine Registration</h1>
          <StepIndicator />
          <ProgressBar />
        </div>
        {renderStep()}
        {step < 4 ? (
          <div className="flex justify-between mt-8">
            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                className="flex items-center gap-2 bg-green-900/30 hover:bg-green-900/40 text-white px-4 py-2 rounded-full"
              >
                <ChevronLeft size={20} />
                Previous
              </button>
            )}
            {step < 4 && (
              <button
                onClick={proceedToNextStep}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full"
              >
                Next
                <ChevronRight size={20} />
              </button>
            )}
          </div>
        ) : (
          <button
            onClick={handleSubmit}
            className="w-85% bg-green-600 hover:bg-green-700 text-white py-3 rounded-full px-56 ml-36 "
          >
            Go To Dashboard
          </button>
        )}
      </div>
    </div>
  );
  
 
 
}  

export default MineOnboarding;

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Check, ChevronLeft, ChevronRight, Upload, Plus, AlertTriangle } from 'lucide-react';

// const MineOnboarding = () => {
//   const navigate = useNavigate();
//   const [step, setStep] = useState(1);
//   const [formData, setFormData] = useState({
//     // ... previous state remains the same
//   });
//   const [errors, setErrors] = useState({});

//   const validateStep = () => {
//     const newErrors = {};
//     switch(step) {
//       case 1:
//         if (!formData.mineName) newErrors.mineName = "Mine Name is required";
//         if (!formData.location) newErrors.location = "Location is required";
//         if (!formData.mineType) newErrors.mineType = "Mine Type is required";
//         break;
//       case 2:
//         if (!formData.mineArea) newErrors.mineArea = "Mine Area is required";
//         if (!formData.coalGrade) newErrors.coalGrade = "Coal Grade is required";
//         break;
//       case 3:
//         // Add validation for safety documents
//         break;
//     }
    
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const proceedToNextStep = () => {
//     if (validateStep()) {
//       setStep(step + 1);
//     }
//   };

//   const handleSubmit = () => {
//     // Final validation and submission logic
//     navigate('/dashboard');
//   };

//   // ... keep previous renderStep, InputField, SelectField, UploadField components

//   const ErrorMessage = ({ message }) => (
//     <div className="text-red-500 text-sm mt-1 flex items-center">
//       <AlertTriangle className="mr-2 w-4 h-4" />
//       {message}
//     </div>
//   );

//   const renderStep = () => {
//     switch(step) {
//       case 1:
//         return (
//           <div className="space-y-4">
//             <h2 className="text-2xl text-white mb-6 font-semibold">Basic Information</h2>
//             <InputField 
//               label="Mine Name"
//               name="mineName"
//               value={formData.mineName}
//               onChange={handleInputChange}
//               placeholder="Enter Mine Name"
//             />
//             {errors.mineName && <ErrorMessage message={errors.mineName} />}
            
//             {/* Similar error handling for other fields */}
//             {/* ... rest of the step 1 content */}
//           </div>
//         );
//       // ... other steps remain similar with error handling
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-green-900 flex items-center justify-center p-6">
//       <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-green-900/20 via-black/60 to-black opacity-75"></div>
      
//       <div className="relative z-10 max-w-2xl w-full bg-gray-900/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-green-900/30 p-8">
//         <div className="mb-8">
//           <h1 className="text-3xl text-white mb-2 font-bold">Mine Registration</h1>
//           <StepIndicator />
//           <ProgressBar />
//         </div>
        
//         {renderStep()}
        
//         {step < 5 && (
//           <div className="flex justify-between mt-8">
//             {step > 1 && (
//               <button
//                 onClick={() => setStep(step - 1)}
//                 className="flex items-center gap-2 bg-green-900/30 hover:bg-green-900/40 text-white px-4 py-2 rounded-full"
//               >
//                 <ChevronLeft size={20} />
//                 Previous
//               </button>
//             )}
//             {step < 4 && (
//               <button
//                 onClick={proceedToNextStep}
//                 className="flex items-center gap-2 ml-auto bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-full"
//               >
//                 Next
//                 <ChevronRight size={20} />
//               </button>
//             )}
//             {step === 4 && (
//               <button
//                 onClick={handleSubmit}
//                 className="flex items-center gap-2 ml-auto bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-full"
//               >
//                 Submit
//                 <Check size={20} />
//               </button>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MineOnboarding;