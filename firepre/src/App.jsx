import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import RiskMapPage from './pages/RiskMapPage';
import HowItWorksPage from './pages/HowItWorksPage';
import ResourcesPage from './pages/ResourcesPage';
import ContactPage from './pages/ContactPage';
import { ThemeProvider } from './contexts/ThemeContext';
import './App.css';
import './styles/hero-enhanced.css';
import './styles/map-enhanced.css';
import './styles/forms-enhanced.css';
import './styles/animations.css';
import './styles/risk-card-enhanced.css';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="app">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/risk-map" element={<RiskMapPage />} />
              <Route path="/how-it-works" element={<HowItWorksPage />} />
              <Route path="/resources" element={<ResourcesPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
