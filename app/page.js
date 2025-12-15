'use client';

import { useState, useRef, useEffect } from 'react';
import Avatar from './components/Avatar';

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages([...messages, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: data.message || data.error
      }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.'
      }]);
    }
    
    setIsLoading(false);
  };

  const quickPrompts = [
    "💼 Tell me about your AI projects",
    "🎓 What certifications do you have?",
    "⚡ What technologies do you work with?",
    "🎯 What role are you looking for?"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-900">
      
      {/* Main Container - Centered */}
      <div className="min-h-screen flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-5xl">
          
          {/* Header Card */}
          <div className="text-center mb-8 animate-fade-in">
            <div className="inline-block">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 flex items-center justify-center text-4xl font-bold shadow-2xl shadow-purple-500/50 animate-pulse">
                M
              </div>
              <h1 className="text-6xl font-black mb-3 bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                Miguel
              </h1>
              <p className="text-xl text-purple-300 mb-2 font-medium">AI-Powered Resume Assistant</p>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/20 border border-green-400/30">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                <span className="text-green-300 text-sm font-semibold">Online</span>
              </div>
            </div>
          </div>

          {/* Avatar Section */}
          <div className="mb-8">
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/20 p-8 shadow-2xl">
              <div className="max-w-md mx-auto">
                <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-purple-600/30 to-pink-600/30 mb-6 shadow-inner">
                  <Avatar isSpeaking={isLoading} />
                </div>
                <div className="text-center space-y-3">
                  <h2 className="text-2xl font-bold text-white">Computer Science Graduate</h2>
                  <p className="text-purple-300">BS Computer Science • AI Specialization</p>
                  <p className="text-purple-400 text-sm">Mapúa University</p>
                  <div className="flex flex-wrap justify-center gap-2 pt-4">
                    <span className="px-4 py-2 rounded-full bg-blue-500/20 text-blue-300 text-sm font-medium border border-blue-400/30">
                      Python
                    </span>
                    <span className="px-4 py-2 rounded-full bg-purple-500/20 text-purple-300 text-sm font-medium border border-purple-400/30">
                      AI/ML
                    </span>
                    <span className="px-4 py-2 rounded-full bg-pink-500/20 text-pink-300 text-sm font-medium border border-pink-400/30">
                      RAG Systems
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Chat Section */}
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
            
            {/* Messages */}
            <div className="h-96 overflow-y-auto p-6 space-y-4">
              {messages.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-6xl mb-6 animate-bounce">👋</div>
                  <h3 className="text-3xl font-bold mb-3 text-white">Hi! I'm Miguel</h3>
                  <p className="text-purple-300 mb-8 text-lg">Ask me anything about my skills, projects, or experience</p>
                  
                  {/* Quick Prompts */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                    {quickPrompts.map((prompt, i) => (
                      <button
                        key={i}
                        onClick={() => setInput(prompt.replace(/[💼🎓⚡🎯]/g, '').trim())}
                        className="group relative px-6 py-4 rounded-2xl bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-400/30 hover:border-purple-400/60 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
                      >
                        <span className="text-white font-medium text-left block group-hover:text-purple-200 transition-colors">
                          {prompt}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-slide-up`}
                  >
                    {msg.role === 'assistant' && (
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-lg font-bold flex-shrink-0 shadow-lg">
                        M
                      </div>
                    )}
                    <div
                      className={`max-w-[75%] px-6 py-4 rounded-2xl shadow-lg ${
                        msg.role === 'user'
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600'
                          : 'bg-white/10 border border-white/20'
                      }`}
                    >
                      <p className="text-white leading-relaxed">{msg.content}</p>
                    </div>
                    {msg.role === 'user' && (
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-xl flex-shrink-0 shadow-lg">
                        👤
                      </div>
                    )}
                  </div>
                ))
              )}
              {isLoading && (
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center font-bold shadow-lg">
                    M
                  </div>
                  <div className="bg-white/10 border border-white/20 px-6 py-4 rounded-2xl">
                    <div className="flex gap-1">
                      <div className="w-3 h-3 rounded-full bg-purple-400 animate-bounce"></div>
