import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaEnvelope, FaPhone, FaArrowRight, FaVoteYea, FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './Success.css';

const Success = ({ shareholderData, onBackToHome }) => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <motion.div 
      className="success-container"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div 
        className="success-card motion-card"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        <motion.div className="success-icon" variants={itemVariants}>
          <FaCheckCircle />
        </motion.div>
        
        <motion.h2 variants={itemVariants}>Registration Successful! 🎉</motion.h2>
        
        <motion.div className="confirmation-message" variants={itemVariants}>
          <p>Thank you for registering for the INTERNATIONAL BREWERIES PLC AGM.</p>
          <p>A Success email has been sent to <strong>{shareholderData?.email}</strong>.</p>
        </motion.div>

     <motion.div className="voting-instructions">
          <h3><FaVoteYea /> Voting Instructions</h3>
          <ol>
            <li >
            
              <p>Before the meeting, ensure you have the latest version of Zoom installed</p>
            </li>
            <li>
           
              <p>Join the scheduled Zoom meeting using the link provided in your invitation</p>
         
            </li>
            <li>
             
              <p>During the voting session, the host will launch the polling feature</p>
            </li>
            <li>
           
              <p>When prompted:</p>
              
          <div className="voting-options">
  <div className="option">
    <FaThumbsUp className="option-icon" />
    <span>Vote FOR the resolution</span>
  </div>
  <p className="option-or">OR</p>
  <div className="option">
    <FaThumbsDown className="option-icon" />
    <span>Vote AGAINST the resolution</span>
  </div>
</div>
  </li>
  <li>
 
    <p>Select your vote from the options presented</p>
  </li>
  <li>
   
    <p>Submit your vote before the time limit expires</p>
            </li>
          </ol>
     </motion.div>

         <motion.div className="next-steps">
          <h4>What's Next?</h4>
          <p>You'll receive a Zoom invitation with the meeting details and voting schedule. Results will be shared in real time as you vote. </p>
      </motion.div>
 <motion.button 
          onClick={() => onBackToHome()}
          className="back-home-btn"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          variants={itemVariants}
        >
          Back to Home <FaArrowRight />
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default Success;





