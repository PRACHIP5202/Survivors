import Hero from '../components/Hero';
import HowItWorks from '../components/HowItWorks';
import BenefitsImpact from '../components/BenefitsImpact';
import ResourcesInsights from '../components/ResourcesInsights';
import ContactFeedback from '../components/ContactFeedback';

export default function HomePage() {
  return (
    <div className="home-page">
      <Hero />
      <HowItWorks />
      <BenefitsImpact />
      <ResourcesInsights />
      <ContactFeedback />
    </div>
  );
}
