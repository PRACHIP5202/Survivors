import { useState } from 'react';
import ResourcesInsights from '../components/ResourcesInsights';

export default function ResourcesPage() {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Resources' },
    { id: 'articles', name: 'Articles' },
    { id: 'case-studies', name: 'Case Studies' },
    { id: 'docs', name: 'Documentation' },
    { id: 'research', name: 'Research Papers' },
  ];

  const resources = [
    {
      id: 1,
      title: 'How AI is Changing Wildfire Management',
      description: 'Explore the revolutionary impact of AI on preventing and fighting wildfires.',
      type: 'Article',
      category: 'articles',
      image: '🔥',
      date: 'May 10, 2025',
      link: '/resources/ai-wildfire-management',
    },
    {
      id: 2,
      title: 'California 2024: A Case Study',
      description: 'Analysis of how early prediction helped reduce wildfire impact in California.',
      type: 'Case Study',
      category: 'case-studies',
      image: '📊',
      date: 'April 15, 2025',
      link: '/resources/california-case-study',
    },
    {
      id: 3,
      title: 'Researcher API Documentation',
      description: 'Access our prediction data for academic research and public safety initiatives.',
      type: 'API Docs',
      category: 'docs',
      image: '📚',
      date: 'March 22, 2025',
      link: '/resources/api-documentation',
    },
    {
      id: 4,
      title: 'Machine Learning for Environmental Protection',
      description: 'A deep dive into how ML algorithms are trained to recognize fire risk patterns.',
      type: 'Research Paper',
      category: 'research',
      image: '🧪',
      date: 'February 18, 2025',
      link: '/resources/ml-environmental-protection',
    },
    {
      id: 5,
      title: 'Creating Defensible Space Around Your Home',
      description: 'Practical tips for homeowners to reduce wildfire risk on their property.',
      type: 'Guide',
      category: 'articles',
      image: '🏡',
      date: 'January 30, 2025',
      link: '/resources/defensible-space-guide',
    },
    {
      id: 6,
      title: 'Oregon Fire Prevention Success Story',
      description: 'How technology-aided early interventions prevented major forest fires in Oregon.',
      type: 'Case Study',
      category: 'case-studies',
      image: '🌲',
      date: 'January 5, 2025',
      link: '/resources/oregon-prevention-story',
    },
  ];

  const filteredResources = activeCategory === 'all' 
    ? resources 
    : resources.filter(resource => resource.category === activeCategory);

  return (
    <div className="resources-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Resources & Insights</h1>
          <p className="page-description">
            Explore our knowledge base to better understand wildfire prevention and management
          </p>
        </div>
        
        <div className="category-filter">
          <div className="filter-tabs">
            {categories.map(category => (
              <button 
                key={category.id}
                className={`filter-tab ${activeCategory === category.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
        
        <div className="resources-grid extended">
          {filteredResources.map(resource => (
            <div key={resource.id} className="resource-card">
              <div className="resource-image">{resource.image}</div>
              <div className="resource-meta">
                <div className="resource-type">{resource.type}</div>
                <div className="resource-date">{resource.date}</div>
              </div>
              <h3 className="resource-title">{resource.title}</h3>
              <p className="resource-description">{resource.description}</p>
              <a href={resource.link} className="resource-link">
                Read More →
              </a>
            </div>
          ))}
        </div>
        
        <div className="newsletter-signup">
          <h2>Stay Updated</h2>
          <p>Subscribe to our newsletter to receive the latest research, case studies, and wildfire prevention tips.</p>
          <form className="newsletter-form">
            <input type="email" placeholder="Enter your email" required />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>
    </div>
  );
}
