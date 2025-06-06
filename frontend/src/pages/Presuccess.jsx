import { motion } from 'framer-motion';
import { FaCheckCircle, FaEnvelope, FaClock } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Presuccess.css';

const PreRegistrationSuccess = () => {
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
        
        <motion.h2 variants={itemVariants}>Pre-Registration Complete! 🎉</motion.h2>
        
        <motion.div className="confirmation-message" variants={itemVariants}>
          <p>Thank you for starting your registration process.</p>
          <p><FaEnvelope /> Please check your email or Phone Number and click the confirmation link to complete your registration.</p>
          <p><FaClock /> The link will expire in 15 minutes.</p>
        </motion.div>

        <div className="next-steps">
          <h4>What's Next?</h4>
          <p>After clicking the confirmation link in your email, you'll be fully registered for the Zoom Meeting.</p>
        </div>

  <motion.div variants={itemVariants}>
          <Link to="https://agm-registration.apel.com.ng/" className="back-home-btn">
            Back to Home
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default PreRegistrationSuccess;