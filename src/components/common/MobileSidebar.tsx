import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, BarChart2, Users, Menu } from 'lucide-react';

const links = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/analytics', icon: BarChart2, label: 'Analytics' },
  { to: '/patients', icon: Users, label: 'Patients' },
];

const MobileSidebar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  const openSidebar = () => {
    setVisible(true);
    requestAnimationFrame(() => setOpen(true));
  };

  const closeSidebar = () => {
    setOpen(false);
    setTimeout(() => setVisible(false), 300);
  };

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      <button
        onClick={openSidebar}
        className="md:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors"
      >
        <Menu className="w-5 h-5" />
      </button>

      {visible && (
        <div className="fixed inset-0 top-16 z-50 md:hidden">

          {/* Backdrop */}
          <div
            onClick={closeSidebar}
            className="absolute inset-0 transition-opacity duration-300"
            style={{ backgroundColor: open ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0)' }}
          />

          <div
            className="absolute left-0 top-0 bottom-0 w-64 bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-in-out"
            style={{ transform: open ? 'translateX(0)' : 'translateX(-100%)' }}
          >
            <div className="px-3 pt-4 pb-2">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest px-4">
                Main Menu
              </p>
            </div>

            <nav className="px-3 space-y-1 flex-1">
              {links.map(({ to, icon: Icon, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === '/'}
                  onClick={closeSidebar}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-800'
                    }`
                  }
                >
                  <Icon className="w-5 h-5" /> {label}
                </NavLink>
              ))}
            </nav>

            <div className="p-4 border-t border-slate-100">
              <div className="bg-blue-50 rounded-xl p-4">
                <p className="text-xs font-semibold text-blue-700 mb-1">HealthSync</p>
                <p className="text-xs text-blue-500">Healthcare Management</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileSidebar;