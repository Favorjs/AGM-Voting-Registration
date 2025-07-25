export default function Footer() {
    return (
      <footer className="footer">
        <div className="footer-content">
          {/* <div className="footer-section">
            <h4>E-Voting System</h4>
            <p>Secure digital voting platform</p>
          </div> */}
          
          <div className="footer-section">
            <h4>Quick Links</h4>
            <a href="#faq">FAQ</a>
            {/* <a href="#contact">Contact</a> */}
            {/* <a href="#privacy">Privacy Policy</a> */}
          </div>
          
          <div className="footer-section">
            <h4>Contact</h4>
            <p>registrars@apel.com.ng</p>
            <p>+234 704 612 6698</p>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} AGM Registration. All rights reserved. Apel Capital Registrarrs</p>
        </div>
      </footer>
    )
  }