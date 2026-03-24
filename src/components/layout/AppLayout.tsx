import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../common/Navbar';
import Sidebar from '../common/Sidebar';

const AppLayout: React.FC = () => (
  <div className="flex flex-col min-h-screen">
    <Navbar />
    <div className="flex flex-1">
      <div className="hidden md:block w-56 shrink-0">
        <div className="fixed top-16 left-0 w-56 h-[calc(100vh-4rem)] bg-white border-r border-slate-200 overflow-y-auto">
          <Sidebar />
        </div>
      </div>
      <main className="flex-1 p-6 overflow-auto min-h-[calc(100vh-4rem)]">
        <Outlet />
      </main>
    </div>
  </div>
);

export default AppLayout;