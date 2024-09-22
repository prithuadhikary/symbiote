import React from 'react';

import { Sidebar } from '../../common/Sidebar';

const AdminDashboard = () => {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <Sidebar/>

      {/* Main Content */}
      <div className="flex-grow bg-gray-100">
        {/* Header */}
        <header className="h-16 bg-white shadow-md flex items-center px-6">
          <h1 className="text-xl font-semibold">Dashboard</h1>
        </header>

        {/* Main Content Area */}
        <main className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {/* Dashboard Cards */}
            <div className="bg-white shadow rounded-lg p-4">
              <h2 className="text-lg font-bold mb-2">Total Users</h2>
              <p className="text-3xl font-semibold">1,234</p>
            </div>
            <div className="bg-white shadow rounded-lg p-4">
              <h2 className="text-lg font-bold mb-2">New Signups</h2>
              <p className="text-3xl font-semibold">98</p>
            </div>
            <div className="bg-white shadow rounded-lg p-4">
              <h2 className="text-lg font-bold mb-2">Active Users</h2>
              <p className="text-3xl font-semibold">567</p>
            </div>
            <div className="bg-white shadow rounded-lg p-4">
              <h2 className="text-lg font-bold mb-2">Total Revenue</h2>
              <p className="text-3xl font-semibold">$12,345</p>
            </div>
          </div>

          {/* Other Content */}
          <div className="mt-6">
            <h2 className="text-lg font-bold">Recent Activity</h2>
            <div className="bg-white shadow rounded-lg p-4 mt-4">
              <ul className="divide-y divide-gray-200">
                <li className="py-2">User JohnDoe signed up</li>
                <li className="py-2">User JaneSmith updated settings</li>
                <li className="py-2">Report generated for July 2023</li>
                <li className="py-2">New message received from Admin</li>
              </ul>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
