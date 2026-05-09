import { useState, useEffect, useRef } from 'react';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const { user, logout } = useAuth();
  const bottomRef = useRef(null);


  const navigate = useNavigate();

  useEffect(() => {
    API.get('/chat/history').then(({ data }) => {
      const history = data.reverse().flatMap(c => ([
        { from: 'user', text: c.userMessage },
        { from: 'bot', text: c.botReply, escalated: c.escalated }
      ]));
      setMessages(history);
    });
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { from: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const { data } = await API.post('/chat/message', { message: input });
      const botMsg = {
        from: 'bot',
        text: data.reply,
        escalated: data.escalated,
        intent: data.intent
      };
      setMessages(prev => [...prev, botMsg]);
    } catch {
      setMessages(prev => [...prev, { from: 'bot', text: 'Something went wrong. Please try again.' }]);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-950 flex-col flex">
      {/* Header */}
     <div className="bg-gray-900 border-b border-purple-900  flex justify-between items-center gap-3 fixed top-0 px-6 py-4  mx-auto w-full">
  <div>
    <h1 className="text-white font-bold text-lg">NeuralChat</h1>
    <p className="text-gray-400 text-sm">Hello, {user?.name}</p>
  </div>

  {/* Nav buttons */}
  <div className="flex items-center gap-3">
    <button
      onClick={() => navigate('/tickets')}
      className="flex items-center gap-2 bg-purple-600/20 hover:bg-purple-600/40 border border-purple-600/40 text-purple-300 hover:text-white text-sm px-4 py-2 rounded-lg transition"
    >
      🎫 My Tickets
    </button>
    <button
      onClick={logout}
      className="text-gray-400 hover:text-white text-sm transition"
    >
      Logout
    </button>
  </div>
</div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 max-w-3xl mx-auto w-full">
        {messages.length === 0 && (
          <p className="text-gray-500 text-center mt-20">Ask me anything about your order, account, or issues!</p>
        )}
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-lg px-4 py-3 rounded-2xl text-sm leading-relaxed ${
              msg.from === 'user'
                ? 'bg-purple-600 text-white rounded-br-sm'
                : 'bg-gray-800 text-gray-100 rounded-bl-sm'
            }`}>
              {msg.text}
              {msg.escalated && (
                <p className="text-yellow-400 text-xs mt-1">⚠️ A support ticket was created for this.</p>
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-800 text-gray-400 px-4 py-3 rounded-2xl text-sm animate-pulse">
              Typing...
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="border-t border-gray-800 p-4 max-w-3xl mx-auto w-full">
        <div className="flex gap-3 fixed bottom-0 left-0 right-0 bg-gray-950 px-6 py-4 max-w-3xl mx-auto w-full">
          <input
            className="flex-1 bg-gray-800 text-white border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 text-sm"
            placeholder="Type your message..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage()}
          />
          <button
            onClick={sendMessage}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition text-sm"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}