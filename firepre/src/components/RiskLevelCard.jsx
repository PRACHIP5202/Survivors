import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import './RiskFactors.css';

export default function RiskLevelCard({ riskResult }) {
  if (!riskResult) return null;

  const { percentage, level, recommendations, factorContributions = {}, modelInfo = {} } = riskResult;
  
  const getRiskColor = () => {
    if (level === 'Extreme') return '#FF0000'; // bright red
    if (level === 'Very High') return '#FF4500'; // orange red
    if (level === 'High') return 'var(--high-risk)';
    if (level === 'Moderate') return 'var(--medium-risk)';
    return 'var(--low-risk)';
  };

  // Use API recommendations if available, otherwise fallback to default recommendations
  const getRecommendations = () => {
    if (recommendations && recommendations.length > 0) {
      return recommendations;
    }
    
    // Fallback recommendations
    if (level === 'High' || level === 'Very High' || level === 'Extreme') {
      return [
        'Evacuate if authorities advise',
        'Create a defensible space around your property',
        'Keep emergency supplies readily accessible',
        'Stay informed with local alerts and news'
      ];
    } else if (level === 'Moderate') {
      return [
        'Prepare an evacuation plan',
        'Clear debris from gutters and roof',
        'Move flammable materials away from structures',
        'Monitor conditions regularly'
      ];
    } else {
      return [
        'Review your emergency plan',
        'Stay informed of changing conditions',
        'Maintain awareness of local fire restrictions',
        'Keep emergency contacts updated'
      ];
    }
  };

  return (
    <motion.div 
      className={`risk-level-card risk-${level.toLowerCase()}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="risk-header">
        <h3 className="risk-title">Wildfire Risk Assessment</h3>
        <div className="risk-badge" style={{ backgroundColor: getRiskColor() }}>
          {level} Risk
        </div>
      </div>
      
      <div className="risk-percentage">
        <div className="percentage-ring" style={{ 
          background: `conic-gradient(
            ${getRiskColor()} ${percentage}%, 
            #e0e0e0 ${percentage}%
          )` 
        }}>
          <div className="percentage-inner">
            <span className="percentage-number">{percentage}%</span>
            <span className="percentage-label">Risk</span>
          </div>
        </div>
      </div>
      
      {Object.keys(factorContributions).length > 0 && (
        <div className="risk-factors">
          <h4 className="factors-title">Risk Factor Contributions:</h4>
          <div className="factor-bars">
            {Object.entries(factorContributions).map(([factor, contribution]) => (
              <div key={factor} className="factor-bar-container">
                <div className="factor-name">
                  {factor.replace('_', ' ').replace(/^\w/, c => c.toUpperCase())}
                </div>
                <div className="factor-bar-wrapper">
                  <div 
                    className="factor-bar" 
                    style={{ 
                      width: `${contribution}%`,
                      backgroundColor: getRiskColor()
                    }}
                  ></div>
                </div>
                <div className="factor-value">{contribution}%</div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="risk-recommendations">
        <h4 className="recommendations-title">Recommended Actions:</h4>
        <ul className="recommendations-list">
          {getRecommendations().map((recommendation, index) => (
            <li key={index} className="recommendation-item">
              {recommendation}
            </li>
          ))}
        </ul>
      </div>
      
      <div className="risk-footer">
        <button className="share-button">
          Share This Assessment
        </button>
        <p className="risk-disclaimer">
          Based on current conditions. Monitor local authorities for official guidance.
          {modelInfo.source && (
            <span className="model-source">
              {' '}Prediction by: {modelInfo.source === 'cnn_model' ? 'AI model' : 'Estimation algorithm'}
            </span>
          )}
        </p>
      </div>
    </motion.div>
  );
}

RiskLevelCard.propTypes = {
  riskResult: PropTypes.shape({
    percentage: PropTypes.number.isRequired,
    level: PropTypes.string.isRequired,
    recommendations: PropTypes.arrayOf(PropTypes.string),
    factorContributions: PropTypes.object,
    factors: PropTypes.object,
    modelInfo: PropTypes.object,
    confidence: PropTypes.number
  }),
};