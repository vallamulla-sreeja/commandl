import { Metadata } from 'next';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeatureCards from './components/FeatureCards';
import Testimonials from './components/Testimonials';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';

export const metadata: Metadata = {
  title: 'CommandL - Ship Your First Real App in Weeks | AI-Powered IDE',
  description: 'CommandL is a project-based AI IDE with gamified feedback loops. Learn programming by building real products, not toy examples. Start shipping apps in weeks, not months.',
  keywords: 'AI IDE, code editor, programming education, project-based learning, gamified coding',
  openGraph: {
    title: 'CommandL - Ship Your First Real App in Weeks',
    description: 'Project-based AI IDE with gamified feedback loops. Learn by building real products.',
    type: 'website',
    url: 'https://commandl.dev',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CommandL - Ship Your First Real App in Weeks',
    description: 'Project-based AI IDE with gamified feedback loops. Learn by building real products.',
  }
};

export default function Home() {
  return (
    <>
      <Navbar />
      <main role="main" className="pt-[72px]">
        <Hero />
        <FeatureCards />
        <Testimonials />
        <CallToAction />
      </main>
      <Footer />
    </>
  );
}
