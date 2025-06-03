import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function HowItWorksPage() {
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.3 });
  const [processRef, processInView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [techRef, techInView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [dataRef, dataInView] = useInView({ triggerOnce: true, threshold: 0.2 });

  const processSteps = [
    {
      id: 1,
      title: 'Data Collection',
      description: 'We gather real-time data from multiple sources including weather stations, satellites, and ground sensors.',
      icon: '📡',
      details: ['Meteorological data', 'Satellite imagery', 'Vegetation maps', 'Terrain analysis']
    },
    {
      id: 2,
      title: 'AI Processing',
      description: 'Our advanced CNN model analyzes patterns and environmental factors to assess wildfire probability.',
      icon: '🧠',
      details: ['Machine learning algorithms', 'Pattern recognition', 'Risk factor analysis', 'Predictive modeling']
    },
    {
      id: 3,
      title: 'Risk Assessment',
      description: 'The system generates accurate risk scores and categorizes areas into 5 distinct risk levels.',
      icon: '🔍',
      details: ['Risk scoring', 'Geographic mapping', 'Confidence metrics', 'Temporal analysis']
    },
    {
      id: 4,
      title: 'Alert & Response',
      description: 'Communities receive timely alerts with actionable recommendations for wildfire preparedness.',
      icon: '🚨',
      details: ['Real-time alerts', 'Safety recommendations', 'Evacuation planning', 'Community notifications']
    },
  ];

  const technologies = [
    {
      title: 'Convolutional Neural Networks',
      description: 'Deep learning models that process image data to identify fire risk patterns',
      icon: '🤖'
    },
    {
      title: 'Real-time Data Processing',
      description: 'Continuous monitoring and analysis of environmental conditions',
      icon: '⚡'
    },
    {
      title: 'Geospatial Analysis',
      description: 'Advanced mapping and location-based risk assessment capabilities',
      icon: '🗺️'
    },
    {
      title: 'Weather Integration',
      description: 'Direct integration with meteorological services for current conditions',
      icon: '🌤️'
    }
  ];

  const dataSources = [
    { name: 'Weather Stations', icon: '🌡️', description: 'Real-time temperature, humidity, and wind data' },
    { name: 'Satellite Imagery', icon: '🛰️', description: 'NASA and ESA earth observation data' },
    { name: 'Vegetation Maps', icon: '🌲', description: 'Forest density and fuel load information' },
    { name: 'Topographical Data', icon: '⛰️', description: 'Elevation and terrain characteristics' },
    { name: 'Historical Records', icon: '📊', description: 'Past wildfire events and patterns' },
    { name: 'Urban Interface', icon: '🏘️', description: 'Population and infrastructure mapping' }
  ];

  return (
    <div className="how-it-works-page">
      {/* Hero Section */}
      <motion.section 
        ref={heroRef}
        className="how-it-works-hero"
        initial={{ opacity: 0, y: 30 }}
        animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">How EmberEye Works</h1>
            <p className="hero-description">
              Discover the cutting-edge technology behind our AI-powered wildfire risk prediction system.
              From data collection to community alerts, learn how we help protect lives and property.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Process Steps Section */}
      <motion.section 
        ref={processRef}
        className="process-section"
        initial={{ opacity: 0 }}
        animate={processInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container">
          <h2 className="section-title">Our 4-Step Process</h2>
          <div className="process-grid">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.id}
                className="process-card"
                initial={{ opacity: 0, y: 30 }}
                animate={processInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <div className="process-header">
                  <div className="process-icon">{step.icon}</div>
                  <div className="process-number">{step.id}</div>
                </div>
                <h3 className="process-title">{step.title}</h3>
                <p className="process-description">{step.description}</p>
                <ul className="process-details">
                  {step.details.map((detail, idx) => (
                    <li key={idx}>{detail}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Technology Section */}
      <motion.section 
        ref={techRef}
        className="technology-section"
        initial={{ opacity: 0 }}
        animate={techInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container">
          <h2 className="section-title">Advanced Technologies</h2>
          <p className="section-subtitle">
            EmberEye leverages state-of-the-art artificial intelligence and data processing technologies
            to deliver accurate and timely wildfire risk assessments.
          </p>
          <div className="technology-grid">
            {technologies.map((tech, index) => (
              <motion.div
                key={index}
                className="technology-card"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={techInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="tech-icon">{tech.icon}</div>
                <h3 className="tech-title">{tech.title}</h3>
                <p className="tech-description">{tech.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Data Sources Section */}
      <motion.section 
        ref={dataRef}
        className="data-sources-section"
        initial={{ opacity: 0 }}
        animate={dataInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container">
          <h2 className="section-title">Data Sources</h2>
          <p className="section-subtitle">
            Our predictions are powered by comprehensive data from trusted sources worldwide
          </p>
          <div className="data-sources-grid">
            {dataSources.map((source, index) => (
              <motion.div
                key={index}
                className="data-source-card"
                initial={{ opacity: 0, x: -20 }}
                animate={dataInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="source-icon">{source.icon}</div>
                <div className="source-content">
                  <h3 className="source-name">{source.name}</h3>
                  <p className="source-description">{source.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
}
