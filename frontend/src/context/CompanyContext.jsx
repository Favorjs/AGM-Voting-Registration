import { createContext, useContext, useEffect, useState } from 'react';

const CompanyContext = createContext(null);

const API = 'https://api.sahco.apel.com.ng'; // backend base URL

export function CompanyProvider({ children }) {
  const [company, setCompany]   = useState(null);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  useEffect(() => {
    const subdomain = window.location.hostname; // e.g. sahco.apel.com.ng
    fetch(`${API}/api/company/config?subdomain=${subdomain}`)
      .then(r => r.ok ? r.json() : Promise.reject(r))
      .then(data => { setCompany(data); applyBranding(data); })
      .catch(() => setError('Could not load company configuration.'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <CompanyContext.Provider value={{ company, loading, error }}>
      {children}
    </CompanyContext.Provider>
  );
}

function applyBranding(company) {
  if (!company) return;
  const root = document.documentElement;
  if (company.primary_color) {
    root.style.setProperty('--brand',   company.primary_color);
    root.style.setProperty('--primary', shadeColor(company.primary_color, -30));
  }
  if (company.name) document.title = `${company.name} – ${company.meeting_type} Registration`;
}

function shadeColor(hex, pct) {
  const num = parseInt(hex.replace('#', ''), 16);
  const r = Math.min(255, Math.max(0, (num >> 16) + pct));
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0xff) + pct));
  const b = Math.min(255, Math.max(0, (num & 0xff) + pct));
  return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
}

export const useCompany = () => useContext(CompanyContext);
export { API };
