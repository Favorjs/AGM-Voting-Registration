  <div className="success-container">
      <div className="success-card">
        <div className="success-icon">
          <FaCheckCircle />
        </div>
        
        <h2>Registration Successful! 🎉</h2>
        
        <div className="confirmation-message">
          <p>Thank you for registering for the AGM e-voting.</p>
          <p>A confirmation has been sent to <strong>{selectedShareholder?.email}</strong>.</p>
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
          <p>You'll receive an email before and when voting begins with a direct link to the voting portal.</p>
        </div>

        <button 
          onClick={resetSearch}
          className="back-home-btn"
        >
          Back to Home <FaArrowRight />
        </button>
      </div>
    </div>