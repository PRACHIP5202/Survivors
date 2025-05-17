import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function ContactFeedback() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would handle form submission here
    alert('Thank you for your message. We will get back to you soon!');
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
  };

  return (
    <section className="contact-feedback section" id="contact">
      <div className="container">
        <div className="section-header text-center">
          <h2 className="section-title">Contact & Feedback</h2>
          <p className="section-subtitle">
            Get in touch with our team for questions, suggestions, or to report wildfire hazards
          </p>
        </div>

        <motion.div
          ref={ref}
          className="contact-grid"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
        >
          <div className="contact-info">
            <h3>Get In Touch</h3>
            <p>
              Have questions about our AI prediction system or want to collaborate? 
              Reach out to us directly or use the form to send a message.
            </p>
            
            <div className="contact-details">
              <div className="contact-item">
                <span className="contact-icon">✉️</span>
                <a href="mailto:contact@fireguard-ai.com">contact@fireguard-ai.com</a>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📞</span>
                <a href="tel:+1-555-123-4567">+1 (555) 123-4567</a>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📍</span>
                <address>123 Fire Prevention Ave, Forest City, CA 90210</address>
              </div>
            </div>

            <div className="contact-actions">
              <button className="action-button danger">
                Report a Hazard
              </button>
              <button className="action-button secondary">
                Request a Demo
              </button>
            </div>
          </div>

          <div className="contact-form-container">
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Your email address"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="What is this regarding?"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Your message"
                  rows="5"
                ></textarea>
              </div>
              
              <button type="submit" className="submit-button">
                Send Message
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
