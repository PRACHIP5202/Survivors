import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-section">
          <Link to="/" className="footer-logo">
            <span className="fire-icon">🔥</span>
            <span className="logo-text">EmberEye</span>
          </Link>
          <p className="footer-description">
            AI-powered wildfire risk predictions to keep communities and nature safe.
          </p>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">Quick Links</h4>
          <ul className="footer-links">
            <li><Link to="/" className="footer-link">Home</Link></li>
            <li><Link to="/risk-map" className="footer-link">AI Risk Map</Link></li>
            <li><Link to="/how-it-works" className="footer-link">How It Works</Link></li>
            <li><Link to="/resources" className="footer-link">Resources</Link></li>
            <li><Link to="/contact" className="footer-link">Contact</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">Contact</h4>
          <ul className="footer-links">
            <li><a href="mailto:support@fireguard-ai.com" className="footer-link">support@fireguard-ai.com</a></li>
            <li><a href="tel:+1-555-123-4567" className="footer-link">+1 (555) 123-4567</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">Follow Us</h4>
          <div className="social-links">
            <a href="https://twitter.com/fireguardai" className="social-link" aria-label="Twitter">
              <span className="social-icon">🐦</span>
            </a>
            <a href="https://facebook.com/fireguardai" className="social-link" aria-label="Facebook">
              <span className="social-icon">📘</span>
            </a>
            <a href="https://instagram.com/fireguardai" className="social-link" aria-label="Instagram">
              <span className="social-icon">📷</span>
            </a>
            <a href="https://linkedin.com/company/fireguardai" className="social-link" aria-label="LinkedIn">
              <span className="social-icon">💼</span>
            </a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="container">
          <p className="copyright">© {currentYear} EmberEye. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
