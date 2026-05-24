import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaPlus, FaEdit, FaToggleOn, FaToggleOff, FaSignOutAlt } from 'react-icons/fa';
import { API } from '../context/CompanyContext';

function authHeaders() {
  return { Authorization: `Bearer ${localStorage.getItem('admin_token')}`, 'Content-Type': 'application/json' };
}

export default function Companies() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading]     = useState(true);
  const navigate = useNavigate();

  const load = async () => {
    const res = await fetch(`${API}/api/admin/companies`, { headers: authHeaders() });
    if (res.status === 401) { navigate('/admin/login'); return; }
    setCompanies(await res.json());
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const toggleReg = async (company) => {
    await fetch(`${API}/api/admin/companies/${company.id}`, {
      method: 'PUT', headers: authHeaders(),
      body: JSON.stringify({ is_registration_open: !company.is_registration_open }),
    });
    load();
  };

  const logout = () => { localStorage.clear(); navigate('/admin/login'); };

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', padding: '2rem' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div>
            <h1 style={{ color: '#0f3d2e', margin: 0 }}>Companies</h1>
            <p style={{ color: '#64748b', margin: '.25rem 0 0', fontSize: '.9rem' }}>Manage AGM/EGM registrations per company</p>
          </div>
          <div style={{ display: 'flex', gap: '.75rem' }}>
            <Link to="/admin/companies/new" className="btn btn-primary" style={{ textDecoration: 'none', padding: '.65rem 1.2rem', background: '#107b5f', color: '#fff', borderRadius: 8, fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '.4rem', fontSize: '.9rem' }}>
              <FaPlus /> Add Company
            </Link>
            <button onClick={logout} style={{ background: '#f1f5f9', border: 'none', borderRadius: 8, padding: '.65rem 1rem', cursor: 'pointer', color: '#64748b', display: 'flex', alignItems: 'center', gap: '.4rem', fontSize: '.9rem' }}>
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </div>

        {loading ? <p style={{ color: '#64748b' }}>Loading…</p> : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {companies.map(c => (
              <div key={c.id} style={{ background: '#fff', borderRadius: 12, padding: '1.25rem 1.5rem', boxShadow: '0 0 0 1px rgba(0,0,0,.06)', display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                {c.logo_url && <img src={c.logo_url} alt="" style={{ height: 40, objectFit: 'contain' }} />}
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: 700, margin: 0, color: '#1a202c' }}>{c.name}</p>
                  <p style={{ margin: '2px 0 0', fontSize: '.82rem', color: '#64748b' }}>{c.subdomain} · {c.meeting_type} · {c.meeting_date || 'Date TBA'} {c.meeting_time || ''}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem', flexShrink: 0 }}>
                  <button onClick={() => toggleReg(c)} title="Toggle registration" style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.6rem', color: c.is_registration_open ? '#107b5f' : '#cbd5e1' }}>
                    {c.is_registration_open ? <FaToggleOn /> : <FaToggleOff />}
                  </button>
                  <span style={{ fontSize: '.78rem', fontWeight: 600, color: c.is_registration_open ? '#107b5f' : '#94a3b8' }}>
                    {c.is_registration_open ? 'OPEN' : 'CLOSED'}
                  </span>
                  <Link to={`/admin/companies/${c.id}`} style={{ background: '#f1f5f9', borderRadius: 8, padding: '.5rem .9rem', textDecoration: 'none', color: '#1a202c', fontWeight: 600, fontSize: '.85rem', display: 'inline-flex', alignItems: 'center', gap: '.35rem' }}>
                    <FaEdit /> Edit
                  </Link>
                  <Link to={`/admin/companies/${c.id}/registrations`} style={{ background: '#0f3d2e', borderRadius: 8, padding: '.5rem .9rem', textDecoration: 'none', color: '#fff', fontWeight: 600, fontSize: '.85rem' }}>
                    View Registrations
                  </Link>
                </div>
              </div>
            ))}
            {companies.length === 0 && <p style={{ color: '#64748b', textAlign: 'center', padding: '3rem' }}>No companies yet. Add one to get started.</p>}
          </div>
        )}
      </div>
    </div>
  );
}
