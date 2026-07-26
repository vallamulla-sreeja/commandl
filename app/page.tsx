import { Metadata } from 'next';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PricingSection from './components/PricingSection';
import FeatureCards from './components/FeatureCards';
import Testimonials from './components/Testimonials';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';

export const metadata: Metadata = {
  title: 'CommandL - Best Code Editor for Students | Learn Programming with AI',
  description: 'CommandL (Command L) is the best code editor for students learning to code. Our AI-powered IDE makes programming education fun, interactive, and effective with built-in tutorials and real-time assistance.',
  openGraph: {
    title: 'CommandL - Best Code Editor for Students | Learn Programming with AI',
    description: 'CommandL (Command L) is the best code editor for students learning to code. Our AI-powered IDE makes programming education fun, interactive, and effective with built-in tutorials and real-time assistance.',
  }
};

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pt-[72px]">
        <Hero />
        <FeatureCards />
        <PricingSection />
        <Testimonials />
        <CallToAction />
      </main>
      <Footer />
    </>
  );
}
