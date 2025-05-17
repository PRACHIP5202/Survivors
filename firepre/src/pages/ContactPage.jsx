import ContactFeedback from '../components/ContactFeedback';

export default function ContactPage() {
  return (
    <div className="contact-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Contact Us</h1>
          <p className="page-description">
            Get in touch with our team for questions, suggestions, or to report wildfire hazards
          </p>
        </div>
        
        <div className="contact-info-cards">
          <div className="info-card">
            <div className="info-icon">💼</div>
            <h3>Business Inquiries</h3>
            <p>For partnerships and business opportunities</p>
            <a href="mailto:business@fireguard-ai.com">business@fireguard-ai.com</a>
          </div>
          
          <div className="info-card">
            <div className="info-icon">🔧</div>
            <h3>Technical Support</h3>
            <p>For help with our platform and tools</p>
            <a href="mailto:support@fireguard-ai.com">support@fireguard-ai.com</a>
          </div>
          
          <div className="info-card">
            <div className="info-icon">🔍</div>
            <h3>Research Collaboration</h3>
            <p>For academic and research partnerships</p>
            <a href="mailto:research@fireguard-ai.com">research@fireguard-ai.com</a>
          </div>
        </div>
        
        <ContactFeedback />
        
        <div className="emergency-notice">
          <h3>🚨 Emergency Situations</h3>
          <p>
            This website and its reporting tools are not meant for emergency reporting. 
            If you are experiencing an immediate threat from a wildfire, please contact your 
            local emergency services immediately.
          </p>
          <div className="emergency-button">
            <a href="tel:911" className="emergency-link">Call 911 (US) for Emergencies</a>
          </div>
        </div>
      </div>
    </div>
  );
}
