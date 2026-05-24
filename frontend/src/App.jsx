import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { CompanyProvider, useCompany } from './context/CompanyContext';

import ShareholderCheck from './ShareholderCheck';
import PreSuccess from './pages/Presuccess';
import Success from './pages/Success';
import RegisteredHolders from './pages/RegisteredHolders';
import Header from './Header';
import Footer from './Footer';
import UserTypeSelection from './pages/UserTypeSelection';
import GuestRegistration from './pages/GuestRegistration';
import GuestSuccess from './pages/GuestSuccess';
import './pages/RegisteredHolders.css';

// Admin portal
import AdminLogin from './admin/AdminLogin';
import Companies from './admin/Companies';
import CompanyEdit from './admin/CompanyEdit';
import CompanyRegistrations from './admin/CompanyRegistrations';

function RegistrationClosed() {
  const { company } = useCompany();
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 72px)' }}>
      <div style={{ textAlign: 'center', padding: '2rem', maxWidth: 420 }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔒</div>
        <h2 style={{ color: 'var(--primary)', marginBottom: '.5rem' }}>Registration Closed</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '.95rem' }}>
          Registration for the <strong>{company?.name} {company?.meeting_type}</strong> is not currently open.
          Please check back later or contact <a href="mailto:registrars@apel.com.ng" style={{ color: 'var(--brand)' }}>registrars@apel.com.ng</a>.
        </p>
      </div>
    </div>
  );
}

function AppRoutes() {
  const { company, loading, error } = useCompany();
  const [shareholderData, setShareholderData] = useState(null);
  const [guestData, setGuestData]             = useState(null);

  if (loading) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 72px)' }}>
      <div className="spinner" style={{ borderTopColor: 'var(--brand)', borderColor: 'rgba(0,0,0,.1)', width: 32, height: 32, borderWidth: 3 }} />
    </div>
  );

  if (error) return (
    <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
      <p>{error}</p>
    </div>
  );

  const closed = !company?.is_registration_open;

  return (
    <Routes>
      {/* Public registration flow */}
      <Route path="/" element={closed ? <RegistrationClosed /> : <UserTypeSelection />} />

      <Route path="/shareholder" element={
        closed ? <RegistrationClosed /> : <ShareholderCheck setShareholderData={setShareholderData} />
      } />
      <Route path="/shareholder/presuccess" element={
        shareholderData ? <PreSuccess shareholderData={shareholderData} onBackToHome={() => {}} /> : <Navigate to="/shareholder" />
      } />
      <Route path="/shareholder/success" element={
        shareholderData ? <Success shareholderData={shareholderData} onBackToHome={() => {}} /> : <Navigate to="/shareholder" />
      } />

      <Route path="/guest" element={
        closed ? <RegistrationClosed /> : <GuestRegistration setGuestData={setGuestData} />
      } />
      <Route path="/guest/success" element={
        guestData ? <GuestSuccess guestData={guestData} /> : <Navigate to="/guest" />
      } />

      {/* Legacy admin */}
      <Route path="/registered-users" element={<RegisteredHolders />} />

      {/* Admin portal */}
      <Route path="/admin/login"                           element={<AdminLogin />} />
      <Route path="/admin/companies"                       element={<Companies />} />
      <Route path="/admin/companies/:id"                   element={<CompanyEdit />} />
      <Route path="/admin/companies/:id/registrations"     element={<CompanyRegistrations />} />
      <Route path="/admin" element={<Navigate to="/admin/companies" />} />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <CompanyProvider>
        <div className="app">
          <Header />
          <main className="main-content">
            <AppRoutes />
          </main>
          <Footer />
        </div>
      </CompanyProvider>
    </Router>
  );
}

export default App;
