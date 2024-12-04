import { FileText } from "lucide-react";
import React, { useState } from "react";

const InputField = ({ 
    icon: Icon, // Optional icon 
    label, 
    name, 
    type = "text", 
    value, 
    onChange, 
    error 
  }) => (
    <div className="mb-4">
      <div className="relative">
        {/* Render Icon only if provided */}
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="text-gray-400 w-5 h-5" />
          </div>
        )}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={label}
          className={`w-full bg-green-900/30 text-gray-300 ${Icon ? "pl-10" : "pl-3"} p-3 rounded-lg 
            focus:outline-none focus:ring-2 focus:ring-green-600`}
        />
      </div>
      {error && (
        <div className="text-red-500 text-sm mt-1 flex items-center">
          <AlertTriangle className="mr-2 w-4 h-4" />
          {error}
        </div>
      )}
    </div>
  );
  
  
  const SelectField = ({ 
    icon: Icon, // Optional icon
    label, 
    name, 
    value, 
    onChange, 
    options, 
    error 
  }) => (
    <div className="mb-4">
      <div className="relative">
        {/* Render Icon only if provided */}
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="text-gray-400 w-5 h-5" />
          </div>
        )}
        <select
          name={name}
          value={value}
          onChange={onChange}
          className={`w-full bg-green-900/30 text-gray-300 ${Icon ? "pl-10" : "pl-3"} p-3 rounded-lg 
            focus:outline-none focus:ring-2 focus:ring-green-600`}
        >
          <option value="">{label}</option>
          {options.map(option => (
            <option key={option} value={option} className="bg-green-800 text-gray-200">
              {option}
            </option>
          ))}
        </select>
      </div>
      {error && (
        <div className="text-red-500 text-sm mt-1 flex items-center">
          <AlertTriangle className="mr-2 w-4 h-4" />
          {error}
        </div>
      )}
    </div>
  );
  
  
  const FileInputField = ({ label, name, onChange, error, placeholder = "Choose a file" }) => {
    const [fileName, setFileName] = useState(placeholder);
  
    return (
      <div className="mb-4">
        <label className="block text-gray-300 mb-2">{label}</label>
        <div className="relative w-full">
          <input
            type="file"
            name={name}
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                setFileName(file.name); // Set the uploaded file name
                onChange(file, name); // Pass file to parent handler
              }
            }}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div className="flex items-center justify-between bg-green-900/30 text-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600">
            <span className="truncate">{fileName}</span>
            <FileText className="text-gray-500 w-5 h-5" />
          </div>
        </div>
        {error && <span className="text-red-500 text-sm">{error}</span>}
      </div>
    );
  };
  
  export  { InputField, SelectField, FileInputField };