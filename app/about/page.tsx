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
    description: "5+ yrs of experience, created a recognized health-tech app"
  },
  {
    name: "Sreeja Vallamulla",
    image: "/images/sreeja_2.jpg",
    title: "CTO",
    description: "Masters in Computer Science, Software developer with 3+ years of experience"
  },
  {
    name: "Bob Karr",
    image: "/images/bob.jpeg",
    title: "CSO",
    description: "25+ yrs entrepreneur, knows how to scale early ventures"
  },
  {
    name: "Kunal Kushwaha",
    image: "/images/kunal.jpeg",
    title: "Advisory Board",
    description: "CTO of Civo, recognized figure in software dev education with 700k+ community"
  }
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        <div className="container mx-auto px-6 pt-24 pb-12 max-w-7xl">
          <section className="mb-12 flex flex-col items-center text-center">
            <h1 className="text-4xl font-bold text-[#58cc02] mb-4">About</h1>
            <p className="text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
            CommandL is an AI IDE, designed for people who are learning to write code. Think about it like Cursor meets Duolingo. Our mission is to make programming education accessible, engaging, and impactful for learners of all backgrounds. By merging real-time coding with fun, project-based tasks, we empower everyone to build practical skills and confidently shape the future of technology.</p>
          </section>

          <section className="text-center">
            <h2 className="text-4xl font-bold text-[#58cc02] mb-12">Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              {team.map((member, index) => (
                <div key={index} className="flex flex-col items-center text-center">
                  <div className="w-48 h-48 relative mb-6">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="rounded-full object-cover shadow-lg"
                    />
                  </div>
                  <h2 className="text-2xl text-gray-700 font-semibold mb-2">{member.name}</h2>
                  <h3 className="text-lg font-extrabold text-[#1cb0f6] mb-4">{member.title}</h3>
                  <p className="text-gray-600 text-lg leading-relaxed max-w-xs">{member.description}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
} 