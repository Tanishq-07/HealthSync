import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, BarChart2, Users } from 'lucide-react';

const links = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/analytics', icon: BarChart2, label: 'Analytics' },
  { to: '/patients', icon: Users, label: 'Patients' },
];

const Sidebar: React.FC = () => (
  <aside className="w-56 pt-4">
    <div className="px-3 mb-4">
      <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest px-4">
        Main Menu
      </p>
    </div>
    <nav className="px-3 space-y-1">
      {links.map(({ to, icon: Icon, label }) => (
        <NavLink
          key={to}
          to={to}
          end={to === '/'}
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

    <div className="absolute bottom-6 left-0 w-56 px-6">
      <div className="bg-blue-50 rounded-xl p-4">
        <p className="text-xs font-semibold text-blue-700 mb-1">HealthCore v1.0</p>
        <p className="text-xs text-blue-500">Healthcare Management</p>
      </div>
    </div>
  </aside>
);

export default Sidebar;