import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';

export default function ResourcesInsights() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const resources = [
    {
      id: 1,
      title: 'How AI is Changing Wildfire Management',
      description: 'Explore the revolutionary impact of AI on preventing and fighting wildfires.',
      type: 'Article',
      image: '🔥',
      link: '/resources/ai-wildfire-management',
    },
    {
      id: 2,
      title: 'California 2024: A Case Study',
      description: 'Analysis of how early prediction helped reduce wildfire impact in California.',
      type: 'Case Study',
      image: '📊',
      link: '/resources/california-case-study',
    },
    {
      id: 3,
      title: 'Researcher API Documentation',
      description: 'Access our prediction data for academic research and public safety initiatives.',
      type: 'API Docs',
      image: '📚',
      link: '/resources/api-documentation',
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
    <section className="resources-insights section" id="resources">
      <div className="container">
        <div className="section-header text-center">
          <h2 className="section-title">Resources & Insights</h2>
          <p className="section-subtitle">
            Explore our knowledge base to better understand wildfire prevention and management
          </p>
        </div>

        <motion.div
          ref={ref}
          className="resources-grid"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {resources.map((resource) => (
            <motion.div
              key={resource.id}
              className="resource-card"
              variants={itemVariants}
            >
              <div className="resource-image">{resource.image}</div>
              <div className="resource-type">{resource.type}</div>
              <h3 className="resource-title">{resource.title}</h3>
              <p className="resource-description">{resource.description}</p>
              <Link to={resource.link} className="resource-link">
                Read More →
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center view-all-resources">
          <Link to="/resources" className="outlined-button">
            View All Resources
          </Link>
        </div>
      </div>
    </section>
  );
}
