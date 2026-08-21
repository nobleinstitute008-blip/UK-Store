import React, { useState, useEffect } from 'react';
import { Booking, DigitalCertificate } from '../types';
import { MapPin, Navigation, Phone, MessageSquare, ShieldCheck, Flame, Zap, FileText, CheckCircle2, Clock, Truck, ChevronRight, X, Download } from 'lucide-react';
import { MOCK_CERTIFICATES } from '../data/mockData';

interface LiveTrackingViewProps {
  booking: Booking;
  onOpenCertificate: (cert: DigitalCertificate) => void;
  onBackToServices: () => void;
}

export const LiveTrackingView: React.FC<LiveTrackingViewProps> = ({
  booking,
  onOpenCertificate,
  onBackToServices,
}) => {
  const [eta, setEta] = useState(booking.engineerEtaMinutes || 14);
  const [statusStep, setStatusStep] = useState<number>(3); // 3 = En Route
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'engineer' | 'user'; text: string; time: string }>>([
    {
      sender: 'engineer',
      text: `Hello ${booking.customerName}, I'm David Miller (${booking.engineerGasSafeNo ? `Gas Safe #${booking.engineerGasSafeNo}` : `NICEIC #${booking.engineerNiceicNo}`}). I've picked up your emergency dispatch and am en route in my van VK23 XOL.`,
      time: 'Just now',
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [callModalOpen, setCallModalOpen] = useState(false);

  // Simulate progress over time for interactive demo
  useEffect(() => {
    const timer = setInterval(() => {
      setEta((prev) => {
        if (prev <= 1) {
          setStatusStep(4); // Arrived
          return 0;
        }
        return prev - 1;
      });
    }, 6000); // Reduce ETA every 6s in demo

    return () => clearInterval(timer);
  }, []);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    const userText = inputMessage.trim();
    setChatMessages((prev) => [
      ...prev,
      { sender: 'user', text: userText, time: 'Just now' },
    ]);
    setInputMessage('');

    // Simulated reply from engineer after 1s
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          sender: 'engineer',
          text: 'Got it! I am just turning off the main road onto your street now.',
          time: 'Just now',
        },
      ]);
    }, 1200);
  };

  const sampleCert = MOCK_CERTIFICATES[0];

  return (
    <div className="space-y-6">
      {/* Top Banner & Status Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 text-white shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono bg-blue-500/20 text-blue-300 px-2.5 py-0.5 rounded border border-blue-400/30">
                Job ID: {booking.id}
              </span>
              <span className="text-xs text-slate-400">Created: {new Date(booking.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
            <h2 className="text-xl font-black text-white">{booking.serviceTitle}</h2>
            <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-1">
              <MapPin className="w-3.5 h-3.5 text-blue-400" />
              <span>{booking.address}, {booking.postcode}</span>
            </p>
          </div>

          {/* Big Live ETA Counter */}
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center gap-4 text-right">
            <div>
              <p className="text-[10px] text-slate-400 uppercase font-semibold">Estimated Arrival</p>
              <p className="text-2xl font-black text-emerald-400">
                {eta > 0 ? `${eta} Mins` : 'ARRIVED ON SITE'}
              </p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
              <Truck className="w-5 h-5 animate-bounce" />
            </div>
          </div>
        </div>

        {/* Status Timeline */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2 pt-5 text-xs font-semibold">
          <div className="p-3 rounded-xl bg-blue-950/40 border border-blue-800 text-blue-300 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0" />
            <span>1. Booked</span>
          </div>
          <div className="p-3 rounded-xl bg-blue-950/40 border border-blue-800 text-blue-300 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0" />
            <span>2. Assigned</span>
          </div>
          <div className={`p-3 rounded-xl border flex items-center gap-2 ${statusStep >= 3 ? 'bg-amber-950/40 border-amber-600 text-amber-300' : 'bg-slate-950 border-slate-800 text-slate-500'}`}>
            <Navigation className="w-4 h-4 text-amber-400 animate-pulse flex-shrink-0" />
            <span>3. En Route</span>
          </div>
          <div className={`p-3 rounded-xl border flex items-center gap-2 ${statusStep >= 4 ? 'bg-emerald-950/40 border-emerald-600 text-emerald-300' : 'bg-slate-950 border-slate-800 text-slate-500'}`}>
            <Clock className="w-4 h-4 flex-shrink-0" />
            <span>4. On Site</span>
          </div>
          <div className={`p-3 rounded-xl border flex items-center gap-2 ${statusStep >= 5 ? 'bg-emerald-950/40 border-emerald-600 text-emerald-300' : 'bg-slate-950 border-slate-800 text-slate-500'}`}>
            <FileText className="w-4 h-4 flex-shrink-0" />
            <span>5. Signoff</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Interactive Map & Assigned Engineer Profile */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Interactive Simulated Map (2 Cols) */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-4 shadow-xl flex flex-col justify-between relative overflow-hidden h-[420px]">
          {/* Map Graphic Canvas */}
          <div className="absolute inset-0 bg-slate-950 opacity-90">
            {/* Grid lines simulating streets */}
            <svg className="w-full h-full stroke-slate-800/80" strokeWidth="2">
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#grid)" />
              {/* Route line */}
              <path d="M 80 320 C 180 280, 240 180, 420 120" fill="none" stroke="#3b82f6" strokeWidth="4" strokeDasharray="6 6" className="animate-pulse" />
            </svg>
          </div>

          {/* Map Overlay Badges */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="bg-slate-900/90 border border-slate-700 px-3 py-1.5 rounded-xl text-xs text-white backdrop-blur flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <span className="font-bold">Live GPS Telemetry</span>
              <span className="text-slate-400">| Ford Transit VK23 XOL</span>
            </div>

            <button
              onClick={() => onOpenCertificate(sampleCert)}
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-3 py-1.5 rounded-xl text-xs border border-blue-400/40 flex items-center gap-1.5 shadow-md"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Preview Digital Certificate</span>
            </button>
          </div>

          {/* Pins on map */}
          {/* Destination Pin */}
          <div className="absolute top-[110px] right-[120px] z-20 flex flex-col items-center">
            <div className="bg-red-600 text-white font-bold text-[10px] px-2 py-0.5 rounded shadow-lg border border-red-400">
              Your Home (W8 4PR)
            </div>
            <MapPin className="w-7 h-7 text-red-500 drop-shadow-md" />
          </div>

          {/* Moving Engineer Pin */}
          <div className="absolute bottom-[90px] left-[100px] z-20 flex flex-col items-center transition-all duration-1000">
            <div className="bg-blue-600 text-white font-bold text-[10px] px-2 py-0.5 rounded shadow-lg border border-blue-400 flex items-center gap-1">
              <span>{booking.engineerName}</span>
              <span className="text-emerald-300">({eta}m)</span>
            </div>
            <div className="p-1.5 bg-blue-600 rounded-full text-white shadow-xl animate-bounce border-2 border-white">
              <Truck className="w-5 h-5" />
            </div>
          </div>

          {/* Map Bottom Control Bar */}
          <div className="relative z-10 bg-slate-900/90 border border-slate-800 p-3 rounded-2xl backdrop-blur flex items-center justify-between text-xs text-slate-300">
            <span className="flex items-center gap-1">
              📍 Current position: Kensington High Street (0.8 miles away)
            </span>
            <span className="text-slate-500">Speed: 24 mph</span>
          </div>
        </div>

        {/* Assigned Engineer Card & Interaction Controls (1 Col) */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 text-white shadow-xl flex flex-col justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
              Assigned Certified Specialist
            </div>

            <div className="flex items-center gap-3 mb-4">
              <img
                src={booking.engineerAvatar || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80'}
                alt={booking.engineerName}
                className="w-16 h-16 rounded-2xl object-cover border-2 border-blue-500 shadow-md"
              />
              <div>
                <h3 className="text-base font-bold text-white">{booking.engineerName}</h3>
                <p className="text-xs text-slate-400">Senior Electrical & Gas Inspector</p>
                <div className="flex items-center gap-1.5 mt-1 text-[11px]">
                  {booking.engineerGasSafeNo && (
                    <span className="bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded font-bold border border-amber-500/30">
                      Gas Safe #{booking.engineerGasSafeNo}
                    </span>
                  )}
                  {booking.engineerNiceicNo && (
                    <span className="bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded font-bold border border-blue-500/30">
                      NICEIC #{booking.engineerNiceicNo}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1.5 mb-4">
              <div className="flex justify-between text-slate-400">
                <span>Vehicle:</span>
                <span className="text-white font-semibold">Ford Transit VK23 XOL</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>DBS Background Check:</span>
                <span className="text-emerald-400 font-bold">✓ Verified Clear</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Completed Jobs:</span>
                <span className="text-white font-semibold">1,480+ in UK</span>
              </div>
            </div>
          </div>

          {/* Contact Action Buttons */}
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setChatOpen(true)}
                className="py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition shadow-md"
              >
                <MessageSquare className="w-4 h-4" />
                <span>In-App Chat</span>
              </button>

              <button
                onClick={() => setCallModalOpen(true)}
                className="py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition shadow-md"
              >
                <Phone className="w-4 h-4" />
                <span>Call Engineer</span>
              </button>
            </div>

            <button
              onClick={onBackToServices}
              className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-xl text-xs transition"
            >
              Return to Services Overview
            </button>
          </div>
        </div>
      </div>

      {/* In-App Chat Modal Popup */}
      {chatOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md h-[500px] flex flex-col text-white shadow-2xl overflow-hidden">
            <div className="bg-slate-950 p-4 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img src={booking.engineerAvatar} alt="" className="w-8 h-8 rounded-full object-cover" />
                <div>
                  <h4 className="text-xs font-bold text-white">{booking.engineerName}</h4>
                  <p className="text-[10px] text-emerald-400 font-semibold">En Route (14m away)</p>
                </div>
              </div>
              <button onClick={() => setChatOpen(false)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
              {chatMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      msg.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-200 border border-slate-700'
                    }`}
                  >
                    <p>{msg.text}</p>
                    <p className="text-[9px] text-slate-400 mt-1 text-right">{msg.time}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 bg-slate-950 border-t border-slate-800 flex items-center gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type message to engineer..."
                className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
              />
              <button
                onClick={handleSendMessage}
                className="px-3 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Simulated Call Modal */}
      {callModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center text-white max-w-sm w-full space-y-4 shadow-2xl">
            <img src={booking.engineerAvatar} alt="" className="w-20 h-20 rounded-full mx-auto object-cover border-2 border-emerald-500 animate-pulse" />
            <div>
              <h3 className="text-base font-bold">{booking.engineerName}</h3>
              <p className="text-xs text-slate-400">{booking.engineerPhone || '07700 900482'}</p>
              <p className="text-xs text-emerald-400 font-mono mt-1">Calling via Encrypted VoltSure VoIP...</p>
            </div>

            <button
              onClick={() => setCallModalOpen(false)}
              className="w-full py-2.5 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl text-xs transition"
            >
              End Call
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
