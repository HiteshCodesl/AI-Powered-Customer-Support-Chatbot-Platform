import { useState, useEffect, useRef } from 'react';
import {
  MessageSquare, Zap, Brain, Shield, Globe, ChevronRight,
  ArrowRight, Check, Star, Menu, X, Sparkles, Bot,
  BarChart3, Lock, Layers, Cpu, TrendingUp, Users, Mail, Play,
  GitBranchIcon,
  Bird
} from 'lucide-react';
import { Link } from 'react-router-dom';

const NAV_LINKS = ['Features', 'How it Works', 'Pricing', 'Testimonials'];

const FEATURES = [
  {
    icon: Brain,
    title: 'Deep NLP Understanding',
    description: 'Our transformer-based models parse context, intent, and nuance with 99.2% accuracy across 50+ languages.',
    color: 'from-violet-500 to-purple-600',
  },
  {
    icon: Zap,
    title: 'Real-time Responses',
    description: 'Sub-50ms response latency powered by our globally distributed edge inference network.',
    color: 'from-fuchsia-500 to-violet-600',
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'SOC 2 Type II certified, end-to-end encrypted, with zero data retention options for regulated industries.',
    color: 'from-purple-500 to-violet-600',
  },
  {
    icon: Globe,
    title: 'Multilingual by Default',
    description: 'Seamlessly switch between 50+ languages mid-conversation without losing context or intent.',
    color: 'from-violet-600 to-fuchsia-500',
  },
  {
    icon: BarChart3,
    title: 'Sentiment Analytics',
    description: 'Track conversation health, emotional trends, and engagement metrics with granular dashboards.',
    color: 'from-purple-600 to-violet-500',
  },
  {
    icon: Layers,
    title: 'API-First Platform',
    description: 'RESTful and GraphQL APIs with SDKs for every major language. Webhooks, streaming, batch processing.',
    color: 'from-fuchsia-600 to-purple-500',
  },
];

const STEPS = [
  {
    number: '01',
    title: 'Connect Your Data',
    description: 'Integrate with your existing chat platforms, CRMs, and data sources via our universal connectors.',
    icon: Layers,
  },
  {
    number: '02',
    title: 'Train Your Model',
    description: 'Fine-tune NeuralChat on your domain-specific language and terminology in minutes, not months.',
    icon: Cpu,
  },
  {
    number: '03',
    title: 'Deploy Instantly',
    description: 'Go live with one click. Scale from 100 to 100 million conversations without infrastructure headaches.',
    icon: Zap,
  },
  {
    number: '04',
    title: 'Analyze & Improve',
    description: 'Continuously improve accuracy with automated feedback loops and active learning pipelines.',
    icon: TrendingUp,
  },
];

const PLANS = [
  {
    name: 'Starter',
    price: '$29',
    period: '/month',
    description: 'Perfect for indie developers and small projects',
    features: ['10,000 messages/month', '5 languages', 'Basic sentiment analysis', 'REST API access', 'Community support'],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Pro',
    price: '$99',
    period: '/month',
    description: 'For growing teams that need more power',
    features: ['100,000 messages/month', '25 languages', 'Advanced NLP + intent detection', 'Webhooks & streaming', 'Custom model fine-tuning', 'Priority support'],
    cta: 'Start Free Trial',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'Tailored solutions for large organizations',
    features: ['Unlimited messages', 'All 50+ languages', 'Dedicated inference cluster', 'On-premise deployment', 'SLA guarantee', 'Dedicated CSM'],
    cta: 'Contact Sales',
    popular: false,
  },
];

const TESTIMONIALS = [
  {
    name: 'Sarah Chen',
    role: 'CTO at Veridian AI',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop',
    text: 'NeuralChat reduced our support resolution time by 68%. The contextual understanding is miles ahead of anything we\'ve tried before.',
    stars: 5,
  },
  {
    name: 'Marcus Williams',
    role: 'Head of Product at Nexus Corp',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop',
    text: 'We process 2M+ messages daily without a single outage. The reliability and speed are genuinely impressive.',
    stars: 5,
  },
  {
    name: 'Aisha Patel',
    role: 'Lead Developer at Pulsar Labs',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop',
    text: 'The API documentation is stellar and integration took half a day. The sentiment analytics dashboard is addictive.',
    stars: 5,
  },
];

const STATS = [
  { value: '99.2%', label: 'NLP Accuracy' },
  { value: '<50ms', label: 'Avg Latency' },
  { value: '50+', label: 'Languages' },
  { value: '2B+', label: 'Messages Processed' },
];

function useScrollReveal(threshold = 0.15) {
   const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
}

function ChatDemo() {
  const messages = [
    { role: 'user', text: 'Can you analyze the sentiment of our last 500 customer reviews?' },
    { role: 'ai', text: 'Analyzing 500 reviews... 78% positive, 14% neutral, 8% negative. Top themes: product quality (+), delivery speed (-), support experience (+). Shall I generate a full report?' },
    { role: 'user', text: 'Yes, and flag any urgent issues.' },
    { role: 'ai', text: '3 urgent issues flagged: shipping delays in EU region, billing confusion for annual plans, and a recurring login bug on iOS 17. I\'ve created action items for each team.' },
  ];

  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (shown >= messages.length) return;
    const t = setTimeout(() => setShown(s => s + 1), shown === 0 ? 600 : 1400);
    return () => clearTimeout(t);
  }, [shown, messages.length]);

  return (
    <div className="card-glass rounded-2xl p-6 max-w-md w-full mx-auto gradient-border">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-violet-500/20">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
          <Bot size={16} className="text-white" />
        </div>
        <div>
          <p className="text-sm font-semibold text-white">NeuralChat Assistant</p>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" style={{ animation: 'pulseGlow 2s ease-in-out infinite' }} />
            <p className="text-xs text-slate-400">Online · NLP v4.2</p>
          </div>
        </div>
        <div className="ml-auto flex gap-1">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
        </div>
      </div>

      <div className="space-y-4 min-h-[280px]">
        {messages.slice(0, shown).map((msg, i) => (
          <div
            key={i}
            className={`flex gap-3 animate-slide-up ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
          >
            {msg.role === 'ai' && (
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-600 flex-shrink-0 flex items-center justify-center mt-0.5">
                <Sparkles size={12} className="text-white" />
              </div>
            )}
            <div
              className={`rounded-2xl px-4 py-3 text-sm max-w-[85%] leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-violet-600/30 border border-violet-500/30 text-slate-100 rounded-tr-sm'
                  : 'bg-slate-800/60 border border-slate-700/40 text-slate-200 rounded-tl-sm'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {shown < messages.length && (
          <div className="flex gap-3">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-600 flex-shrink-0 flex items-center justify-center">
              <Sparkles size={12} className="text-white" />
            </div>
            <div className="bg-slate-800/60 border border-slate-700/40 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1.5">
              {[0, 1, 2].map(i => (
                <span
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-violet-400"
                  style={{ animation: `typing 1s ease-in-out ${i * 0.2}s infinite alternate` }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 flex gap-2 items-center bg-slate-900/60 border border-violet-500/20 rounded-xl px-4 py-3">
        <span className="text-xs text-slate-500 flex-1">Ask anything...</span>
        <div className="w-6 h-6 rounded-lg bg-violet-600 flex items-center justify-center">
          <ArrowRight size={12} className="text-white" />
        </div>
      </div>
    </div>
  );
}

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-[#050508]/90 backdrop-blur-xl border-b border-violet-500/10 py-3' : 'py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center animate-pulse-glow">
            <MessageSquare size={18} className="text-white" />
          </div>
          <span className="font-bold text-xl text-white tracking-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Neural<span className="text-gradient">Chat</span>
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(link => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
              className="text-sm text-slate-400 hover:text-violet-300 transition-colors duration-200 font-medium"
            >
              {link}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link to={'/login'}>
          <button className="text-sm text-slate-300 hover:text-white transition-colors font-medium px-4 py-2">
            Sign In
          </button>
           </Link>
           <Link to={'/chat'}>
          <button className="text-sm font-semibold bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white px-5 py-2.5 rounded-xl hover:from-violet-500 hover:to-fuchsia-500 transition-all duration-200"
            style={{ boxShadow: '0 0 20px rgba(139, 92, 246, 0.25)' }}>
            Get Started Free
          </button>
          </Link>
        </div>

        <button
          className="md:hidden text-slate-300 hover:text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-[#0a0a14]/95 backdrop-blur-xl border-t border-violet-500/10 px-6 py-4 space-y-3">
          {NAV_LINKS.map(link => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
              className="block text-slate-300 hover:text-violet-300 py-2 font-medium"
              onClick={() => setMenuOpen(false)}
            >
              {link}
            </a>
          ))}
          <button className="w-full mt-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white py-3 rounded-xl font-semibold">
            Get Started Free
          </button>
        </div>
      )}
    </nav>
  );
}

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="animate-orb-1 absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #7c3aed 0%, transparent 70%)' }} />
        <div className="animate-orb-2 absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full opacity-15"
          style={{ background: 'radial-gradient(circle, #a21caf 0%, transparent 70%)' }} />
        <div className="animate-orb-3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #5b21b6 0%, transparent 70%)' }} />
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(167,139,250,1) 1px, transparent 1px), linear-gradient(90deg, rgba(167,139,250,1) 1px, transparent 1px)',
            backgroundSize: '64px 64px'
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        <div className="text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-violet-500/30 bg-violet-500/10 text-sm text-violet-300 font-medium mb-8">
            <Sparkles size={14} className="text-fuchsia-400" />
            NLP v4.2 — 40% smarter than GPT-4
            <ChevronRight size={14} className="text-violet-400" />
          </div>

          <h1 className="text-5xl lg:text-7xl font-bold text-white leading-[1.05] tracking-tight mb-6" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Chat that truly{' '}
            <span className="text-gradient block">understands</span>
            <span className="text-slate-300"> you.</span>
          </h1>

          <p className="text-lg text-slate-400 leading-relaxed max-w-lg mx-auto lg:mx-0 mb-10">
            NeuralChat decodes context, sentiment, and intent with unmatched precision.
            Build AI-powered conversations that feel genuinely human — at any scale.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link to={'/chat'}>
            <button className="group flex items-center justify-center gap-2.5 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-semibold px-8 py-4 rounded-2xl hover:from-violet-500 hover:to-fuchsia-500 transition-all duration-300 text-base"
              style={{ boxShadow: '0 0 40px rgba(139, 92, 246, 0.3), 0 0 80px rgba(139, 92, 246, 0.1)' }}>
              Start Building Free
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            </Link>
            <button className="group flex items-center justify-center gap-2.5 border border-violet-500/30 text-slate-200 font-semibold px-8 py-4 rounded-2xl hover:bg-violet-500/10 hover:border-violet-400/50 transition-all duration-300 text-base">
              <Play size={16} className="text-violet-400" />
              Watch Demo
            </button>
          </div>

          <div className="mt-10 flex items-center gap-4 justify-center lg:justify-start">
            <div className="flex -space-x-2">
              {[
                'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop',
                'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop',
                'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop',
                'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop',
              ].map((src, i) => (
                <img key={i} src={src} alt="" className="w-8 h-8 rounded-full border-2 border-[#050508] object-cover" />
              ))}
            </div>
            <p className="text-sm text-slate-400">
              <span className="text-white font-semibold">12,000+</span> developers trust NeuralChat
            </p>
          </div>
        </div>

        <div className="animate-float">
          <ChatDemo />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 border-t border-violet-500/10 bg-[#050508]/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-5 grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS.map(stat => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl font-bold text-gradient-subtle">{stat.value}</p>
              <p className="text-xs text-slate-500 mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Features() {
  const { ref, visible } = useScrollReveal();
  return (
    <section id="features" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-5"
          style={{ background: 'radial-gradient(circle, #7c3aed 0%, transparent 60%)' }} />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-violet-500/25 bg-violet-500/8 text-sm text-violet-300 font-medium mb-6">
            <Cpu size={14} />
            Built on cutting-edge NLP
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-5" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Everything you need to build
            <br />
            <span className="text-gradient">intelligent conversations</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            From intent detection to multilingual support, NeuralChat gives you
            every tool to create chat experiences that truly resonate.
          </p>
        </div>

        <div
          ref={ref}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          style={{ transition: 'all 0.7s ease', opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(32px)' }}
        >
          {FEATURES.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div
                key={i}
                className="card-glass card-glass-hover rounded-2xl p-7"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-5`}
                  style={{ boxShadow: '0 0 20px rgba(139, 92, 246, 0.25)' }}>
                  <Icon size={22} className="text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-3" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{feature.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const { ref, visible } = useScrollReveal();
  return (
    <section id="how-it-works" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-violet-500/25 bg-violet-500/8 text-sm text-violet-300 font-medium mb-6">
            <Zap size={14} />
            Simple to start, powerful at scale
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-5" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            From zero to production
            <br />
            <span className="text-gradient">in under an hour</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-xl mx-auto">
            Our streamlined onboarding gets you up and running without the
            typical ML infrastructure headaches.
          </p>
        </div>

        <div
          ref={ref}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          style={{ transition: 'all 0.7s ease', opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(32px)' }}
        >
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={i} className="relative">
                {i < STEPS.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-px z-0"
                    style={{ background: 'linear-gradient(90deg, rgba(139,92,246,0.4) 0%, transparent 100%)' }} />
                )}
                <div className="card-glass card-glass-hover rounded-2xl p-7 relative z-10 h-full">
                  <div className="flex items-start justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center">
                      <Icon size={20} className="text-white" />
                    </div>
                    <span className="text-4xl font-black leading-none" style={{ color: 'rgba(109, 40, 217, 0.4)' }}>{step.number}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{step.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const { ref, visible } = useScrollReveal();
  return (
    <section id="pricing" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] opacity-10"
          style={{ background: 'radial-gradient(ellipse at top, #7c3aed 0%, transparent 70%)' }} />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-violet-500/25 bg-violet-500/8 text-sm text-violet-300 font-medium mb-6">
            <TrendingUp size={14} />
            Transparent pricing, no surprises
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-5" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Scale as you grow
          </h2>
          <p className="text-lg text-slate-400 max-w-xl mx-auto">
            Start free, upgrade when you need it. All plans include a 14-day trial of the next tier.
          </p>
        </div>

        <div
          ref={ref}
          className="grid md:grid-cols-3 gap-6"
          style={{ transition: 'all 0.7s ease', opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(32px)' }}
        >
          {PLANS.map((plan, i) => (
            <div
              key={i}
              className={`relative rounded-2xl p-8 flex flex-col ${
                plan.popular
                  ? 'border border-violet-400/40'
                  : 'card-glass'
              }`}
              style={plan.popular ? {
                background: 'linear-gradient(to bottom, rgba(109,40,217,0.2), rgba(112,26,117,0.1))',
                boxShadow: '0 0 40px rgba(139, 92, 246, 0.3), 0 0 80px rgba(139, 92, 246, 0.1)'
              } : {}}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1.5 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white text-xs font-bold tracking-wide uppercase">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-7">
                <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{plan.name}</h3>
                <p className="text-slate-400 text-sm mb-5">{plan.description}</p>
                <div className="flex items-end gap-1">
                  <span className={`text-5xl font-black ${plan.popular ? 'text-gradient' : 'text-white'}`} style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                    {plan.price}
                  </span>
                  {plan.period && <span className="text-slate-400 mb-2">{plan.period}</span>}
                </div>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-start gap-3 text-sm">
                    <Check size={16} className={`flex-shrink-0 mt-0.5 ${plan.popular ? 'text-fuchsia-400' : 'text-violet-400'}`} />
                    <span className="text-slate-300">{f}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 ${
                  plan.popular
                    ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white hover:from-violet-500 hover:to-fuchsia-500'
                    : 'border border-violet-500/30 text-violet-300 hover:bg-violet-500/10 hover:border-violet-400/50'
                }`}
                style={plan.popular ? { boxShadow: '0 0 20px rgba(139, 92, 246, 0.25)' } : {}}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const { ref, visible } = useScrollReveal();
  return (
    <section id="testimonials" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-violet-500/25 bg-violet-500/8 text-sm text-violet-300 font-medium mb-6">
            <Users size={14} />
            Trusted by thousands
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-5" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Loved by builders
            <br />
            <span className="text-gradient">around the world</span>
          </h2>
        </div>

        <div
          ref={ref}
          className="grid md:grid-cols-3 gap-6"
          style={{ transition: 'all 0.7s ease', opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(32px)' }}
        >
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="card-glass card-glass-hover rounded-2xl p-7">
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.stars }).map((_, j) => (
                  <Star key={j} size={14} className="text-amber-400 fill-amber-400" />
                ))}
              </div>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover border border-violet-500/30" />
                <div>
                  <p className="text-white font-semibold text-sm">{t.name}</p>
                  <p className="text-slate-500 text-xs">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-20"
          style={{ background: 'radial-gradient(ellipse at center, #6d28d9 0%, transparent 65%)' }} />
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(167,139,250,1) 1px, transparent 1px), linear-gradient(90deg, rgba(167,139,250,1) 1px, transparent 1px)',
            backgroundSize: '48px 48px'
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-violet-400/30 bg-violet-500/10 text-sm text-violet-300 font-medium mb-8">
          <Sparkles size={14} className="text-fuchsia-400" />
          No credit card required
        </div>
        <h2 className="text-5xl lg:text-6xl font-black text-white mb-6 leading-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
          Ready to build
          <br />
          <span className="shimmer-text">smarter conversations?</span>
        </h2>
        <p className="text-lg text-slate-400 max-w-xl mx-auto mb-10">
          Join 12,000+ developers who use NeuralChat to power their AI-driven
          applications. Start free, scale infinitely.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="group flex items-center justify-center gap-2.5 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-bold px-10 py-4 rounded-2xl hover:from-violet-500 hover:to-fuchsia-500 transition-all duration-300 text-base"
            style={{ boxShadow: '0 0 40px rgba(139, 92, 246, 0.3), 0 0 80px rgba(139, 92, 246, 0.1)' }}>
            Get Started for Free
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="group flex items-center justify-center gap-2.5 border border-violet-500/30 text-slate-200 font-semibold px-8 py-4 rounded-2xl hover:bg-violet-500/10 hover:border-violet-400/50 transition-all duration-300 text-base">
            <Mail size={16} className="text-violet-400" />
            Talk to Sales
          </button>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-violet-500/10" style={{ background: '#030305' }}>
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-12">
          <div className="col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center">
                <MessageSquare size={18} className="text-white" />
              </div>
              <span className="font-bold text-xl text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                Neural<span className="text-gradient">Chat</span>
              </span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs mb-5">
              The most advanced NLP-powered chat platform. Build intelligent conversations at scale.
            </p>
            <div className="flex gap-3">
              {[Bird, GitBranchIcon, Users ].map((Icon, i) => (
                <button key={i} className="w-9 h-9 rounded-xl border border-violet-500/20 flex items-center justify-center text-slate-400 hover:text-violet-300 hover:border-violet-500/40 transition-all duration-200">
                  <Icon size={16} />
                </button>
              ))}
            </div>
          </div>

          {[
            { title: 'Product', links: ['Features', 'Pricing', 'Changelog', 'Roadmap'] },
            { title: 'Developers', links: ['Documentation', 'API Reference', 'SDKs', 'Status'] },
            { title: 'Company', links: ['About', 'Blog', 'Careers', 'Contact'] },
          ].map(col => (
            <div key={col.title}>
              <p className="text-white font-semibold text-sm mb-4">{col.title}</p>
              <ul className="space-y-3">
                {col.links.map(link => (
                  <li key={link}>
                    <a href="#" className="text-slate-500 hover:text-violet-300 text-sm transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-violet-500/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-600 text-sm">
            © 2026 NeuralChat, Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-slate-600 hover:text-slate-400 text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-slate-600 hover:text-slate-400 text-sm transition-colors">Terms of Service</a>
            <div className="flex items-center gap-2">
              <Lock size={12} className="text-emerald-500" />
              <span className="text-slate-600 text-sm">SOC 2 Certified</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function Landing() {
  return (
    <div className="min-h-screen" style={{ background: '#050508' }}>
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <Pricing />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
}
