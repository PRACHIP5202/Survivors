import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function ContactPage() {
  const [heroRef, heroInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const [cardsRef, cardsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [formRef, formInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    inquiryType: 'general'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setSubmitStatus('success');
      setIsSubmitting(false);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        inquiryType: 'general'
      });
      
      // Clear success message after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    }, 2000);
  };

  const contactMethods = [
    {
      icon: '💼',
      title: 'Business Inquiries',
      description: 'Partnerships, enterprise solutions, and business opportunities',
      email: 'business@embereye.com',
      responseTime: '24-48 hours',
      category: 'business'
    },
    {
      icon: '🔧',
      title: 'Technical Support',
      description: 'Platform assistance, bug reports, and technical issues',
      email: 'support@embereye.com',
      responseTime: '2-4 hours',
      category: 'support'
    },
    {
      icon: '🔬',
      title: 'Research Collaboration',
      description: 'Academic partnerships, data sharing, and research projects',
      email: 'research@embereye.com',
      responseTime: '1-2 weeks',
      category: 'research'
    },
    {
      icon: '📢',
      title: 'Media & Press',
      description: 'Press inquiries, interviews, and media collaborations',
      email: 'media@embereye.com',
      responseTime: '24 hours',
      category: 'media'
    }
  ];

  const officeLocations = [
    {
      city: 'San Francisco',
      address: '123 Innovation Drive, San Francisco, CA 94105',
      phone: '+1 (415) 555-0123',
      type: 'Headquarters'
    },
    {
      city: 'Los Angeles',
      address: '456 Wildfire Research Blvd, Los Angeles, CA 90210',
      phone: '+1 (213) 555-0456',
      type: 'Research Center'
    },
    {
      city: 'Sacramento',
      address: '789 Emergency Response Ave, Sacramento, CA 95814',
      phone: '+1 (916) 555-0789',
      type: 'Operations Center'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <div className="contact-page-enhanced">
      {/* Hero Section */}
      <motion.section 
        ref={heroRef}
        className="contact-hero"
        initial={{ opacity: 0, y: 30 }}
        animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8 }}
      >
        <div className="hero-background">
          <div className="hero-overlay"></div>
        </div>
        <div className="container">
          <div className="hero-content">
            <motion.h1 
              className="hero-title"
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Get in Touch
            </motion.h1>
            <motion.p 
              className="hero-subtitle"
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Connect with our wildfire prevention experts for support, partnerships, or inquiries
            </motion.p>
            <motion.div 
              className="hero-stats"
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="stat">
                <span className="stat-number">24/7</span>
                <span className="stat-label">Emergency Support</span>
              </div>
              <div className="stat">
                <span className="stat-number">&lt; 4hrs</span>
                <span className="stat-label">Response Time</span>
              </div>
              <div className="stat">
                <span className="stat-number">50+</span>
                <span className="stat-label">Partners</span>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Contact Methods */}
      <motion.section 
        ref={cardsRef}
        className="contact-methods"
        variants={containerVariants}
        initial="hidden"
        animate={cardsInView ? "visible" : "hidden"}
      >
        <div className="container">
          <motion.div className="section-header" variants={itemVariants}>
            <h2 className="section-title">How Can We Help?</h2>
            <p className="section-subtitle">
              Choose the best way to reach us based on your inquiry type
            </p>
          </motion.div>

          <div className="contact-methods-grid">
            {contactMethods.map((method, index) => (
              <motion.div
                key={method.category}
                className="contact-method-card"
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="method-icon">{method.icon}</div>
                <h3 className="method-title">{method.title}</h3>
                <p className="method-description">{method.description}</p>
                <a href={`mailto:${method.email}`} className="method-email">
                  {method.email}
                </a>
                <div className="method-response-time">
                  <span className="response-label">Response time:</span>
                  <span className="response-time">{method.responseTime}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Contact Form */}
      <motion.section 
        ref={formRef}
        className="contact-form-section"
        initial={{ opacity: 0, y: 30 }}
        animate={formInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container">
          <div className="form-section-header">
            <h2 className="section-title">Send Us a Message</h2>
            <p className="section-subtitle">
              Fill out the form below and we'll get back to you as soon as possible
            </p>
          </div>

          <div className="contact-form-container">
            <form className="enhanced-contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your full name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="inquiryType">Inquiry Type *</label>
                  <select
                    id="inquiryType"
                    name="inquiryType"
                    value={formData.inquiryType}
                    onChange={handleChange}
                    required
                  >
                    <option value="general">General Inquiry</option>
                    <option value="business">Business Partnership</option>
                    <option value="support">Technical Support</option>
                    <option value="research">Research Collaboration</option>
                    <option value="media">Media & Press</option>
                    <option value="emergency">Report Hazard</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="subject">Subject *</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="Brief subject line"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Describe your inquiry in detail..."
                  rows="6"
                ></textarea>
              </div>

              <motion.button
                type="submit"
                className={`submit-button ${isSubmitting ? 'submitting' : ''}`}
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? (
                  <span className="button-content">
                    <span className="spinner"></span>
                    Sending...
                  </span>
                ) : (
                  'Send Message'
                )}
              </motion.button>

              {submitStatus === 'success' && (
                <motion.div
                  className="success-message"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  ✅ Thank you! Your message has been sent successfully. We'll get back to you soon.
                </motion.div>
              )}
            </form>
          </div>
        </div>
      </motion.section>

      {/* Office Locations */}
      <section className="office-locations">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Our Locations</h2>
            <p className="section-subtitle">
              Visit us at one of our offices across California
            </p>
          </div>

          <div className="locations-grid">
            {officeLocations.map((location, index) => (
              <motion.div
                key={location.city}
                className="location-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -3 }}
              >
                <div className="location-header">
                  <h3 className="location-city">{location.city}</h3>
                  <span className="location-type">{location.type}</span>
                </div>
                <p className="location-address">{location.address}</p>
                <a href={`tel:${location.phone}`} className="location-phone">
                  {location.phone}
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Notice */}
      <section className="emergency-notice">
        <div className="container">
          <motion.div 
            className="emergency-content"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="emergency-icon">🚨</div>
            <div className="emergency-text">
              <h3>Emergency Situations</h3>
              <p>
                This platform is not for emergency reporting. If you're experiencing an immediate 
                wildfire threat, contact emergency services immediately.
              </p>
            </div>
            <motion.a 
              href="tel:911" 
              className="emergency-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="emergency-button-icon">📞</span>
              Call 911 Now
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
