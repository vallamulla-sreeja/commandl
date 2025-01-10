import { Metadata } from 'next';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
// import Features from './components/Features';
import FeatureCards from './components/FeatureCards';
import Testimonials from './components/Testimonials';

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
        {/* <Features /> */}
        <FeatureCards />
        <Testimonials />
      </main>
    </>
  );
}
