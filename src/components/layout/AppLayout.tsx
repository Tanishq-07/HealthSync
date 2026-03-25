import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../common/Navbar';
import Sidebar from '../common/Sidebar';

const AppLayout: React.FC = () => (
  <div className="flex flex-col min-h-screen bg-slate-50">
    <Navbar />
    <div className="flex flex-1">

      <div className="hidden md:block w-56 shrink-0">
        <div className="fixed top-16 left-0 w-56 h-[calc(100vh-4rem)] bg-white border-r border-slate-200 overflow-hidden">
          <Sidebar />
        </div>
      </div>

      <main className="flex-1 overflow-y-auto min-w-0 min-h-[calc(100vh-4rem)] bg-slate-50">
        <div className="p-4 md:p-6 max-w-full">
          <Outlet />
        </div>
      </main>

    </div>
  </div>
);

export default AppLayout;