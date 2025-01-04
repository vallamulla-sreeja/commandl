import { FaUserGraduate } from 'react-icons/fa';
// import { FaUserGraduate, FaUserTie, FaUserAstronaut } from 'react-icons/fa';
// import Image from 'next/image';

const testimonials = [
  {
    name: "Sarah Chen",
    role: "CS Major",
    icon: FaUserGraduate,
    type: 'icon',
    quote: "CommandL transformed my coding journey. The AI-powered guidance helped me grasp complex concepts faster than traditional methods.",
  },
  {
    name: "Marcus Rodriguez",
    role: "Electronics Major",
    icon: FaUserGraduate,
    type: 'icon',
    quote: "As someone transitioning into tech, CommandL provided the perfect balance of challenge and support. I went from complete beginner to writing real code in weeks.",
  },
  {
    name: "Emily Thompson",
    role: "Computer Science Major",
    // image: "/images/testimonials/profile_pic.png",
    icon: FaUserGraduate,
    type: 'icon',
    // type: 'image',
    quote: "The interactive exercises and real-time feedback make learning programming actually fun! It's like having a personal mentor available 24/7.",
  }
];

export default function Testimonials() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold mb-4 text-[#58cc02]">What Our Users Say</h2>
          <p className="text-xl text-gray-600">Join thousands of satisfied learners who&apos;ve transformed their coding journey with CommandL</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => {
            return (
              <div key={index} className="bg-white p-8 rounded-xl border border-gray-100">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 flex items-center justify-center mr-4 bg-gray-50 rounded-full overflow-hidden">
                    {testimonial.type === 'icon' && testimonial.icon && (
                      <testimonial.icon className="w-8 h-8 text-gray-600" />
                    )}
                    {/* {testimonial.type === 'image' && testimonial.image && (
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    )} */}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900">{testimonial.name}</h3>
                    <p className="text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <blockquote>
                  <p className="text-gray-700 italic">&ldquo;{testimonial.quote}&rdquo;</p>
                </blockquote>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
} 