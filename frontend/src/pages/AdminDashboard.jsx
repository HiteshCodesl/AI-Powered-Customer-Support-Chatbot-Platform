import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';


export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const { user, logout } = useAuth();
  
  const navigate = useNavigate();
  
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
     <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
  <div>
    <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
    <p className="text-gray-400 text-sm mt-0.5">Welcome back, {user?.name}</p>
  </div>

  {/* Nav buttons */}
  <div className="flex items-center gap-3">
    <button
      onClick={() => navigate('/tickets')}
      className="flex items-center gap-2 bg-yellow-500/20 hover:bg-yellow-500/30 border border-yellow-500/30 text-yellow-400 hover:text-yellow-300 text-sm px-4 py-2 rounded-lg transition"
    >
      🎫 View All Tickets
    </button>
    <button
      onClick={() => navigate('/chat')}
      className="flex items-center gap-2 bg-purple-600/20 hover:bg-purple-600/40 border border-purple-600/40 text-purple-300 hover:text-white text-sm px-4 py-2 rounded-lg transition"
    >
      💬 Chat
    </button>
    <button
      onClick={logout}
      className="text-gray-400 hover:text-white text-sm transition"
    >
      Logout
    </button>
  </div>
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