import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Shield, Layers } from 'lucide-react';
import MiningVector from '../assets/mining-vector.svg';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-green-900 flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-green-900/20 via-black/60 to-black opacity-75"></div>

      <div className="relative z-10 max-w-5xl w-full bg-gray-900/60 backdrop-blur-lg rounded-2xl shadow-2xl border border-green-900/30 overflow-hidden">
        <div className="grid md:grid-cols-2">
          {/* Left Side - Features */}
          <div className="p-12 bg-green-900/20 flex flex-col justify-center">
            <h1 className="text-4xl font-bold text-white mb-6 tracking-tight">
              Welcome to <span className="text-green-400">Mine Management</span>
            </h1>
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <MapPin className="text-green-400 w-10 h-10" />
                <div>
                  <h3 className="text-xl font-semibold text-white">Location Tracking</h3>
                  <p className="text-gray-400">Precise geographical mapping for mining sites</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Shield className="text-green-400 w-10 h-10" />
                <div>
                  <h3 className="text-xl font-semibold text-white">Safety Compliance</h3>
                  <p className="text-gray-400">Comprehensive safety documentation and management</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Layers className="text-green-400 w-10 h-10" />
                <div>
                  <h3 className="text-xl font-semibold text-white">Detailed Reporting</h3>
                  <p className="text-gray-400">Generate and review detailed reports easily</p>
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="mt-10 flex flex-col space-y-4">
              <button
                onClick={() => navigate('/onboard-mine')}
                className="w-full py-3 bg-green-600 hover:bg-green-500 text-white rounded-full transition-colors duration-300 flex items-center justify-center font-semibold"
              >
                Onboard Your Mine
              </button>

              <button
                onClick={() => navigate('/join-mine')}
                className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-full transition-colors duration-300 flex items-center justify-center font-semibold"
              >
                Join an Existing Mine
              </button>
            </div>
          </div>

          {/* Right Side - Vector Illustration */}
          <div className="hidden md:flex items-center justify-center p-12 bg-green-900/10">
            <img src={MiningVector} alt="Mining Vector" className="w-full max-w-xs animate-pulse-slow" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
