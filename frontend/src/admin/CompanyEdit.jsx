import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft, FaUpload, FaFileExcel } from 'react-icons/fa';
import { API } from '../context/CompanyContext';

function authHeaders(json = true) {
  const h = { Authorization: `Bearer ${localStorage.getItem('admin_token')}` };
  if (json) h['Content-Type'] = 'application/json';
  return h;
}

const EMPTY = { slug: '', subdomain: '', name: '', meeting_type: 'EGM', meeting_date: '', meeting_time: '', zoom_link: '', youtube_link: '', primary_color: '#107b5f', is_registration_open: false, is_active: true };

export default function CompanyEdit() {
  const { id }       = useParams();
  const isNew        = id === 'new';
  const navigate     = useNavigate();
  const csvRef       = useRef();
  const logoRef      = useRef();
  const logo2Ref     = useRef();

  const [form, setForm]         = useState(EMPTY);
  const [saving, setSaving]     = useState(false);
  const [importMsg, setImportMsg] = useState('');
  const [error, setError]       = useState('');

  useEffect(() => {
    if (isNew) return;
    fetch(`${API}/api/admin/companies/${id}`, { headers: authHeaders() })
      .then(r => r.json()).then(setForm);
  }, [id]);

  const set = (key, val) => setForm(p => ({ ...p, [key]: val }));

  const save = async (e) => {
    e.preventDefault(); setSaving(true); setError('');
    try {
      const res = await fetch(`${API}/api/admin/companies${isNew ? '' : `/${id}`}`, {
        method: isNew ? 'POST' : 'PUT',
        headers: authHeaders(),
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || 'Save failed'); return; }
      if (isNew) navigate(`/admin/companies/${data.id}`);
    } catch { setError('Network error'); }
    finally { setSaving(false); }
  };

  const uploadLogo = async () => {
    const fd = new FormData();
    if (logoRef.current.files[0])  fd.append('logo',  logoRef.current.files[0]);
    if (logo2Ref.current.files[0]) fd.append('logo2', logo2Ref.current.files[0]);
    if (!fd.has('logo') && !fd.has('logo2')) return;
    await fetch(`${API}/api/admin/companies/${id}/logo`, { method: 'POST', headers: authHeaders(false), body: fd });
    const updated = await (await fetch(`${API}/api/admin/companies/${id}`, { headers: authHeaders() })).json();
    setForm(updated);
  };

  const importCsv = async () => {
    if (!csvRef.current.files[0]) return;
    setImportMsg('Importing…');
    const fd = new FormData();
    fd.append('file', csvRef.current.files[0]);
    const res  = await fetch(`${API}/api/admin/companies/${id}/import-shareholders`, { method: 'POST', headers: authHeaders(false), body: fd });
    const data = await res.json();
    setImportMsg(`✅ ${data.created} created, ${data.updated} updated${data.errors?.length ? `, ${data.errors.length} skipped` : ''}`);
  };

  const field = (label, key, type = 'text', extra = {}) => (
    <div className="form-group" key={key}>
      <label className="label-text">{label}</label>
      <input type={type} value={form[key] || ''} onChange={e => set(key, e.target.value)} className="input" style={{ paddingLeft: '1rem' }} {...extra} />
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', padding: '2rem' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <button onClick={() => navigate('/admin/companies')} className="secondary-btn" style={{ marginBottom: '1.5rem' }}>
          <FaArrowLeft /> Back
        </button>
        <h2 style={{ color: '#0f3d2e', marginBottom: '1.5rem' }}>{isNew ? 'Add Company' : 'Edit Company'}</h2>

        {error && <p className="error-message">{error}</p>}

        <form onSubmit={save} style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 1rem' }}>
            {field('Company Name', 'name', 'text', { required: true })}
            {field('Slug (sahco)', 'slug', 'text', { required: true })}
            {field('Subdomain (sahco.apel.com.ng)', 'subdomain', 'text', { required: true })}
            {field('Meeting Type', 'meeting_type')}
            {field('Meeting Date', 'meeting_date', 'text', { placeholder: 'Friday, 19th June 2026' })}
            {field('Meeting Time', 'meeting_time', 'text', { placeholder: '11:00 AM' })}
          </div>
          {field('Zoom Link', 'zoom_link', 'url')}
          {field('YouTube Link', 'youtube_link', 'url')}

          <div className="form-group">
            <label className="label-text">Brand Colour</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem' }}>
              <input type="color" value={form.primary_color || '#107b5f'} onChange={e => set('primary_color', e.target.value)} style={{ width: 44, height: 44, border: 'none', borderRadius: 8, cursor: 'pointer', padding: 0 }} />
              <span style={{ fontSize: '.9rem', color: '#64748b' }}>{form.primary_color}</span>
            </div>
          </div>

          <div className="form-group">
            <label className="label-text">Registration Status</label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '.75rem', cursor: 'pointer' }}>
              <input type="checkbox" checked={!!form.is_registration_open} onChange={e => set('is_registration_open', e.target.checked)} style={{ width: 18, height: 18 }} />
              <span style={{ fontSize: '.9rem' }}>Registration is <strong>{form.is_registration_open ? 'OPEN' : 'CLOSED'}</strong></span>
            </label>
          </div>

          <button type="submit" className="submit-btn" disabled={saving}>
            {saving ? <span className="spinner" /> : (isNew ? 'Create Company' : 'Save Changes')}
          </button>
        </form>

        {!isNew && (
          <>
            {/* Logo upload */}
            <div style={{ marginTop: '2rem', background: '#fff', borderRadius: 12, padding: '1.5rem', boxShadow: '0 0 0 1px rgba(0,0,0,.06)' }}>
              <h4 style={{ marginBottom: '1rem', color: '#0f3d2e' }}>Logos</h4>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                {form.logo_url  && <img src={form.logo_url}  alt="Logo 1" style={{ height: 50, objectFit: 'contain' }} />}
                {form.logo2_url && <img src={form.logo2_url} alt="Logo 2" style={{ height: 50, objectFit: 'contain' }} />}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div><label className="label-text">Logo 1</label><input type="file" ref={logoRef}  accept="image/*" style={{ fontSize: '.85rem' }} /></div>
                <div><label className="label-text">Logo 2</label><input type="file" ref={logo2Ref} accept="image/*" style={{ fontSize: '.85rem' }} /></div>
              </div>
              <button type="button" onClick={uploadLogo} className="submit-btn" style={{ marginTop: '1rem' }}>
                <FaUpload /> Upload Logos
              </button>
            </div>

            {/* CSV import */}
            <div style={{ marginTop: '1.5rem', background: '#fff', borderRadius: 12, padding: '1.5rem', boxShadow: '0 0 0 1px rgba(0,0,0,.06)' }}>
              <h4 style={{ marginBottom: '.5rem', color: '#0f3d2e' }}>Import Shareholders (CSV / Excel)</h4>
              <p style={{ fontSize: '.82rem', color: '#64748b', marginBottom: '1rem' }}>
                Columns: <code>Account No, Name, Email, Phone, Holdings, CHN, RIN, Address</code>
              </p>
              <input type="file" ref={csvRef} accept=".csv,.xlsx,.xls" style={{ fontSize: '.85rem', marginBottom: '.75rem', display: 'block' }} />
              <button type="button" onClick={importCsv} className="submit-btn" style={{ background: '#0f3d2e' }}>
                <FaFileExcel /> Import
              </button>
              {importMsg && <p style={{ marginTop: '.75rem', fontSize: '.875rem', color: '#107b5f', fontWeight: 600 }}>{importMsg}</p>}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
