import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const { logout } = useAuth();

  useEffect(() => {
    API.get('/admin/stats').then(({ data }) => setStats(data));
  }, []);

  const chartData = stats ? [
    { name: 'Users', value: stats.totalUsers },
    { name: 'Chats', value: stats.totalChats },
    { name: 'Open Tickets', value: stats.openTickets },
    { name: 'Closed', value: stats.closedTickets },
    { name: 'Escalated', value: stats.escalated },
  ] : [];

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button onClick={logout} className="text-gray-400 hover:text-white text-sm">Logout</button>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10">
          {[
            { label: 'Total Users', value: stats.totalUsers, color: 'purple' },
            { label: 'Total Chats', value: stats.totalChats, color: 'blue' },
            { label: 'Open Tickets', value: stats.openTickets, color: 'yellow' },
            { label: 'Closed Tickets', value: stats.closedTickets, color: 'green' },
            { label: 'Escalated', value: stats.escalated, color: 'red' },
          ].map(card => (
            <div key={card.label} className="bg-gray-900 border border-gray-700 rounded-xl p-4 text-center">
              <p className="text-gray-400 text-xs mb-1">{card.label}</p>
              <p className="text-3xl font-bold text-white">{card.value}</p>
            </div>
          ))}
        </div>
      )}

      {/* Chart */}
      <div className="bg-gray-900 border border-gray-700 rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4">Overview</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="name" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', color: '#fff' }} />
            <Bar dataKey="value" fill="#7c3aed" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}