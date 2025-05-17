import { motion } from 'framer-motion';

export default function EvacuationSteps() {
  const steps = [
    {
      id: 1,
      title: 'Prepare Emergency Kit',
      description: 'Pack essential items including medications, important documents, phone chargers, and water.',
      icon: '🎒',
    },
    {
      id: 2,
      title: 'Establish Communication Plan',
      description: 'Set a meeting point and ensure everyone knows emergency contacts.',
      icon: '📱',
    },
    {
      id: 3,
      title: 'Plan Multiple Evacuation Routes',
      description: 'Identify at least two ways out of your neighborhood in different directions.',
      icon: '🗺️',
    },
    {
      id: 4,
      title: 'Secure Your Home',
      description: 'Close all windows, move flammable furniture away from windows, and shut off gas.',
      icon: '🏡',
    },
    {
      id: 5,
      title: 'Stay Informed',
      description: 'Monitor local news, emergency broadcasts, and official social media channels.',
      icon: '📢',
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
    <motion.div 
      className="evacuation-steps"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <h3 className="evacuation-title">Emergency Evacuation Steps</h3>
      <p className="evacuation-description">
        If wildfire risk is high in your area, follow these steps to evacuate safely
      </p>
      
      <div className="steps-list">
        {steps.map((step) => (
          <motion.div 
            key={step.id} 
            className="evacuation-step"
            variants={itemVariants}
          >
            <div className="step-number">{step.id}</div>
            <div className="step-icon">{step.icon}</div>
            <div className="step-content">
              <h4 className="step-title">{step.title}</h4>
              <p className="step-description">{step.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="evacuation-footer">
        <button className="evacuation-button">
          Download Evacuation Checklist
        </button>
        <p className="evacuation-note">
          Always follow instructions from local authorities and emergency services.
        </p>
      </div>
    </motion.div>
  );
}