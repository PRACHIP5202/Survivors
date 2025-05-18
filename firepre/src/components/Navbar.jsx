import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DarkModeToggle from './DarkModeToggle';
import { useTheme } from '../contexts/ThemeContext';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { darkMode } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''} ${darkMode ? 'navbar-dark' : ''}`}>
      <div className="container navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="fire-icon"></span>
          <span className="logo-text">EmberEye</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="navbar-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/risk-map" className="nav-link">AI Risk Map</Link>
          <Link to="/how-it-works" className="nav-link">How It Works</Link>
          <Link to="/resources" className="nav-link">Resources</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
        </div>

        <div className="navbar-actions">
          <DarkModeToggle />
          <Link to="/risk-map" className="cta-button">Check Wildfire Risk</Link>

          {/* Mobile Menu Button */}
          <button 
            className="mobile-menu-button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className="hamburger-icon">
              {isMobileMenuOpen ? '✕' : '☰'}
            </span>
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <Link to="/" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
        <Link to="/risk-map" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>AI Risk Map</Link>
        <Link to="/how-it-works" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>How It Works</Link>
        <Link to="/resources" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>Resources</Link>
        <Link to="/contact" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
        <div className="mobile-actions">
          <div className="mobile-theme-toggle">
            <span>Dark Mode</span>
            <DarkModeToggle />
          </div>
          <Link to="/risk-map" className="mobile-cta-button" onClick={() => setIsMobileMenuOpen(false)}>Check Wildfire Risk</Link>
        </div>
      </div>
    </nav>
  );
}
