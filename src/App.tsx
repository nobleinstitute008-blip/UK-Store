import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { ServiceExplorer } from './components/ServiceExplorer';
import { AIDiagnosticsModal } from './components/AIDiagnosticsModal';
import { AIChatModal } from './components/AIChatModal';
import { BookingModal } from './components/BookingModal';
import { LiveTrackingView } from './components/LiveTrackingView';
import { CertificateViewerModal } from './components/CertificateViewerModal';
import { LandlordHub } from './components/LandlordHub';
import { EngineerPortal } from './components/EngineerPortal';
import { AdminDashboard } from './components/AdminDashboard';

import { AppRole, ViewMode, UKServiceItem, Booking, AIDiagnosisResult, DigitalCertificate, LandlordProperty } from './types';
import { UK_SERVICES, INITIAL_BOOKINGS, MOCK_CERTIFICATES } from './data/mockData';
import { ShieldCheck, Zap, Flame, Building2, PhoneCall, Sparkles, MessageSquare, AlertTriangle } from 'lucide-react';

export default function App() {
  const [role, setRole] = useState<AppRole>('customer');
  const [viewMode, setViewMode] = useState<ViewMode>('desktop');
  const [customerSubTab, setCustomerSubTab] = useState<'services' | 'landlord' | 'active_tracking'>('services');

  // Modals
  const [aiDiagnosticsOpen, setAiDiagnosticsOpen] = useState(false);
  const [aiChatOpen, setAiChatOpen] = useState(false);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<UKServiceItem | null>(null);
  const [currentDiagnosis, setCurrentDiagnosis] = useState<AIDiagnosisResult | null>(null);

  // Active state
  const [activeBookings, setActiveBookings] = useState<Booking[]>(INITIAL_BOOKINGS);
  const [selectedBookingForTracking, setSelectedBookingForTracking] = useState<Booking | null>(INITIAL_BOOKINGS[0]);
  const [selectedCertificate, setSelectedCertificate] = useState<DigitalCertificate | null>(null);
  const [certificateModalOpen, setCertificateModalOpen] = useState(false);

  // Handlers
  const handleSelectService = (service: UKServiceItem) => {
    setSelectedService(service);
    setCurrentDiagnosis(null);
    setBookingModalOpen(true);
  };

  const handleProceedFromAIDiagnosis = (diagnosis: AIDiagnosisResult) => {
    setCurrentDiagnosis(diagnosis);
    // Find matching service or default to emergency electrician / gas
    const matchedService = UK_SERVICES.find(
      (s) => s.category === (diagnosis.category.toLowerCase().includes('gas') ? 'gas' : 'electrical')
    ) || UK_SERVICES[0];

    setSelectedService(matchedService);
    setBookingModalOpen(true);
  };

  const handleBookingComplete = (newBooking: Booking) => {
    setActiveBookings((prev) => [newBooking, ...prev]);
    setSelectedBookingForTracking(newBooking);
    setCustomerSubTab('active_tracking');
  };

  const handleLandlordAutoBook = (property: LandlordProperty, certType: 'EICR' | 'CP12') => {
    const service = UK_SERVICES.find((s) => s.id === (certType === 'EICR' ? 'eicr-landlord-cert' : 'gas-safety-cp12')) || UK_SERVICES[1];
    setSelectedService(service);
    setBookingModalOpen(true);
  };

  const handleOpenCertificate = (cert: DigitalCertificate) => {
    setSelectedCertificate(cert);
    setCertificateModalOpen(true);
  };

  const handleEngineerIssueCertificate = (bookingId: string) => {
    setActiveBookings((prev) =>
      prev.map((b) =>
        b.id === bookingId ? { ...b, status: 'completed', certificateIssued: true } : b
      )
    );
    handleOpenCertificate(MOCK_CERTIFICATES[0]);
  };

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-100 flex flex-col selection:bg-blue-500 selection:text-white">
      {/* Top Navbar */}
      <Navbar
        currentRole={role}
        onRoleChange={(newRole) => {
          setRole(newRole);
          if (newRole === 'customer') setCustomerSubTab('services');
        }}
        viewMode={viewMode}
        onToggleViewMode={() => setViewMode(viewMode === 'desktop' ? 'mobile_frame' : 'desktop')}
        onOpenEmergencyModal={() => {
          const emergencyService = UK_SERVICES.find((s) => s.id === 'emergency-electrician') || UK_SERVICES[2];
          handleSelectService(emergencyService);
        }}
        onOpenAIChat={() => setAiChatOpen(true)}
        activeBookingCount={activeBookings.length}
      />

      {/* Main Content Area (Optional Device Shell Frame) */}
      <main className="flex-1 py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {viewMode === 'mobile_frame' ? (
          /* Phone Shell Device Container */
          <div className="max-w-md mx-auto bg-slate-900 border-8 border-slate-800 rounded-[40px] shadow-2xl p-4 overflow-hidden relative border-t-[16px]">
            {/* Speaker Notch */}
            <div className="w-24 h-4 bg-slate-800 rounded-b-xl mx-auto -mt-4 mb-4 flex items-center justify-center">
              <div className="w-12 h-1 bg-slate-700 rounded-full" />
            </div>

            <div className="space-y-4 max-h-[750px] overflow-y-auto pr-1">
              {/* Customer View */}
              {role === 'customer' && (
                <>
                  <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 text-[11px] font-bold">
                    <button
                      onClick={() => setCustomerSubTab('services')}
                      className={`flex-1 py-1.5 rounded-lg transition ${
                        customerSubTab === 'services' ? 'bg-blue-600 text-white' : 'text-slate-400'
                      }`}
                    >
                      Services
                    </button>
                    <button
                      onClick={() => setCustomerSubTab('landlord')}
                      className={`flex-1 py-1.5 rounded-lg transition ${
                        customerSubTab === 'landlord' ? 'bg-blue-600 text-white' : 'text-slate-400'
                      }`}
                    >
                      Landlord Hub
                    </button>
                    <button
                      onClick={() => setCustomerSubTab('active_tracking')}
                      className={`flex-1 py-1.5 rounded-lg transition ${
                        customerSubTab === 'active_tracking' ? 'bg-blue-600 text-white' : 'text-slate-400'
                      }`}
                    >
                      Live Tracking
                    </button>
                  </div>

                  {customerSubTab === 'services' && (
                    <ServiceExplorer
                      onSelectService={handleSelectService}
                      onOpenAIDiagnostics={() => setAiDiagnosticsOpen(true)}
                    />
                  )}

                  {customerSubTab === 'landlord' && (
                    <LandlordHub
                      onAutoBookInspection={handleLandlordAutoBook}
                      onViewCert={handleOpenCertificate}
                    />
                  )}

                  {customerSubTab === 'active_tracking' && selectedBookingForTracking && (
                    <LiveTrackingView
                      booking={selectedBookingForTracking}
                      onOpenCertificate={handleOpenCertificate}
                      onBackToServices={() => setCustomerSubTab('services')}
                    />
                  )}
                </>
              )}

              {role === 'engineer' && (
                <EngineerPortal onIssueCertificate={handleEngineerIssueCertificate} />
              )}

              {role === 'admin' && <AdminDashboard />}
            </div>
          </div>
        ) : (
          /* Desktop Full Layout */
          <div className="space-y-6">
            {/* Customer Navigation Sub-Bar */}
            {role === 'customer' && (
              <div className="flex items-center justify-between bg-slate-900 p-2 rounded-2xl border border-slate-800 text-xs font-semibold">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCustomerSubTab('services')}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition ${
                      customerSubTab === 'services'
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    <Zap className="w-4 h-4 text-amber-400" />
                    <span>Book UK Services</span>
                  </button>

                  <button
                    onClick={() => setCustomerSubTab('landlord')}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition ${
                      customerSubTab === 'landlord'
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    <Building2 className="w-4 h-4 text-indigo-400" />
                    <span>Landlord Compliance Hub</span>
                  </button>

                  {selectedBookingForTracking && (
                    <button
                      onClick={() => setCustomerSubTab('active_tracking')}
                      className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition ${
                        customerSubTab === 'active_tracking'
                          ? 'bg-emerald-600 text-white shadow-md'
                          : 'text-slate-300 hover:text-white hover:bg-slate-800'
                      }`}
                    >
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      <span>Live Engineer GPS Tracking</span>
                    </button>
                  )}
                </div>

                <button
                  onClick={() => setAiDiagnosticsOpen(true)}
                  className="flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold px-3.5 py-2 rounded-xl shadow-md transition"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>AI Fault Inspector</span>
                </button>
              </div>
            )}

            {/* View Switcher */}
            {role === 'customer' && customerSubTab === 'services' && (
              <ServiceExplorer
                onSelectService={handleSelectService}
                onOpenAIDiagnostics={() => setAiDiagnosticsOpen(true)}
              />
            )}

            {role === 'customer' && customerSubTab === 'landlord' && (
              <LandlordHub
                onAutoBookInspection={handleLandlordAutoBook}
                onViewCert={handleOpenCertificate}
              />
            )}

            {role === 'customer' && customerSubTab === 'active_tracking' && selectedBookingForTracking && (
              <LiveTrackingView
                booking={selectedBookingForTracking}
                onOpenCertificate={handleOpenCertificate}
                onBackToServices={() => setCustomerSubTab('services')}
              />
            )}

            {role === 'engineer' && (
              <EngineerPortal onIssueCertificate={handleEngineerIssueCertificate} />
            )}

            {role === 'admin' && <AdminDashboard />}
          </div>
        )}
      </main>

      {/* Modals */}
      <AIDiagnosticsModal
        isOpen={aiDiagnosticsOpen}
        onClose={() => setAiDiagnosticsOpen(false)}
        onProceedToBooking={handleProceedFromAIDiagnosis}
      />

      <AIChatModal
        isOpen={aiChatOpen}
        onClose={() => setAiChatOpen(false)}
        onQuickBook={(serviceTitle) => {
          const matched = UK_SERVICES.find((s) => s.title.toLowerCase().includes(serviceTitle.toLowerCase())) || UK_SERVICES[0];
          handleSelectService(matched);
        }}
      />

      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        selectedService={selectedService}
        initialDiagnosis={currentDiagnosis}
        onBookingComplete={handleBookingComplete}
      />

      <CertificateViewerModal
        isOpen={certificateModalOpen}
        certificate={selectedCertificate}
        onClose={() => setCertificateModalOpen(false)}
      />

      {/* Footer */}
      <footer className="mt-12 bg-slate-900 border-t border-slate-800 py-8 text-slate-400 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white text-sm">VoltSure UK</span>
            <span>• Certified Electrical & Gas Services</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400 text-[11px] flex-wrap justify-center">
            <span>Gas Safe Register Verified #589210</span>
            <span>•</span>
            <span>NICEIC Approved Contractor #042918</span>
            <span>•</span>
            <span>BS 7671 18th Edition Amendment 2 Compliant</span>
            <span>•</span>
            <span>20% UK VAT HMRC Registered</span>
          </div>

          <p className="text-[10px] text-slate-500">© 2026 VoltSure UK Ltd. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
