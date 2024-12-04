import React from 'react';

const Overview = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-white mb-4">Dashboard Overview</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card 1 */}
        <div className="bg-[#1e1e1e] p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-green-400">Mine Summary</h2>
          <p className="text-gray-400 mt-2">
            View an overview of your mines, including location, production capacity, and status.
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-[#1e1e1e] p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-green-400">Team Statistics</h2>
          <p className="text-gray-400 mt-2">
            Monitor team performance, assigned tasks, and progress toward goals.
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-[#1e1e1e] p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-green-400">Real-Time Metrics</h2>
          <p className="text-gray-400 mt-2">
            Access live data on safety compliance, equipment usage, and IoT sensors.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Overview;
