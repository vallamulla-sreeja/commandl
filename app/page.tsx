import { Metadata } from 'next';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import FeatureCards from './components/FeatureCards';

export const metadata: Metadata = {
  title: 'CommandL - Learn Programming the Smart Way',
  description: 'Start your programming journey with CommandL. Our AI-powered code editor makes learning to code fun and effective.',
  openGraph: {
    title: 'CommandL - Learn Programming the Smart Way',
    description: 'Start your programming journey with CommandL. Our AI-powered code editor makes learning to code fun and effective.',
  }
};

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <FeatureCards />
      </main>
    </>
  );
}
