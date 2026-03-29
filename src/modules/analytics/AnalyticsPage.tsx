import React, { useMemo } from 'react';
import { useAppSelector } from '../../hooks/useAppSelector';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { analyticsData } from '../../utils/mockData';
import Card from '../../components/common/Card';

const COLORS = ['#3b82f6', '#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

const AnalyticsPage: React.FC = () => {
  const patients = useAppSelector(s => s.patients.list);

  const conditionDistribution = useMemo(() => {
    const counts: Record<string, number> = {};
    patients.forEach(p => {
      counts[p.condition] = (counts[p.condition] ?? 0) + 1;
    });
    return Object.entries(counts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  }, [patients]);

  const statusDistribution = useMemo(() => {
    const order = ['Active', 'Stable', 'Critical', 'Discharged'];
    return order.map(status => ({
      day: status,
      patients: patients.filter(p => p.status === status).length,
    }));
  }, [patients]);

  const criticalCount = patients.filter(p => p.status === 'Critical').length;
  const monthlyData = useMemo(() => {
    const data = [...analyticsData.monthly];
    data[data.length - 1] = { ...data[data.length - 1], critical: criticalCount };
    return data;
  }, [criticalCount]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Analytics</h1>
        <p className="text-slate-500 text-sm mt-1">
          Hospital performance and patient trends.{' '}
          <span className="text-blue-500 font-medium">{patients.length} total patients.</span>
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        {/* Monthly Admissions — still mock historical, but shows context */}
        <Card>
          <h3 className="font-semibold text-slate-700 mb-4">Monthly Admissions vs Discharges</h3>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={monthlyData}>
              <defs>
                <linearGradient id="admGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="disGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="admissions" stroke="#3b82f6" fill="url(#admGrad)" strokeWidth={2} />
              <Area type="monotone" dataKey="discharges" stroke="#10b981" fill="url(#disGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        {/* Condition Distribution — fully live */}
        <Card>
          <h3 className="font-semibold text-slate-700 mb-4">
            Condition Distribution
            <span className="text-xs text-slate-400 font-normal ml-2">live</span>
          </h3>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie
                data={conditionDistribution}
                cx="50%"
                cy="50%"
                outerRadius={90}
                dataKey="value"
                label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {conditionDistribution.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        {/* Status Breakdown — fully live */}
        <Card>
          <h3 className="font-semibold text-slate-700 mb-4">
            Patient Status Breakdown
            <span className="text-xs text-slate-400 font-normal ml-2">live</span>
          </h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={statusDistribution}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="day" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="patients" radius={[4, 4, 0, 0]}>
                {statusDistribution.map((entry, i) => (
                  <Cell
                    key={entry.day}
                    fill={
                      entry.day === 'Critical'   ? '#ef4444' :
                      entry.day === 'Active'     ? '#3b82f6' :
                      entry.day === 'Stable'     ? '#10b981' :
                      '#94a3b8'
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Critical Cases Trend — last point is live */}
        <Card>
          <h3 className="font-semibold text-slate-700 mb-4">
            Critical Cases Trend
            <span className="text-xs text-slate-400 font-normal ml-2">last point live</span>
          </h3>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} allowDecimals={false} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="critical"
                stroke="#ef4444"
                strokeWidth={2}
                dot={{ fill: '#ef4444', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

      </div>
    </div>
  );
};

export default AnalyticsPage;