"use client"

import Image from 'next/image';
import { FaGraduationCap } from 'react-icons/fa';
import { useInfiniteScroll } from './useInfiniteScroll';

const testimonials = [
  {
    name: "Sarah Chen",
    role: "CS Major",
    image: "/images/Sarah_Chen.png",
    type: "image" as const,
    quote: "CommandL changed how I learn code. Everything is in one place and the rewards keep me going."
  },
  {
    name: "Marcus Rodriguez",
    role: "Electronics Major",
    image: "/images/Marcus_Rodriguez.png",
    type: "image" as const,
    quote: "Having everything in a single spot makes it so much easier. The real-time feedback really helps me see my progress."
  },
  {
    name: "Emily Thompson",
    role: "Computer Science Major",
    image: "/images/Emily_Thompson.png",
    type: "image" as const,
    quote: "It's intuitive and the AI feedback is instant. I can focus on coding instead of juggling different resources."
  },
  {
    name: "Alex Rivera",
    role: "Software Engineering Student",
    image: "/images/alex-rivera.png",
    type: "image" as const,
    quote: "I was unsure at first but it's been a big help. Complex topics are broken down and I get feedback right away."
  },
  {
    name: "James Wilson",
    role: "Data Science Enthusiast",
    image: "/images/Marcus_Rodriguez.png",
    type: "image" as const,
    quote: "I tried random tutorials for months but nothing stuck until CommandL. It feels like having a personal coding buddy."
  },
  {
    name: "Lisa Chang",
    role: "Web Development Student",
    image: "/images/Lisa_Chang.png",
    type: "image" as const,
    quote: "I started coding last month and I'm already building real projects. The structured path helps me truly understand what I'm doing."
  },
  {
    name: "David Park",
    role: "Game Development Enthusiast",
    image: "/images/David_Park.png",
    type: "image" as const,
    quote: "I was stuck in tutorial loops but in two weeks I made my first game. Their explanations are clear and easy to follow."
  },
  {
    name: "Nina Patel",
    role: "AI/ML Student",
    image: "/images/Nina_Patel.png",
    type: "image" as const,
    quote: "I needed help with both basic coding and advanced AI topics and CommandL nails it. The interactive exercises keep me engaged."
  }
];


export default function Testimonials() {
  const { displayItems, translateX } = useInfiniteScroll({
    items: testimonials,
    speed: 0.5,      // adjust speed as desired
    itemWidth: 416,  // MUST match your actual card+margin width
  });

  return (
    <section className="py-16 px-4">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold mb-4 text-[#58cc02]">
            Hear From Our Users
          </h2>
          <p className="text-xl text-gray-600">
            Join thousands of satisfied learners who&apos;ve built projects and learned to code
          </p>
        </div>

        {/* Outer container must have overflow hidden */}
        <div className="relative overflow-hidden">
          {/* Optional gradient masks */}
          <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white to-transparent z-10"></div>
          <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white to-transparent z-10"></div>
          
          {/* Inner "track" that we move using translateX */}
          <div
            className="flex items-center transition-transform duration-[0ms]"
            style={{ transform: `translateX(${translateX}px)` }}
          >
            {displayItems.map((t, idx) => (
              <div
                key={`${t.name}-${idx}`}
                className="flex-none w-[400px] mr-4 bg-white p-8 rounded-xl border border-gray-100
                         hover:shadow-lg transition-shadow duration-300"
              >
                <CardContent testimonial={t} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// A small helper component to keep things DRY
interface Testimonial {
  name: string;
  role: string;
  image?: string;
  type: 'image' | 'icon';
  quote: string;
}

function CardContent({ testimonial }: { testimonial: Testimonial }) {
  return (
    <>
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 flex items-center justify-center mr-4 bg-gray-50 rounded-full overflow-hidden">
          {testimonial.type === 'image' && testimonial.image ? (
            <Image
              src={testimonial.image}
              alt={testimonial.name}
              width={64}
              height={64}
              className="w-full h-full object-cover"
            />
          ) : (
            <FaGraduationCap className="w-8 h-8 text-[#58cc02]" />
          )}
        </div>
        <div>
          <h3 className="font-semibold text-lg text-gray-900">{testimonial.name}</h3>
          <p className="text-gray-600">{testimonial.role}</p>
        </div>
      </div>
      <blockquote>
        <p className="text-gray-700 italic">{testimonial.quote}</p>
      </blockquote>
    </>
  );
}
