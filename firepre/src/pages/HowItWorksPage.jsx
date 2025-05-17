import HowItWorks from '../components/HowItWorks';
import BenefitsImpact from '../components/BenefitsImpact';

export default function HowItWorksPage() {
  return (
    <div className="how-it-works-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">How It Works</h1>
          <p className="page-description">
            Learn how our AI-powered system predicts wildfire risks and helps keep communities safe.
          </p>
        </div>
        
        <div className="technology-section">
          <h2>Our Technology</h2>
          <p>
            EmberEye integrates multiple data sources including satellite imagery, weather forecasts, 
            vegetation density maps, and historical fire data to create accurate wildfire risk predictions.
            Our machine learning algorithms continuously improve by learning from new data and actual fire events.
          </p>
          
          <div className="technology-image-placeholder">
            <div className="placeholder-icon">🧠</div>
            <p>AI Technology Visualization</p>
          </div>
        </div>
        
        <HowItWorks />
        
        <div className="data-section">
          <h2>Data Sources</h2>
          <ul className="data-sources-list">
            <li>Weather stations and meteorological data</li>
            <li>NASA and ESA satellite imagery</li>
            <li>Vegetation and fuel maps</li>
            <li>Topographical information</li>
            <li>Historical wildfire records</li>
            <li>Urban-wildland interface mapping</li>
          </ul>
        </div>
        
        <BenefitsImpact />
      </div>
    </div>
  );
}
