import { useState, useEffect, useRef } from 'react';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const SUGGESTIONS = [
  { label: '📦 Track my order',  message: 'Where is my order? I want to track my delivery status.' },
  { label: '💸 Refund status',   message: 'I want to check the status of my refund request.' },
  { label: '🎧 Talk to support', message: 'I need to talk to a human support agent.' },
  { label: '💳 Payment issue',   message: 'I am facing a payment issue with my recent transaction.' },
];

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput]       = useState('');
  const [loading, setLoading]   = useState(false);
  const { user, logout }        = useAuth();
  const navigate                = useNavigate();
  const bottomRef               = useRef(null);

  useEffect(() => {
    API.get('/chat/history').then(({ data }) => {
      const history = data.reverse().flatMap(c => ([
        { from: 'user', text: c.userMessage },
        { from: 'bot',  text: c.botReply, escalated: c.escalated }
      ]));
      setMessages(history);
    }).catch(() => {});
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (overrideText) => {
    const text = overrideText || input;
    if (!text.trim()) return;

    setMessages(prev => [...prev, { from: 'user', text }]);
    setInput('');
    setLoading(true);

    try {
      const { data } = await API.post('/chat/message', { message: text });
      setMessages(prev => [...prev, {
        from: 'bot',
        text: data.reply,
        escalated: data.escalated,
        intent: data.intent
      }]);
    } catch {
      setMessages(prev => [...prev, {
        from: 'bot',
        text: 'Something went wrong. Please try again.'
      }]);
    }
    setLoading(false);
  };

  return (
    <div className="h-screen bg-gray-950 flex flex-col overflow-hidden">

      <div className="bg-gray-900 border-b border-purple-900 px-4 sm:px-6 py-4 flex justify-between items-center shrink-0">
        <div>
          <h1 className="text-white font-bold text-base sm:text-lg">NeuralChat</h1>
          <p className="text-gray-400 text-xs sm:text-sm">Hello, {user?.name}</p>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => navigate('/tickets')}
            className="flex items-center gap-1.5 bg-purple-600/20 hover:bg-purple-600/40 border border-purple-600/40 text-purple-300 hover:text-white text-xs sm:text-sm px-3 sm:px-4 py-2 rounded-lg transition"
          >
            🎫 <span className="hidden sm:inline">My</span> Tickets
          </button>
          <button
            onClick={logout}
            className="text-gray-400 hover:text-white text-xs sm:text-sm transition"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 space-y-4">

          {messages.length === 0 && (
            <div className="text-center mt-16 sm:mt-24 px-4">
              <p className="text-4xl mb-3">👋</p>
              <p className="text-white font-semibold text-lg sm:text-xl">How can we help you today?</p>
              <p className="text-gray-500 text-sm mt-2">
                Type a message or tap a suggestion below
              </p>
            </div>
          )}

          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[85%] sm:max-w-lg px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                msg.from === 'user'
                  ? 'bg-purple-600 text-white rounded-br-sm'
                  : 'bg-gray-800 text-gray-100 rounded-bl-sm'
              }`}>
                {msg.text}
                {msg.escalated && (
                  <p className="text-yellow-400 text-xs mt-1.5">
                    ⚠️ A support ticket was created for this.
                  </p>
                )}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-gray-800 px-4 py-3 rounded-2xl rounded-bl-sm flex gap-1 items-center">
                <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce [animation-delay:0ms]" />
                <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce [animation-delay:150ms]" />
                <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce [animation-delay:300ms]" />
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      </div>

      <div className="shrink-0 border-t border-gray-800 bg-gray-950">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 pt-3 pb-2 my-3">
            {SUGGESTIONS.map((s) => (
              <button
                key={s.label}
                onClick={() => sendMessage(s.message)}
                className="text-sm bg-gray-800 hover:bg-purple-600/30 border border-white hover:border-purple-500 text-gray-300 hover:text-white px-2 py-1 md:px-2 md:py-2 rounded-xl transition"
              >
                {s.label}
              </button>
            ))}
          </div>

          <div className="flex gap-2 sm:gap-3 pb-4 pt-1">
            <input
              className="flex-1 w-full bg-gray-800 text-white border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 text-sm placeholder-gray-500"
              placeholder="Type your message..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
            />
            <button
              onClick={() => sendMessage()}
              className="bg-purple-600 hover:bg-purple-700 active:scale-95 text-white px-4 sm:px-6 py-3 rounded-xl font-semibold transition text-sm shrink-0"
            >
              Send
            </button>
          </div>

        </div>
      </div>

    </div>
  );
}