import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../common/Navbar';
import Sidebar from '../common/Sidebar';

const AppLayout: React.FC = () => (
  <div className="flex flex-col h-screen overflow-hidden bg-slate-50">
    
    <div className="shrink-0 z-30 sticky top-0">
      <Navbar />
    </div>

    <div className="flex flex-1 overflow-hidden">

      <div className="hidden md:block w-56 shrink-0 bg-white border-r border-slate-200 overflow-hidden">
        <Sidebar />
      </div>

      <main className="flex-1 overflow-y-auto min-w-0 bg-slate-50">
        <div className="p-4 md:p-6 max-w-full">
          <Outlet />
        </div>
      </main>

    </div>
  </div>
);

export default AppLayout;