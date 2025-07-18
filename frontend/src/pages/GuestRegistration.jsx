import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const GuestRegistration = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    userType: 'guest'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.phone || !formData.userType) {
      setError('Please fill in all required fields');
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    // Phone validation (basic)
    if (formData.phone.length < 10) {
      setError('Please enter a valid phone number');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      // Here you would typically send the data to your backend
      // For now, we'll just log it and navigate to a success page
      const response = await fetch('https://e-voting-backeknd-production-077c.up.railway.app/api/register-guest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
  
      const data = await response.json();
      
      if (response.ok && data.success) {
        // Update the guestData in parent component
        setGuestData(data.guest);
        // Then navigate to success page
        navigate('/guest/success');

      } 
    } catch (err) {
      setError('Failed to connect to server');
      console.error('Registration error:', err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <motion.div 
      className="guest-registration-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="guest-registration-card">
        <h2>Guest Registration</h2>
        <p>Please fill in your details to register for the AGM</p>
        
        {error && <p className="error-message">{error}</p>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />
          </div>
          
          <div className="form-group">
            <label>Email Address *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>
          
          <div className="form-group">
            <label>Phone Number *</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              required
            />
          </div>
          
          <div className="form-group">
            <label>Attending As</label>
            <select
              name="userType"
              value={formData.userType}
              onChange={handleChange}
            >
              <option value="guest">Guest</option>
              <option value="regulator">Regulator</option>
              <option value="press">Press</option>
              <option value="observer">Observer</option>
            </select>
          </div>
          
          <button type="submit" disabled={loading} className="submit-btn">
            {loading ? 'Registering...' : 'Complete Registration'}
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default GuestRegistration;