import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function RiskExplorer() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const features = [
    {
      id: 1,
      title: 'Predictive AI Model',
      description: 'Advanced algorithms assess risk based on environmental factors and historical data',
      icon: '🧠',
    },
    {
      id: 2,
      title: 'Real-time Data',
      description: 'Live satellite imagery and sensor readings for up-to-the-minute accuracy',
      icon: '📡',
    },
    {
      id: 3,
      title: 'Regional Risk Levels',
      description: 'Color-coded visualization of risk zones for easy interpretation',
      icon: '🗺️',
    },
    {
      id: 4,
      title: 'Alerts & Recommendations',
      description: "Personalized safety suggestions based on your location's risk profile",
      icon: '🚨',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <section className="risk-explorer section" id="risk-explorer">
      <div className="container">
        <div className="risk-explorer-grid">
          <motion.div 
            className="risk-explorer-content"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="section-title">AI Risk Explorer</h2>
            <p className="section-description">
              Our interactive map tool processes real-time environmental and meteorological data to predict wildfire risk levels with unprecedented accuracy. Select any location to get a detailed risk assessment.
            </p>
            <Link to="/risk-map" className="cta-button">Try the Live Risk Map</Link>
            
            <motion.div
              ref={ref}
              className="features-list"
              variants={containerVariants}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
            >
              {features.map((feature) => (
                <motion.div
                  key={feature.id}
                  className="feature-item"
                  variants={itemVariants}
                >
                  <div className="feature-icon">{feature.icon}</div>
                  <div className="feature-content">
                    <h3 className="feature-title">{feature.title}</h3>
                    <p className="feature-description">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="risk-explorer-preview"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="map-preview-card">
              <div className="map-card-header">
                <h3>Wildfire Risk Map</h3>
                <span className="live-indicator">LIVE</span>
              </div>
              <div className="map-card-preview">
                {/* This will be replaced with an actual map preview image */}
                <div className="map-placeholder">
                  <span className="map-icon">🗺️</span>
                  <p>Interactive Risk Map</p>
                  <button className="explore-map-button">Explore Map</button>
                </div>
              </div>
              <div className="map-card-footer">
                <div className="risk-level-indicators">
                  <div className="risk-indicator low">Low</div>
                  <div className="risk-indicator medium">Medium</div>
                  <div className="risk-indicator high">High</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
