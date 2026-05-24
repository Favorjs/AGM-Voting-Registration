import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaDownload } from 'react-icons/fa';
import { API } from '../context/CompanyContext';

function authHeaders() {
  return { Authorization: `Bearer ${localStorage.getItem('admin_token')}` };
}

export default function CompanyRegistrations() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData]   = useState({ shareholders: [], guests: [] });
  const [tab, setTab]     = useState('shareholders');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/api/admin/companies/${id}/registrations`, { headers: authHeaders() })
      .then(r => r.json()).then(setData).finally(() => setLoading(false));
  }, [id]);

  const exportCsv = (rows, filename) => {
    if (!rows.length) return;
    const keys = Object.keys(rows[0]);
    const csv  = [keys.join(','), ...rows.map(r => keys.map(k => `"${r[k] ?? ''}"`).join(','))].join('\n');
    const a    = document.createElement('a');
    a.href     = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
    a.download = filename;
    a.click();
  };

  const rows = tab === 'shareholders' ? data.shareholders : data.guests;
  const cols = tab === 'shareholders'
    ? ['name', 'acno', 'email', 'phone_number', 'holdings', 'chn', 'registered_at']
    : ['name', 'email', 'phone', 'user_type', 'created_at'];

  const tabStyle = (t) => ({
    padding: '.55rem 1.25rem', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '.875rem',
    background: tab === t ? '#0f3d2e' : '#f1f5f9', color: tab === t ? '#fff' : '#1a202c',
  });

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', padding: '2rem' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <button onClick={() => navigate('/admin/companies')} className="secondary-btn"><FaArrowLeft /> Back</button>
          <div style={{ display: 'flex', gap: '.5rem' }}>
            <button style={tabStyle('shareholders')} onClick={() => setTab('shareholders')}>
              Shareholders ({data.shareholders.length})
            </button>
            <button style={tabStyle('guests')} onClick={() => setTab('guests')}>
              Guests ({data.guests.length})
            </button>
          </div>
          <button onClick={() => exportCsv(rows, `${tab}-${id}.csv`)} className="secondary-btn">
            <FaDownload /> Export CSV
          </button>
        </div>

        {loading ? <p style={{ color: '#64748b' }}>Loading…</p> : (
          <div style={{ background: '#fff', borderRadius: 12, overflow: 'hidden', boxShadow: '0 0 0 1px rgba(0,0,0,.06)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '.875rem' }}>
              <thead>
                <tr>
                  {cols.map(c => (
                    <th key={c} style={{ background: '#0f3d2e', color: '#fff', padding: '.75rem 1rem', textAlign: 'left', fontSize: '.78rem', textTransform: 'uppercase', letterSpacing: '.04em' }}>
                      {c.replace(/_/g, ' ')}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    {cols.map(c => (
                      <td key={c} style={{ padding: '.75rem 1rem', color: '#1a202c' }}>
                        {c.includes('at') && r[c] ? new Date(r[c]).toLocaleString() : (r[c] ?? '—')}
                      </td>
                    ))}
                  </tr>
                ))}
                {rows.length === 0 && (
                  <tr><td colSpan={cols.length} style={{ textAlign: 'center', padding: '2.5rem', color: '#64748b' }}>No registrations yet</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
