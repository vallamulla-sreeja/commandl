import { Metadata } from 'next';
import Image from 'next/image';
import Navbar from '@/app/components/Navbar';

export const metadata: Metadata = {
  title: 'About | CommandL',
  description: 'Learn about CommandL and our mission to revolutionize programming education',
};

const team = [
  {
    name: "Sai Masetty",
    image: "/images/sai_v.jpg",
    title: "CEO",
    description: "Built successful health-tech apps. Loves making tech accessible to everyone."
  },
  {
    name: "Sreeja Vallamulla",
    image: "/images/sreeja_2.jpg",
    title: "CTO",
    description: "Expert developer who turned complex code into simple learning experiences."
  },
  {
    name: "Bob Karr",
    image: "/images/bob.jpeg",
    title: "CSO",
    description: "25+ years helping startups grow. Knows what students need to succeed."
  },
  {
    name: "Kunal Kushwaha",
    image: "/images/kunal.jpeg",
    title: "Advisory Board",
    description: "CTO at Civo. Taught coding to 700k+ students worldwide."
  }
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        <div className="container mx-auto px-6 pt-24 pb-12 max-w-6xl">
                    {/* Hero Section */}
          <section className="mb-32 flex flex-col items-center text-center">
            {/* Main Title */}
            <div className="mb-16">
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-4">
                About CommandL
              </h1>
              <div className="w-16 h-0.5 bg-[#58cc02] mx-auto"></div>
            </div>
            
            {/* Mission Statement */}
            <div className="max-w-4xl mx-auto mb-20">
              <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-8">What We Do</h2>
                <div className="space-y-6">
                  <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
                    CommandL is an AI IDE, designed for people who are learning to write code.
                  </p>
                  <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                    Our mission is to make programming education accessible, engaging, and impactful for learners of all backgrounds.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Vision Statement */}
            <div className="max-w-4xl mx-auto">
              <div className="text-center border-t border-gray-200 pt-16">
                <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-8">Our Vision</h2>
                <div className="space-y-6">
                  <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
                    CommandL reflects our goal by bridging the gap between theoretical knowledge and practical, real-world coding experience.
                  </p>
                  <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                    Through innovative research and continuous exploration, we strive to empower the next generation of software creators with the tools and knowledge they need to succeed.
                  </p>
                </div>
              </div>
            </div>

          </section>

          {/* Team Section */}
          <section className="mb-24 border-t border-gray-200 pt-20">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-6">Meet Our Team</h2>
              <div className="w-16 h-0.5 bg-[#58cc02] mx-auto mb-6"></div>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                The passionate people building the future of coding education
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 max-w-6xl mx-auto">
              {team.map((member, index) => (
                <div 
                  key={index} 
                  className="text-center"
                >
                  <div className="flex flex-col items-center">
                    {/* Profile Image */}
                    <div className="w-24 h-24 relative mb-6">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="rounded-full object-cover shadow-md"
                      />
                    </div>

                    {/* Name */}
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {member.name}
                    </h3>
                    
                    {/* Role */}
                    <div className="inline-block bg-[#58cc02] text-white px-3 py-1 rounded-md text-base font-medium mb-4">
                      {member.title}
                    </div>
                    
                    {/* Description */}
                    <p className="text-base text-gray-600 leading-relaxed">
                      {member.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* What Makes Us Different */}
          <section className="mb-24 border-t border-gray-200 pt-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
              <div className="text-center">
                <div className="w-12 h-12 bg-[#58cc02] rounded-lg flex items-center justify-center mb-6 mx-auto">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Smart AI Help</h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Get instant coding help that actually teaches you. No more copying and pasting without understanding.
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-[#1cb0f6] rounded-lg flex items-center justify-center mb-6 mx-auto">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Real Projects</h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Build apps people actually use, not toy examples. Portfolio-worthy projects from day one.
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center mb-6 mx-auto">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Learn Together</h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Code with friends and get help when you&apos;re stuck. Learning is better when you&apos;re not alone.
                </p>
              </div>
            </div>
          </section>

          {/* Call to Action Section */}
          <section className="text-center border-t border-gray-200 pt-20">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-6">
                Ready to Get Started?
              </h3>
              <p className="text-base md:text-lg text-gray-600 mb-8 leading-relaxed">
                Join thousands of students already creating amazing apps with AI help
              </p>
              
              <div className="space-y-4">
                <button className="bg-[#58cc02] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#4CAF02] transition-colors">
                  Start Coding Now
                </button>
                <p className="text-gray-500 text-sm">
                  Free to get started • No credit card required
                </p>
              </div>
            </div>
          </section>
        </div>


      </main>
    </>
  );
} 