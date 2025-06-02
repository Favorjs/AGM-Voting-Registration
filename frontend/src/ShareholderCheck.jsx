import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaSearch,
  FaUser,
  FaIdCard,
  FaEnvelope,
  FaPhone,
  FaChevronRight,
} from 'react-icons/fa';

const ShareholderCheck = ({ setCurrentView, setShareholderData }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [results, setResults] = useState(null);
  const [selectedShareholder, setSelectedShareholder] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    setError('');
    setLoading(true);
    setResults(null);
    setSelectedShareholder(null);

    try {
      const response = await fetch('https://e-voting-backeknd-production.up.railway.app/api/check-shareholder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ searchTerm }),
      });

      const data = await response.json();

      if (data.status === 'account_match') {
        setSelectedShareholder(data.shareholder);
      } else if (data.status === 'name_matches') {
        setResults(data.shareholders);
      } else if (data.status === 'chn_match') {
        setSelectedShareholder(data.shareholder);
      } else {
        setError(data.message || 'No matching shareholders found');
      }
    } catch (err) {
      setError('Failed to connect to server');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    if (!selectedShareholder) return;

    setLoading(true);
    try {
      console.log('Sending to backend:', {
        acno: selectedShareholder.acno,
        email: selectedShareholder.email,
        phone_number: selectedShareholder.phone_number,
        chn: selectedShareholder.chn,
      });
      const response = await fetch('https://e-voting-backeknd-production.up.railway.app/api/send-confirmation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          acno: selectedShareholder.acno,
          email: selectedShareholder.email,
          phone_number: selectedShareholder.phone_number,
          chn: selectedShareholder.chn,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setShareholderData(selectedShareholder);
        setCurrentView('Presuccess');
      } else {
        setError(data.error || 'Registration failed or This shareholder is already registered');
      }
    } catch (err) {
      setError('Failed to connect to server');
    } finally {
      setLoading(false);
    }
  };

  const resetSearch = () => {
    setResults(null);
    setSelectedShareholder(null);
    setSearchTerm('');
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1
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

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } }
  };

  const scaleUp = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 200 } }
  };

  return (
    <motion.div 
      className="verification-container"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div className="verification-form" variants={fadeIn}>
        <AnimatePresence mode="wait">
          {!selectedShareholder && !results ? (
            <motion.div
              key="search-form"
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0 }}
              variants={containerVariants}
            >
              <motion.form onSubmit={handleSearch} variants={itemVariants}>
                <motion.h2 variants={itemVariants}>SAHCO AGM</motion.h2>
                <motion.p className="form-description" variants={itemVariants}>
                  Search by name, CHN or account number
                </motion.p>

                <motion.div className="form-group" variants={itemVariants}>
                  <div className="input-with-icon">
                    <FaSearch className="input-icon" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Name or Account Number"
                      required
                    />
                  </div>
                </motion.div>

                <motion.button 
                  type="submit" 
                  disabled={loading || !searchTerm.trim()}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  variants={itemVariants}
                >
                  {loading ? (
                    <motion.span 
                      className="spinner"
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    />
                  ) : (
                    <>
                      <FaSearch /> Search
                    </>
                  )}
                </motion.button>
              </motion.form>

              <AnimatePresence>
                {error && (
                  <motion.p 
                    className="error"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          ) : selectedShareholder ? (
            <motion.div
              key="verification-success"
              className="verification-success"
              initial="hidden"
              animate="visible"
              variants={scaleUp}
            >
              <motion.h2 variants={itemVariants}>Verify Your Details</motion.h2>
              <motion.div 
                className="shareholder-details"
                variants={containerVariants}
              >
                <motion.p variants={itemVariants}><FaUser /> <strong>Name:</strong> {selectedShareholder.name}</motion.p>
                <motion.p variants={itemVariants}><FaIdCard /> <strong>Account No:</strong> {selectedShareholder.acno}</motion.p>
                <motion.p variants={itemVariants}><FaEnvelope /> <strong>Email:</strong> {selectedShareholder.email}</motion.p>
                <motion.p variants={itemVariants}><FaPhone /> <strong>Phone:</strong> {selectedShareholder.phone_number}</motion.p>
              </motion.div>

              <motion.div 
                className="action-buttons"
                variants={containerVariants}
              >
                <motion.button 
                  onClick={resetSearch} 
                  className="secondary-btn"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  variants={itemVariants}
                >
                  Back to Search
                </motion.button>
                <motion.button 
                  onClick={handleRegister} 
                  disabled={loading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  variants={itemVariants}
                >
                  {loading ? (
                    <motion.span 
                      className="spinner"
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    />
                  ) : (
                    'Confirm Registration'
                  )}
                </motion.button>
              </motion.div>

              <AnimatePresence>
                {error && (
                  <motion.p 
                    className="error"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              key="results-container"
              className="results-container"
              initial="hidden"
              animate="visible"
              variants={fadeIn}
            >
              <motion.h2 variants={itemVariants}>Select Your Account</motion.h2>
              <motion.div 
                className="results-table"
                variants={containerVariants}
              >
                <motion.div 
                  className="table-container"
                  variants={scaleUp}
                >
                  <table>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Account No</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.map((sh, index) => (
                        <motion.tr 
                          key={sh.acno}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          whileHover={{ scale: 1.01 }}
                        >
                          <td>{sh.name}</td>
                          <td>{sh.acno}</td>
                          <td>
                            <motion.button
                              onClick={() => setSelectedShareholder(sh)}
                              className="select-btn"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              Select <FaChevronRight />
                            </motion.button>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </motion.div>
              </motion.div>

              <motion.button 
                onClick={resetSearch} 
                className="secondary-btn"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                variants={itemVariants}
              >
                Back to Search
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default ShareholderCheck;