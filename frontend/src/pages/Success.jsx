import { useEffect } from 'react';
import { FaCheckCircle, FaEnvelope, FaPhone, FaArrowRight, FaVoteYea } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './Success.css';

const Success = ({ shareholderData, onBackToHome }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="success-container">
      <div className="success-card">
        <div className="success-icon">
          <FaCheckCircle />
        </div>
        
        <h2>Registration Successful! 🎉</h2>
        
        <div className="confirmation-message">
          <p>Thank you for registering for the SAHCO AGM.</p>
          <p>A Success email has been sent to <strong>{shareholderData?.email}</strong>.</p>
        </div>

        <div className="voting-instructions">
          <h3><FaVoteYea /> Voting Instructions</h3>
          <ol>
            <li>
              <span className="instruction-step">1</span>
              <p>When voting begins, visit the e-voting portal</p>
            </li>
            <li>
              <span className="instruction-step">2</span>
              <p>Login using either:</p>
              <div className="login-options">
                <div className="option">
                  <FaEnvelope className="option-icon" />
                  <span>Your registered email</span>
                </div>
                <p className="option-or">OR</p>
                <div className="option">
                  <FaPhone className="option-icon" />
                  <span>Your registered phone number</span>
                </div>
              </div>
            </li>
            <li>
              <span className="instruction-step">3</span>
              <p>Follow the on-screen instructions to cast your vote</p>
            </li>
            <li>
              <span className="instruction-step">4</span>
              <p>Review and submit your ballot</p>
            </li>
          </ol>
        </div>

        <div className="next-steps">
          <h4>What's Next?</h4>
          <p>You'll receive an email befor and when  when voting begins with a direct link to the voting portal.</p>
        </div>

        <button 
          onClick={() => onBackToHome()}
          className="back-home-btn"
        >
          Back to Home <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default Success;