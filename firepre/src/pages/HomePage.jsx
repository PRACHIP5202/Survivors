import Hero from '../components/Hero';
import RiskExplorer from '../components/RiskExplorer';
import HowItWorks from '../components/HowItWorks';
import BenefitsImpact from '../components/BenefitsImpact';
import ResourcesInsights from '../components/ResourcesInsights';
import ContactFeedback from '../components/ContactFeedback';

export default function HomePage() {
  return (
    <div className="home-page">
      <Hero />
      <RiskExplorer />
      <HowItWorks />
      <BenefitsImpact />
      <ResourcesInsights />
      <ContactFeedback />
    </div>
  );
}
