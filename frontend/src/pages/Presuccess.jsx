import { FaCheckCircle, FaEnvelope, FaClock } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const PreRegistrationSuccess = () => {
  return (
    <div className="success-container">
      <div className="success-card">
        <div className="success-icon">
          <FaCheckCircle />
        </div>
        
        <h2>Pre-Registration Complete! 🎉</h2>
        
        <div className="confirmation-message">
          <p>Thank you for starting your registration process.</p>
          <p><FaEnvelope /> Please check your email and click the confirmation link to complete your registration.</p>
          <p><FaClock /> The link will expire in 15 minutes.</p>
        </div>

        <div className="next-steps">
          <h4>What's Next?</h4>
          <p>After clicking the confirmation link in your email, you'll be fully registered for the e-voting system.</p>
        </div>

        <Link to="/" className="back-home-btn">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default PreRegistrationSuccess;