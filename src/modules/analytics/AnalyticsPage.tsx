import React from 'react';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { analyticsData } from '../../utils/mockData';
import Card from '../../components/common/Card';

const COLORS = ['#3b82f6', '#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

const AnalyticsPage: React.FC = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-bold text-slate-800">Analytics</h1>
      <p className="text-slate-500 text-sm mt-1">Hospital performance and patient trends.</p>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <Card>
        <h3 className="font-semibold text-slate-700 mb-4">Monthly Admissions vs Discharges</h3>
        <ResponsiveContainer width="100%" height={240}>
          <AreaChart data={analyticsData.monthly}>
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

      <Card>
        <h3 className="font-semibold text-slate-700 mb-4">Condition Distribution</h3>
        <ResponsiveContainer width="100%" height={240}>
          <PieChart>
            <Pie
              data={analyticsData.conditionDistribution}
              cx="50%"
              cy="50%"
              outerRadius={90}
              dataKey="value"
              label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
              labelLine={false}
            >
              {analyticsData.conditionDistribution.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </Card>

      <Card>
        <h3 className="font-semibold text-slate-700 mb-4">Weekly Patient Load</h3>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={analyticsData.weeklyTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="day" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Bar dataKey="patients" fill="#6366f1" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <Card>
        <h3 className="font-semibold text-slate-700 mb-4">Critical Cases Trend</h3>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={analyticsData.monthly}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Line type="monotone" dataKey="critical" stroke="#ef4444" strokeWidth={2} dot={{ fill: '#ef4444', r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </div>
  </div>
);

export default AnalyticsPage;