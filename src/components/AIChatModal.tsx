import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, User, Sparkles, Loader2, Zap, Flame } from 'lucide-react';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
}

interface AIChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  onQuickBook: (serviceTitle: string) => void;
}

export const AIChatModal: React.FC<AIChatModalProps> = ({ isOpen, onClose, onQuickBook }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm-1',
      sender: 'bot',
      text: 'Hello! I am VoltBot AI 🇬🇧, your certified UK Electrical & Gas technical advisor. Ask me anything about EICR regulations, boiler error codes, fuse board upgrades, or pricing estimates.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  if (!isOpen) return null;

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsgText = input.trim();
    const userMsg: Message = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: userMsgText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMsgText,
          history: messages.map((m) => ({
            role: m.sender === 'user' ? 'user' : 'model',
            content: m.text,
          })),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success && data.reply) {
          const botMsg: Message = {
            id: `b-${Date.now()}`,
            sender: 'bot',
            text: data.reply,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          };
          setMessages((prev) => [...prev, botMsg]);
          return;
        }
      }
      throw new Error('Fallback to local UK advisor');
    } catch (err: any) {
      console.warn('AI Chat API fallback:', err);
      const lower = userMsgText.toLowerCase();
      let reply = 'Under UK regulations (BS 7671 & Gas Safety Regs), all major electrical installations and gas works must be carried out by NICEIC/NAPIT or Gas Safe registered engineers. You can book an immediate emergency dispatch or schedule an inspection directly in the portal.';

      if (lower.includes('eicr') || lower.includes('landlord')) {
        reply = 'Under The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020, landlords must have an EICR carried out at least every 5 years by a qualified inspector. Prices start from £120 + VAT with digital certificate delivery.';
      } else if (lower.includes('gas') || lower.includes('cp12') || lower.includes('boiler')) {
        reply = 'Annual Landlord Gas Safety Inspections (CP12) are legally mandatory every 12 months under Regulation 36 of the Gas Safety (Installation and Use) Regulations 1998. Our Gas Safe certified engineers test flues, burners, and supply pipework for £75 + VAT.';
      } else if (lower.includes('fuse') || lower.includes('consumer unit') || lower.includes('board')) {
        reply = 'A modern 18th Edition Amendment 2 compliant metal consumer unit with Type A RCBOs and Surge Protection Device (SPD) typically ranges between £450 and £750 fully installed, including NICEIC notification and Building Control Part P certificate.';
      }

      const botMsg: Message = {
        id: `b-${Date.now()}`,
        sender: 'bot',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg h-[600px] flex flex-col shadow-2xl overflow-hidden">
        {/* Chat Header */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative p-2 bg-blue-500/20 text-blue-400 rounded-xl border border-blue-400/30">
              <Bot className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-slate-900" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-sm font-bold text-white">VoltBot AI Technical Advisor</h3>
                <span className="text-[10px] bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded font-semibold border border-amber-500/30">
                  UK Regs
                </span>
              </div>
              <p className="text-[11px] text-blue-200">BS 7671 18th Ed & Gas Safe Register Knowledge Base</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-lg transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Question Chips */}
        <div className="p-2 bg-slate-950/60 border-b border-slate-800 flex gap-1.5 overflow-x-auto text-[11px]">
          <button
            onClick={() => {
              setInput('What are the legal EICR requirements for UK landlords?');
            }}
            className="whitespace-nowrap bg-slate-800 hover:bg-slate-700 text-blue-300 px-2.5 py-1 rounded-full border border-slate-700 transition"
          >
            📋 EICR Landlord Laws
          </button>
          <button
            onClick={() => {
              setInput('How much does a consumer unit fuse board replacement cost in London?');
            }}
            className="whitespace-nowrap bg-slate-800 hover:bg-slate-700 text-amber-300 px-2.5 py-1 rounded-full border border-slate-700 transition"
          >
            ⚡ Fuse Box Upgrade Cost
          </button>
          <button
            onClick={() => {
              setInput('My boiler has low pressure F22 error code. What should I do?');
            }}
            className="whitespace-nowrap bg-slate-800 hover:bg-slate-700 text-red-300 px-2.5 py-1 rounded-full border border-slate-700 transition"
          >
            🔥 Boiler F22 Fix
          </button>
        </div>

        {/* Message Stream */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'bot' && (
                <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white flex-shrink-0 mt-0.5">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[80%] p-3 rounded-2xl ${
                  msg.sender === 'user'
                    ? 'bg-blue-600 text-white rounded-tr-none'
                    : 'bg-slate-800 text-slate-200 border border-slate-700 rounded-tl-none leading-relaxed'
                }`}
              >
                <p className="whitespace-pre-wrap">{msg.text}</p>
                <p
                  className={`text-[9px] mt-1 text-right ${
                    msg.sender === 'user' ? 'text-blue-200' : 'text-slate-400'
                  }`}
                >
                  {msg.timestamp}
                </p>
              </div>

              {msg.sender === 'user' && (
                <div className="w-7 h-7 rounded-lg bg-slate-700 flex items-center justify-center text-slate-300 flex-shrink-0 mt-0.5">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex gap-2.5 items-center text-slate-400">
              <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white flex-shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-slate-800 p-3 rounded-2xl border border-slate-700 flex items-center gap-2">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-blue-400" />
                <span>VoltBot is researching UK regulations...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-slate-950 border-t border-slate-800 flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about UK regulations, boiler codes, quotes..."
            className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || loading}
            className="p-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition disabled:opacity-40"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
