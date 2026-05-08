import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';

const STATUS_STYLES = {
  open: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30',
  'in-progress': 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
  closed: 'bg-green-500/20 text-green-400 border border-green-500/30',
};

export default function TicketPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [tickets, setTickets] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [form, setForm] = useState({ title: '', description: '' });

  const [statusFilter, setStatusFilter] = useState('all');
  const [search, setSearch] = useState('');

  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchTickets();
  }, []);

  useEffect(() => {
    let result = [...tickets];

    if (statusFilter !== 'all')
      result = result.filter(t => t.status === statusFilter);

    if (search.trim())
      result = result.filter(t =>
        t.title.toLowerCase().includes(search.toLowerCase()) ||
        t.description.toLowerCase().includes(search.toLowerCase())
      );

    setFiltered(result);
  }, [tickets, statusFilter, search]);

  const fetchTickets = async () => {
    setLoading(true);
    try {
      const { data } = await API.get('/tickets/mine');
      setTickets(data);
    } catch {
      setError('Could not load tickets.');
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.description.trim()) {
      setError('Both fields are required.');
      return;
    }
    setSubmitting(true);
    setError('');
    try {
      await API.post('/tickets', form);
      setForm({ title: '', description: '' });
      setShowForm(false);
      setSuccess('Ticket created successfully!');
      setTimeout(() => setSuccess(''), 3000);
      fetchTickets();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create ticket.');
    }
    setSubmitting(false);
  };

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric', month: 'short', day: 'numeric',
    });

  return (
    <div className="min-h-screen bg-gray-950 text-white">

      <div className="bg-gray-900 border-b border-purple-900 px-6 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-white font-bold text-lg">Support Tickets</h1>
          <p className="text-gray-400 text-sm">Hello, {user?.name}</p>
        </div>
        <div className="flex gap-4 items-center">
          <button
            onClick={() => navigate('/chat')}
            className="text-purple-400 hover:text-purple-300 text-sm transition"
          >
            ← Back to Chat
          </button>
          <button
            onClick={logout}
            className="text-gray-400 hover:text-white text-sm transition"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">

        {success && (
          <div className="mb-4 bg-green-500/20 border border-green-500/30 text-green-400 rounded-xl px-4 py-3 text-sm">
            ✅ {success}
          </div>
        )}
        {error && (
          <div className="mb-4 bg-red-500/20 border border-red-500/30 text-red-400 rounded-xl px-4 py-3 text-sm">
            ⚠️ {error}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <input
            type="text"
            placeholder="Search tickets..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="flex-1 bg-gray-800 text-white border border-gray-700 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-purple-500"
          />

          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="bg-gray-800 text-gray-300 border border-gray-700 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-purple-500"
          >
            <option value="all">All Status</option>
            <option value="open">Open</option>
            <option value="in-progress">In Progress</option>
            <option value="closed">Closed</option>
          </select>

          <button
            onClick={() => { setShowForm(prev => !prev); setError(''); }}
            className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition whitespace-nowrap"
          >
            {showForm ? '✕ Cancel' : '+ New Ticket'}
          </button>
        </div>

        {showForm && (
          <div className="bg-gray-900 border border-purple-800 rounded-2xl p-6 mb-6 shadow-lg shadow-purple-900/20">
            <h2 className="text-lg font-semibold mb-4 text-purple-300">Create New Ticket</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-gray-400 text-xs mb-1 block">Title</label>
                <input
                  type="text"
                  placeholder="Brief summary of your issue"
                  value={form.title}
                  onChange={e => setForm({ ...form, title: e.target.value })}
                  className="w-full bg-gray-800 text-white border border-gray-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-500"
                />
              </div>
              <div>
                <label className="text-gray-400 text-xs mb-1 block">Description</label>
                <textarea
                  rows={4}
                  placeholder="Describe your issue in detail..."
                  value={form.description}
                  onChange={e => setForm({ ...form, description: e.target.value })}
                  className="w-full bg-gray-800 text-white border border-gray-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-500 resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition text-sm"
              >
                {submitting ? 'Submitting...' : 'Submit Ticket'}
              </button>
            </form>
          </div>
        )}

        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { label: 'Open', status: 'open', color: 'yellow' },
            { label: 'In Progress', status: 'in-progress', color: 'blue' },
            { label: 'Closed', status: 'closed', color: 'green' },
          ].map(({ label, status, color }) => (
            <button
              key={status}
              onClick={() => setStatusFilter(prev => prev === status ? 'all' : status)}
              className={`rounded-xl p-3 text-center border transition cursor-pointer
                ${statusFilter === status
                  ? `bg-${color}-500/30 border-${color}-500/50`
                  : 'bg-gray-900 border-gray-700 hover:border-gray-500'
                }`}
            >
              <p className={`text-xl font-bold text-${color}-400`}>
                {tickets.filter(t => t.status === status).length}
              </p>
              <p className="text-gray-400 text-xs mt-0.5">{label}</p>
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center text-gray-500 py-20">Loading tickets...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No tickets found</p>
            <p className="text-gray-600 text-sm mt-1">
              {search || statusFilter !== 'all'
                ? 'Try clearing your filters'
                : 'Click "+ New Ticket" to create one'}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map(ticket => (
              <div
                key={ticket._id}
                className="bg-gray-900 border border-gray-700 hover:border-purple-700 rounded-2xl p-5 transition group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h3 className="text-white font-semibold text-sm truncate">
                        {ticket.title}
                      </h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_STYLES[ticket.status]}`}>
                        {ticket.status}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm line-clamp-2">
                      {ticket.description}
                    </p>
                  </div>

                  <div className="text-right shrink-0">
                    <p className="text-gray-500 text-xs">{formatDate(ticket.createdAt)}</p>
                    <p className="text-gray-600 text-xs mt-0.5">
                      #{ticket._id.slice(-6).toUpperCase()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}