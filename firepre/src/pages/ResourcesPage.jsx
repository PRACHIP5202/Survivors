import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function ResourcesPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');

  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.3 });
  const [filterRef, filterInView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [resourcesRef, resourcesInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [newsletterRef, newsletterInView] = useInView({ triggerOnce: true, threshold: 0.3 });

  const categories = [
    { id: 'all', name: 'All Resources', icon: '📚', count: 6 },
    { id: 'articles', name: 'Articles', icon: '📰', count: 2 },
    { id: 'case-studies', name: 'Case Studies', icon: '📊', count: 2 },
    { id: 'docs', name: 'Documentation', icon: '📋', count: 1 },
    { id: 'research', name: 'Research Papers', icon: '🧪', count: 1 },
  ];

  const resources = [
    {
      id: 1,
      title: 'How AI is Changing Wildfire Management',
      description: 'Explore the revolutionary impact of artificial intelligence on preventing and fighting wildfires through advanced prediction models.',
      type: 'Article',
      category: 'articles',
      image: '🔥',
      date: 'May 10, 2025',
      readTime: '8 min read',
      difficulty: 'Beginner',
      tags: ['AI', 'Technology', 'Prevention'],
      featured: true,
      link: '/resources/ai-wildfire-management',
    },
    {
      id: 2,
      title: 'California 2024: A Case Study',
      description: 'Comprehensive analysis of how early prediction systems helped reduce wildfire impact across California during the 2024 fire season.',
      type: 'Case Study',
      category: 'case-studies',
      image: '📊',
      date: 'April 15, 2025',
      readTime: '12 min read',
      difficulty: 'Intermediate',
      tags: ['California', 'Success Story', 'Data Analysis'],
      featured: true,
      link: '/resources/california-case-study',
    },
    {
      id: 3,
      title: 'Researcher API Documentation',
      description: 'Complete technical documentation for accessing our prediction data for academic research and public safety initiatives.',
      type: 'API Docs',
      category: 'docs',
      image: '📚',
      date: 'March 22, 2025',
      readTime: '15 min read',
      difficulty: 'Advanced',
      tags: ['API', 'Documentation', 'Technical'],
      featured: false,
      link: '/resources/api-documentation',
    },
    {
      id: 4,
      title: 'Machine Learning for Environmental Protection',
      description: 'A comprehensive deep dive into how ML algorithms are trained to recognize fire risk patterns and environmental indicators.',
      type: 'Research Paper',
      category: 'research',
      image: '🧪',
      date: 'February 18, 2025',
      readTime: '25 min read',
      difficulty: 'Advanced',
      tags: ['Machine Learning', 'Research', 'Environment'],
      featured: false,
      link: '/resources/ml-environmental-protection',
    },
    {
      id: 5,
      title: 'Creating Defensible Space Around Your Home',
      description: 'Practical, actionable tips for homeowners to reduce wildfire risk on their property through strategic landscaping and planning.',
      type: 'Guide',
      category: 'articles',
      image: '🏡',
      date: 'January 30, 2025',
      readTime: '10 min read',
      difficulty: 'Beginner',
      tags: ['Home Safety', 'Prevention', 'Guide'],
      featured: false,
      link: '/resources/defensible-space-guide',
    },
    {
      id: 6,
      title: 'Oregon Fire Prevention Success Story',
      description: 'How technology-aided early interventions and community collaboration prevented major forest fires in Oregon.',
      type: 'Case Study',
      category: 'case-studies',
      image: '🌲',
      date: 'January 5, 2025',
      readTime: '9 min read',
      difficulty: 'Intermediate',
      tags: ['Oregon', 'Community', 'Prevention'],
      featured: false,
      link: '/resources/oregon-prevention-story',
    },
  ];

  // Filter and sort resources
  const filteredResources = resources
    .filter(resource => 
      (activeCategory === 'all' || resource.category === activeCategory) &&
      (searchTerm === '' || 
        resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    )
    .sort((a, b) => {
      if (sortBy === 'date') return new Date(b.date) - new Date(a.date);
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      if (sortBy === 'difficulty') {
        const difficultyOrder = { 'Beginner': 0, 'Intermediate': 1, 'Advanced': 2 };
        return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
      }
      return 0;
    });

  const featuredResources = resources.filter(resource => resource.featured);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return '#10b981';
      case 'Intermediate': return '#f59e0b';
      case 'Advanced': return '#ef4444';
      default: return '#6b7280';
    }
  };

  return (
    <div className="resources-page">
      {/* Hero Section */}
      <motion.section 
        ref={heroRef}
        className="resources-hero"
        initial={{ opacity: 0, y: 30 }}
        animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">Resources & Insights</h1>
            <p className="hero-description">
              Explore our comprehensive knowledge base to better understand wildfire prevention, 
              management strategies, and the latest research in fire safety technology.
            </p>
            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-number">{resources.length}</span>
                <span className="stat-label">Resources</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{featuredResources.length}</span>
                <span className="stat-label">Featured</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">4</span>
                <span className="stat-label">Categories</span>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Search and Filter Section */}
      <motion.section 
        ref={filterRef}
        className="filter-section"
        initial={{ opacity: 0 }}
        animate={filterInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container">
          <div className="search-controls">
            <div className="search-bar">
              <div className="search-input-wrapper">
                <span className="search-icon">🔍</span>
                <input
                  type="text"
                  placeholder="Search resources, topics, or tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
              </div>
            </div>
            <div className="sort-controls">
              <label htmlFor="sortBy">Sort by:</label>
              <select 
                id="sortBy"
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-select"
              >
                <option value="date">Latest</option>
                <option value="title">Title A-Z</option>
                <option value="difficulty">Difficulty</option>
              </select>
            </div>
          </div>
          
          <div className="category-filter">
            {categories.map(category => (
              <button 
                key={category.id}
                className={`filter-tab ${activeCategory === category.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(category.id)}
              >
                <span className="tab-icon">{category.icon}</span>
                <span className="tab-name">{category.name}</span>
                <span className="tab-count">{category.count}</span>
              </button>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Resources Grid Section */}
      <motion.section 
        ref={resourcesRef}
        className="resources-section"
        initial={{ opacity: 0 }}
        animate={resourcesInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container">
          {filteredResources.length === 0 ? (
            <div className="no-results">
              <div className="no-results-icon">📭</div>
              <h3>No resources found</h3>
              <p>Try adjusting your search terms or category filters.</p>
            </div>
          ) : (
            <div className="resources-grid">
              {filteredResources.map((resource, index) => (
                <motion.div 
                  key={resource.id} 
                  className={`resource-card ${resource.featured ? 'featured' : ''}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  {resource.featured && <div className="featured-badge">⭐ Featured</div>}
                  <div className="resource-image">
                    <span className="resource-emoji">{resource.image}</span>
                  </div>
                  <div className="resource-content">
                    <div className="resource-meta">
                      <span className="resource-type">{resource.type}</span>
                      <span 
                        className="difficulty-badge"
                        style={{ backgroundColor: getDifficultyColor(resource.difficulty) }}
                      >
                        {resource.difficulty}
                      </span>
                    </div>
                    <h3 className="resource-title">{resource.title}</h3>
                    <p className="resource-description">{resource.description}</p>
                    <div className="resource-details">
                      <span className="read-time">📖 {resource.readTime}</span>
                      <span className="resource-date">📅 {resource.date}</span>
                    </div>
                    <div className="resource-tags">
                      {resource.tags.map(tag => (
                        <span key={tag} className="resource-tag">{tag}</span>
                      ))}
                    </div>
                    <a href={resource.link} className="resource-link">
                      Read More <span className="link-arrow">→</span>
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </motion.section>

      {/* Newsletter Section */}
      <motion.section 
        ref={newsletterRef}
        className="newsletter-section"
        initial={{ opacity: 0, y: 30 }}
        animate={newsletterInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container">
          <div className="newsletter-content">
            <div className="newsletter-info">
              <h2 className="newsletter-title">Stay Updated</h2>
              <p className="newsletter-description">
                Subscribe to our newsletter to receive the latest research, case studies, 
                and wildfire prevention tips directly in your inbox.
              </p>
              <div className="newsletter-benefits">
                <div className="benefit-item">
                  <span className="benefit-icon">📧</span>
                  <span>Weekly insights</span>
                </div>
                <div className="benefit-item">
                  <span className="benefit-icon">🔔</span>
                  <span>Emergency alerts</span>
                </div>
                <div className="benefit-item">
                  <span className="benefit-icon">📊</span>
                  <span>Research updates</span>
                </div>
              </div>
            </div>
            <form className="newsletter-form">
              <div className="form-group">
                <input 
                  type="email" 
                  placeholder="Enter your email address" 
                  required 
                  className="newsletter-input"
                />
              </div>
              <button type="submit" className="newsletter-button">
                Subscribe Now
              </button>
              <p className="privacy-note">
                🔒 We respect your privacy. Unsubscribe at any time.
              </p>
            </form>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
