import { Link } from 'react-router-dom';
import { useCompany } from './context/CompanyContext';

export default function Header() {
  const { company } = useCompany() || {};

  const logo1 = company?.logo_url  || '/logo.png';
  const logo2 = company?.logo2_url || '/imgs/sahco.webp';

  return (
    <header className="header">
      <Link to="/" className="logo-container" style={{ textDecoration: 'none' }}>
        <img src={logo1} alt={company?.name || 'Logo'} className="logo" />
      </Link>
      <img src={logo2} alt="Partner Logo" className="logo logo-right" />
    </header>
  );
}
