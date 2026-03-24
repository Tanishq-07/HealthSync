import React from 'react';
import { useAppSelector } from '../../hooks/useAppSelector';
import { Users, AlertTriangle, TrendingUp, Calendar, UserCheck, Activity } from 'lucide-react';
import { mockPatients } from '../../utils/mockData';
import Card from '../../components/common/Card';
import Badge, { getStatusVariant } from '../../components/common/Badge';

const StatCard: React.FC<{ label: string; value: number; icon: React.ReactNode; color: string; sub?: string }> = ({ label, value, icon, color, sub }) => (
  <Card className="flex items-center gap-4">
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>{icon}</div>
    <div>
      <p className="text-2xl font-bold text-slate-800">{value.toLocaleString()}</p>
      <p className="text-sm text-slate-500">{label}</p>
      {sub && <p className="text-xs text-emerald-500 font-medium mt-0.5">{sub}</p>}
    </div>
  </Card>
);

const DashboardPage: React.FC = () => {
  const { stats } = useAppSelector(s => s.dashboard);
  const { user } = useAppSelector(s => s.auth);
  const recentPatients = mockPatients.slice(0, 5);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Welcome back, {user?.name} 👋</h1>
        <p className="text-slate-500 text-sm mt-1">Here's what's happening at your facility today.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        <StatCard label="Total Patients" value={stats.totalPatients} icon={<Users className="w-6 h-6 text-blue-600" />} color="bg-blue-50" sub="↑ 8% this month" />
        <StatCard label="Active Cases" value={stats.activeCases} icon={<Activity className="w-6 h-6 text-indigo-600" />} color="bg-indigo-50" />
        <StatCard label="Critical Cases" value={stats.criticalCases} icon={<AlertTriangle className="w-6 h-6 text-red-600" />} color="bg-red-50" sub="Needs attention" />
        <StatCard label="Recovered" value={stats.recovered} icon={<TrendingUp className="w-6 h-6 text-emerald-600" />} color="bg-emerald-50" sub="↑ 12% this month" />
        <StatCard label="Today's Appointments" value={stats.todayAppointments} icon={<Calendar className="w-6 h-6 text-amber-600" />} color="bg-amber-50" />
        <StatCard label="Available Doctors" value={stats.availableDoctors} icon={<UserCheck className="w-6 h-6 text-purple-600" />} color="bg-purple-50" />
      </div>

      <Card padding="sm">
        <div className="p-3 border-b border-slate-100 mb-1">
          <h2 className="font-semibold text-slate-800">Recent Patients</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wide">
                <th className="text-left px-5 py-3">Patient</th>
                <th className="text-left px-5 py-3">Condition</th>
                <th className="text-left px-5 py-3">Doctor</th>
                <th className="text-left px-5 py-3">Status</th>
                <th className="text-left px-5 py-3">Admitted</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {recentPatients.map(p => (
                <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-semibold text-xs">{p.avatar}</div>
                      <div>
                        <p className="font-medium text-slate-800">{p.name}</p>
                        <p className="text-xs text-slate-400">{p.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-slate-600">{p.condition}</td>
                  <td className="px-5 py-3 text-slate-600">{p.doctor}</td>
                  <td className="px-5 py-3">
                    <Badge label={p.status} variant={getStatusVariant(p.status)} />
                  </td>
                  <td className="px-5 py-3 text-slate-500">{p.admittedOn}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default DashboardPage;