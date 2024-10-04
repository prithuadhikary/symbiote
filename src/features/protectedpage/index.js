import React from 'react';

import { Header } from '../../common/Header';
import { Sidebar } from '../../common/Sidebar';
import { Outlet } from 'react-router-dom';

const ProtectedPage = () => {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-grow bg-gray-100">
        {/* Header */}
        <Header/>

        {/* Main Content Area */}
        <main className="p-6">
          <Outlet/>
        </main>
      </div>
    </div>
  );
};

export default ProtectedPage;
