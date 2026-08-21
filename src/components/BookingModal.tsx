import React, { useState } from 'react';
import { X, Calendar, Clock, MapPin, UserCheck, ShieldCheck, CheckCircle2, ArrowRight, ArrowLeft, CreditCard, Flame, Zap, AlertTriangle } from 'lucide-react';
import { UKServiceItem, Engineer, Booking, AIDiagnosisResult } from '../types';
import { MOCK_ENGINEERS } from '../data/mockData';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedService: UKServiceItem | null;
  initialDiagnosis?: AIDiagnosisResult | null;
  onBookingComplete: (booking: Booking) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  selectedService,
  initialDiagnosis,
  onBookingComplete,
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form State
  const [customerName, setCustomerName] = useState('Eleanor Vance');
  const [email, setEmail] = useState('eleanor.vance@example.co.uk');
  const [phone, setPhone] = useState('07911 123456');
  const [address, setAddress] = useState('14 Kensington Gardens, Flat 3B');
  const [postcode, setPostcode] = useState('W8 4PR');
  const [propertyType, setPropertyType] = useState<Booking['propertyType']>('Flat / Apartment');

  const [urgency, setUrgency] = useState<Booking['urgency']>('emergency_30min');
  const [scheduledDate, setScheduledDate] = useState('2026-08-03');
  const [scheduledTime, setScheduledTime] = useState('14:00 - 16:00');
  const [selectedEngineerId, setSelectedEngineerId] = useState<string>(MOCK_ENGINEERS[0].id);
  const [notes, setNotes] = useState(initialDiagnosis ? initialDiagnosis.safetyWarning : '');
  const [paymentMethod, setPaymentMethod] = useState<Booking['paymentMethod']>('Apple Pay');

  if (!isOpen || !selectedService) return null;

  const baseNet = selectedService.startingPrice;
  const urgencyMultiplier = urgency === 'emergency_30min' ? 1.25 : urgency === 'same_day' ? 1.1 : 1.0;
  const calculatedNet = Math.round(baseNet * urgencyMultiplier);
  const vatAmount = Math.round(calculatedNet * 0.2); // 20% UK VAT
  const totalCost = calculatedNet + vatAmount;

  const selectedEngineer = MOCK_ENGINEERS.find((e) => e.id === selectedEngineerId) || MOCK_ENGINEERS[0];

  const handleSubmitBooking = () => {
    const newBooking: Booking = {
      id: `VOLT-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName,
      email,
      phone,
      address,
      postcode,
      propertyType,
      serviceId: selectedService.id,
      serviceTitle: selectedService.title,
      category: selectedService.category,
      urgency,
      scheduledDate,
      scheduledTime: urgency === 'emergency_30min' ? 'Immediate Dispatch' : scheduledTime,
      status: 'en_route',
      engineerId: selectedEngineer.id,
      engineerName: selectedEngineer.name,
      engineerAvatar: selectedEngineer.avatar,
      engineerGasSafeNo: selectedEngineer.gasSafeNo,
      engineerNiceicNo: selectedEngineer.niceicNo,
      engineerPhone: selectedEngineer.phone,
      engineerEtaMinutes: selectedEngineer.etaMinutes,
      netCost: calculatedNet,
      vatAmount: vatAmount,
      totalCost: totalCost,
      notes,
      faultDiagnosis: initialDiagnosis || undefined,
      paymentStatus: 'paid',
      paymentMethod,
      createdAt: new Date().toISOString(),
    };

    onBookingComplete(newBooking);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl text-white shadow-2xl overflow-hidden my-8">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 p-5 border-b border-slate-800 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold bg-blue-500/20 text-blue-300 border border-blue-400/30 px-2 py-0.5 rounded">
                Step {step} of 4
              </span>
              <span className="text-xs text-slate-400">{selectedService.title}</span>
            </div>
            <h2 className="text-lg font-bold">UK Certified Service Booking</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Indicator */}
        <div className="grid grid-cols-4 bg-slate-950 border-b border-slate-800 text-center text-[11px] font-semibold">
          <div className={`py-2.5 border-r border-slate-800 ${step >= 1 ? 'text-blue-400 bg-blue-950/20' : 'text-slate-500'}`}>
            1. Property
          </div>
          <div className={`py-2.5 border-r border-slate-800 ${step >= 2 ? 'text-blue-400 bg-blue-950/20' : 'text-slate-500'}`}>
            2. Time & Dispatch
          </div>
          <div className={`py-2.5 border-r border-slate-800 ${step >= 3 ? 'text-blue-400 bg-blue-950/20' : 'text-slate-500'}`}>
            3. Select Engineer
          </div>
          <div className={`py-2.5 ${step >= 4 ? 'text-blue-400 bg-blue-950/20' : 'text-slate-500'}`}>
            4. Quote & Pay
          </div>
        </div>

        <div className="p-6">
          {/* STEP 1: Property Details */}
          {step === 1 && (
            <div className="space-y-4 animate-fade-in">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-400" />
                <span>UK Property Address & Contact</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-400 mb-1">UK Phone Number</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-xs text-slate-400 mb-1">Street Address</label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-400 mb-1">UK Postcode</label>
                  <input
                    type="text"
                    value={postcode}
                    onChange={(e) => setPostcode(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white font-mono uppercase focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">Property Building Type</label>
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="Flat / Apartment">Flat / Apartment</option>
                  <option value="Terraced House">Terraced House</option>
                  <option value="Semi-Detached">Semi-Detached House</option>
                  <option value="Detached House">Detached House</option>
                  <option value="Commercial Office">Commercial Office</option>
                  <option value="Retail / Restaurant">Retail / Restaurant</option>
                </select>
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">Job Notes / Access Instructions</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Ring flat 3 door buzzer. Fuse box located in basement cupboard."
                  rows={2}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>

              <button
                onClick={() => setStep(2)}
                className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition"
              >
                <span>Continue to Dispatch Options</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* STEP 2: Dispatch & Time Options */}
          {step === 2 && (
            <div className="space-y-4 animate-fade-in">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-400" />
                <span>Select Dispatch Speed & Timing</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  onClick={() => setUrgency('emergency_30min')}
                  className={`p-3.5 rounded-xl border text-left transition flex flex-col justify-between ${
                    urgency === 'emergency_30min'
                      ? 'bg-red-950/40 border-red-500 ring-1 ring-red-500 text-white'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-red-500/20 text-red-400 border border-red-500/40">
                      Emergency 24/7
                    </span>
                    <AlertTriangle className="w-4 h-4 text-red-400" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">30-Min Rapid Dispatch</p>
                    <p className="text-[11px] text-slate-400 mt-1">Nearest engineer en-route immediately.</p>
                  </div>
                </button>

                <button
                  onClick={() => setUrgency('same_day')}
                  className={`p-3.5 rounded-xl border text-left transition flex flex-col justify-between ${
                    urgency === 'same_day'
                      ? 'bg-amber-950/40 border-amber-500 ring-1 ring-amber-500 text-white'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/40">
                      Same Day
                    </span>
                    <Clock className="w-4 h-4 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">Same-Day Slot</p>
                    <p className="text-[11px] text-slate-400 mt-1">Engineer arrives within 2-4 hours today.</p>
                  </div>
                </button>

                <button
                  onClick={() => setUrgency('scheduled')}
                  className={`p-3.5 rounded-xl border text-left transition flex flex-col justify-between ${
                    urgency === 'scheduled'
                      ? 'bg-blue-950/40 border-blue-500 ring-1 ring-blue-500 text-white'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/40">
                      Scheduled
                    </span>
                    <Calendar className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">Flexible Date & Time</p>
                    <p className="text-[11px] text-slate-400 mt-1">Book ahead at your preferred time.</p>
                  </div>
                </button>
              </div>

              {urgency === 'scheduled' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Preferred Date</label>
                    <input
                      type="date"
                      value={scheduledDate}
                      onChange={(e) => setScheduledDate(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Time Window</label>
                    <select
                      value={scheduledTime}
                      onChange={(e) => setScheduledTime(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                    >
                      <option value="08:00 - 10:00 Morning">08:00 - 10:00 Morning</option>
                      <option value="10:00 - 12:00 Midday">10:00 - 12:00 Midday</option>
                      <option value="12:00 - 14:00 Afternoon">12:00 - 14:00 Afternoon</option>
                      <option value="14:00 - 16:00 Late Afternoon">14:00 - 16:00 Late Afternoon</option>
                      <option value="16:00 - 18:00 Evening">16:00 - 18:00 Evening</option>
                    </select>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3 pt-4">
                <button
                  onClick={() => setStep(1)}
                  className="px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-xl text-xs transition flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="flex-1 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition"
                >
                  <span>Select Certified Engineer</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Engineer Selection */}
          {step === 3 && (
            <div className="space-y-4 animate-fade-in">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-blue-400" />
                <span>Verified UK Certified Engineers Active Near You</span>
              </h3>

              <div className="space-y-3">
                {MOCK_ENGINEERS.map((eng) => (
                  <div
                    key={eng.id}
                    onClick={() => setSelectedEngineerId(eng.id)}
                    className={`p-4 rounded-xl border cursor-pointer transition flex items-start gap-4 ${
                      selectedEngineerId === eng.id
                        ? 'bg-blue-950/40 border-blue-500 ring-1 ring-blue-500'
                        : 'bg-slate-950 border-slate-800 hover:bg-slate-800/80'
                    }`}
                  >
                    <img
                      src={eng.avatar}
                      alt={eng.name}
                      className="w-12 h-12 rounded-xl object-cover border border-slate-700 flex-shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-xs font-bold text-white truncate">{eng.name}</h4>
                        <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-500/30">
                          {eng.etaMinutes} mins ETA
                        </span>
                      </div>

                      <p className="text-[11px] text-slate-400 mb-2">{eng.roleTitle}</p>

                      <div className="flex items-center gap-2 text-[10px] flex-wrap">
                        {eng.gasSafeNo && (
                          <span className="bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded border border-amber-500/30 font-semibold">
                            Gas Safe #{eng.gasSafeNo}
                          </span>
                        )}
                        {eng.niceicNo && (
                          <span className="bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded border border-blue-500/30 font-semibold">
                            NICEIC #{eng.niceicNo}
                          </span>
                        )}
                        <span className="text-amber-400 font-bold">★ {eng.rating} ({eng.reviewCount})</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => setStep(2)}
                  className="px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-xl text-xs transition flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  onClick={() => setStep(4)}
                  className="flex-1 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition"
                >
                  <span>Review Transparent Quote</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Transparent Price Breakdown & Payment */}
          {step === 4 && (
            <div className="space-y-4 animate-fade-in">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-blue-400" />
                <span>Transparent GBP Quote & Payment</span>
              </h3>

              {/* Summary Card */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Service:</span>
                  <span className="font-bold text-white">{selectedService.title}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Assigned Engineer:</span>
                  <span className="font-bold text-white">{selectedEngineer.name}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Dispatch Address:</span>
                  <span className="font-mono text-slate-200">{address}, {postcode}</span>
                </div>

                <div className="border-t border-slate-800 pt-3 space-y-1.5 text-xs">
                  <div className="flex justify-between text-slate-400">
                    <span>Base Service Charge</span>
                    <span>£{calculatedNet.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>UK VAT (20%)</span>
                    <span>£{vatAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm font-black text-amber-400 pt-2 border-t border-slate-800">
                    <span>Total Payable</span>
                    <span>£{totalCost.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div>
                <label className="block text-xs text-slate-400 mb-2 font-medium">Payment Option</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-semibold">
                  {(['Apple Pay', 'Card', 'Google Pay', 'Klarna Pay Later'] as const).map((method) => (
                    <button
                      key={method}
                      onClick={() => setPaymentMethod(method)}
                      className={`p-2.5 rounded-xl border text-center transition ${
                        paymentMethod === method
                          ? 'bg-blue-600 border-blue-500 text-white'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {method}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit Dispatch */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => setStep(3)}
                  className="px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-xl text-xs transition flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  onClick={handleSubmitBooking}
                  className="flex-1 py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black rounded-xl text-xs shadow-xl shadow-emerald-900/30 flex items-center justify-center gap-2 transition"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                  <span>Confirm Booking & Dispatch Engineer (£{totalCost})</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
