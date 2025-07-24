import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const UserTypeSelection = () => {
  const [userType, setUserType] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userType) {
      setError('Please select your user type');
      return;
    }
    
    if (userType === 'shareholder') {
      navigate('/shareholder');
    } else {
      navigate('/guest');
    }
  };

  return (
    <motion.div 
      className="user-type-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="user-type-card">
        <h2>INTERNATIONAL BREWERIES PLC 48TH AGM REGISTRATION</h2>
        <p>Please select your registration type:</p>
        
        {error && <p className="error-message">{error}</p>}
        
        <form onSubmit={handleSubmit}>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="userType"
                value="shareholder"
                checked={userType === 'shareholder'}
                onChange={() => setUserType('shareholder')}
              />
              <span>Shareholder</span>
              <p className="description">I own shares in International Breweries PLC</p>
            </label>
            
            <label>
              <input
                type="radio"
                name="userType"
                value="guest"
                checked={userType === 'guest'}
                onChange={() => setUserType('guest')}
              />
              <span>Guest/Regulator/Observer</span>
              <p className="description">I'm attending as a guest, regulator, or observer</p>
            </label>
          </div>
          
          <button type="submit" className="submit-btn">
            Continue
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default UserTypeSelection;
