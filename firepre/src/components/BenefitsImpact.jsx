import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function BenefitsImpact() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const benefits = [
    {
      id: 1,
      title: 'Early Warnings Save Lives',
      description: 'Timely alerts allow communities to evacuate before conditions become life-threatening.',
      icon: '⏰',
    },
    {
      id: 2,
      title: 'Supports Emergency Planning',
      description: 'Helps fire departments and emergency services allocate resources more effectively.',
      icon: '🚒',
    },
    {
      id: 3,
      title: 'Data-Backed Decisions',
      description: 'Forest departments can implement preventive measures based on scientific predictions.',
      icon: '📊',
    },
    {
      id: 4,
      title: 'Informed Citizen Awareness',
      description: 'Homeowners can take precautions and prepare emergency plans based on risk levels.',
      icon: '🏡',
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
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="benefits-impact section" id="benefits">
      <div className="container">
        <div className="section-header text-center">
          <h2 className="section-title">Benefits & Impact</h2>
          <p className="section-subtitle">
            Our AI-powered prediction system makes a real difference in wildfire management
          </p>
        </div>

        <motion.div
          ref={ref}
          className="benefits-grid"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {benefits.map((benefit) => (
            <motion.div
              key={benefit.id}
              className="benefit-card"
              variants={itemVariants}
              whileHover={{ 
                y: -10, 
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
                transition: { duration: 0.3 }
              }}
            >
              <div className="benefit-icon">{benefit.icon}</div>
              <h3 className="benefit-title">{benefit.title}</h3>
              <p className="benefit-description">{benefit.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <div className="impact-stats">
          <div className="stat-container">
            <div className="stat-value" data-value="85">85%</div>
            <div className="stat-label">Prediction Accuracy</div>
          </div>
          <div className="stat-container">
            <div className="stat-value" data-value="25">25+</div>
            <div className="stat-label">Communities Protected</div>
          </div>
          <div className="stat-container">
            <div className="stat-value" data-value="30">30min</div>
            <div className="stat-label">Earlier Warnings</div>
          </div>
          <div className="stat-container">
            <div className="stat-value" data-value="1000">1000+</div>
            <div className="stat-label">Daily Users</div>
          </div>
        </div>
      </div>
    </section>
  );
}
