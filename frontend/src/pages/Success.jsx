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

      <h3><FaVoteYea /> Zoom Voting Instructions</h3>
<ol>
  <li>
    <span className="instruction-step">1</span>
    <p>Before the meeting, ensure you have the latest version of Zoom installed</p>
  </li>
  <li>
    <span className="instruction-step">2</span>
    <p>Join the scheduled Zoom meeting using the link provided in your invitation</p>
  </li>
  <li>
    <span className="instruction-step">3</span>
    <p>During the voting session, the host will launch the polling feature</p>
  </li>
  <li>
    <span className="instruction-step">4</span>
    <p>When prompted:</p>
    <div className="login-options">
      <div className="option">
        <FaDesktop className="option-icon" />
        <span>Click the "For" checkbox that appears</span>
      </div>
      <p className="option-or">OR</p>
      <div className="option">
        <FaMobile className="option-icon" />
        <span>Click the "Against" checkbox that appears</span>
      </div>
    </div>
  </li>
  <li>
    <span className="instruction-step">5</span>
    <p>Select your vote from the options presented</p>
  </li>
  <li>
    <span className="instruction-step">6</span>
    <p>Submit your vote before the time limit expires</p>
  </li>
</ol>

<div className="next-steps">
  <h4>What's Next?</h4>
  <p>You'll receive a Zoom invitation with the meeting details and voting schedule. Results will be displayed in real time.</p>
</div>

        <button 
          onClick={() => onBackToHome()}
          className="back-home-btn"
        >
     <Link to="https://agm-registration.apel.com.ng/" className="back-home-btn">   Back to Home </Link>     <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default Success;