import { motion } from 'framer-motion';
import { FaCheckCircle } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';

const GuestSuccess = ({ guestData: propGuestData }) => {
    const { state } = useLocation();
  const guestData = propGuestData || state?.guestData;
  const navigate = useNavigate();

  return (
    <motion.div 
      className="success-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="success-card">
        <div className="success-icon">
          <FaCheckCircle />
        </div>
        
        <h2>Registration Successful! 🎉</h2>
        
        <div className="confirmation-message">
          <p>Thank you for registering for the INTERNATIONAL BREWERIES PLC AGM.</p>
          {/* <p>A confirmation has been sent to <strong>{guestData?.email}</strong>.</p> */}
          <p>You registered as: <strong>{guestData?.userType}</strong></p>
        </div>

        <div className="next-steps">
          <h4>What's Next?</h4>
          <p>You'll receive a Youtube invitation Link to attend the AGM</p>
        </div>

        <button 
          onClick={() => navigate('/')}
          className="back-home-btn"
        >
          Back to Home
        </button>
      </div>
    </motion.div>
  );
};

export default GuestSuccess;