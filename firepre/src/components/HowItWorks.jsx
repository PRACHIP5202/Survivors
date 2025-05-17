import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function HowItWorks() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const steps = [
    {
      id: 1,
      title: 'Collect Data',
      description: 'Gather satellite imagery, weather conditions, and vegetation data from multiple reliable sources.',
      icon: '📡',
    },
    {
      id: 2,
      title: 'Process via AI Model',
      description: 'Our advanced machine learning algorithms analyze patterns and identify risk factors.',
      icon: '🧠',
    },
    {
      id: 3,
      title: 'Predict Risk Zones',
      description: 'Generate accurate risk assessments and color-coded maps for specific geographic areas.',
      icon: '🔍',
    },
    {
      id: 4,
      title: 'Alert & Recommend',
      description: 'Notify citizens and authorities with actionable information to prevent and prepare.',
      icon: '🚨',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="how-it-works section" id="how-it-works">
      <div className="container">
        <div className="section-header text-center">
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle">
            Our AI-powered system processes complex data to deliver accurate wildfire risk predictions
          </p>
        </div>

        <motion.div
          ref={ref}
          className="steps-container"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {steps.map((step) => (
            <motion.div
              key={step.id}
              className="step-card"
              variants={itemVariants}
            >
              <div className="step-icon">{step.icon}</div>
              <div className="step-number">{step.id}</div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-description">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
