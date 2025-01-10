"use client"

import Image from 'next/image';
import { FaGraduationCap } from 'react-icons/fa';
import { useInfiniteScroll } from './useInfiniteScroll';

const testimonials = [
  {
    name: "Sarah Chen",
    role: "CS Major",
    image: "/images/Sarah_Chen.png",
    type: 'image' as const,
    quote: "CommandL completely changed how I learn to code. I love that I don't have to juggle multiple tutorial videos and an IDE, it's all right here in one place. The built-in tutorials and tasks on the sidebar keep me focused, and the rewards push me to keep going. It really feels like having a mentor guide me step-by-step.",
  },
  {
    name: "Marcus Rodriguez", 
    role: "Electronics Major",
    image: "/images/Marcus_Rodriguez.png",
    type: 'image' as const,
    quote: "I used to struggle finding the right resources when I wanted to learn coding alongside my electronics projects. With CommandL, everything is organized in one spot, and the real-time feedback is super helpful. The tasks, tutorials, and rewards keep me motivated and I can actually see my progress after each milestone!",
  },
  {
    name: "Emily Thompson",
    role: "Computer Science Major", 
    image: "/images/Emily_Thompson.png",
    type: 'image' as const,
    quote: "What I love most about CommandL is how intuitive it is. The tutorials pop up right when I need them, and I get instant feedback on my code. Having the tasks laid out in the sidebar makes it a breeze to stay on track instead of juggling a bunch of different resources. It's like having everything you need to learn programming right at your fingertips!",
  },
  {
    name: "Alex Rivera",
    role: "Software Engineering Student",
    image: "/images/alex-rivera.png", 
    type: 'image' as const,
    quote: "Honestly, I was skeptical at first, but wow - CommandL is a game-changer! No more jumping between YouTube tutorials and Stack Overflow. The way it breaks down complex topics into bite-sized pieces is exactly what I needed. Plus, the instant feedback when I'm coding? That's pure gold! 🚀",
  },
  {
    name: "James Wilson",
    role: "Data Science Enthusiast",
    image: "/images/Marcus_Rodriguez.png",
    type: 'image' as const,
    quote: "Been trying to learn Python for months using random tutorials, but nothing really stuck until CommandL. The step-by-step guidance is perfect for beginners like me. Love how it feels like having a personal coding buddy who's always there to help when I get stuck!",
  },
  {
    name: "Lisa Chang",
    role: "Web Development Student",
    type: 'icon' as const,
    quote: "Started my coding journey last month and I'm already building real projects! The way CommandL structures the learning path is brilliant - you actually remember what you learn. No more copy-pasting code without understanding. Finally found my groove with coding! 💻",
  },
  {
    name: "David Park",
    role: "Game Development Enthusiast",
    type: 'icon' as const,
    quote: "Hey future coders! If you're stuck in tutorial hell like I was, try CommandL! Been using it for 2 months and already made my first game. The way they explain complex stuff is just *chef's kiss*. Plus, the community here is super supportive! 🎮",
  },
  {
    name: "Nina Patel",
    role: "AI/ML Student",
    image: "/images/Sarah_Chen.png",
    type: 'image' as const,
    quote: "Finally found the perfect learning platform! As someone diving into AI/ML, I needed something that could handle both basic programming and advanced concepts. CommandL nails it with the perfect balance. The interactive exercises are a total game-changer!",
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
            className="flex items-center"
            style={{ transform: `translateX(${translateX}px)` }}
          >
            {displayItems.map((t, idx) => (
              <div
                key={idx}
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
        <p className="text-gray-700 italic">&ldquo;{testimonial.quote}&rdquo;</p>
      </blockquote>
    </>
  );
}
