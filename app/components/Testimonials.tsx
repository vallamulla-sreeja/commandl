import Image from 'next/image';

const testimonials = [
  {
    name: "Sarah Chen",
    role: "CS Major",
    image: "/images/Sarah_Chen.png",
    type: 'image',
    quote: "CommandL completely changed how I learn to code. I love that I don’t have to juggle multiple tutorial videos and an IDE, it’s all right here in one place. The built-in tutorials and tasks on the sidebar keep me focused, and the rewards push me to keep going. It really feels like having a mentor guide me step-by-step.",
  },
  {
    name: "Marcus Rodriguez",
    role: "Electronics Major",
    image: "/images/Marcus_Rodriguez.png",
    type: 'image',
    quote: "I used to struggle finding the right resources when I wanted to learn coding alongside my electronics projects. With CommandL, everything is organized in one spot, and the real-time feedback is super helpful. The tasks, tutorials, and rewards keep me motivated and I can actually see my progress after each milestone!",
  },
  {
    name: "Emily Thompson",
    role: "Computer Science Major",
    image: "/images/Emily_Thompson.png",
    type: 'image',
    quote: "What I love most about CommandL is how intuitive it is. The tutorials pop up right when I need them, and I get instant feedback on my code. Having the tasks laid out in the sidebar makes it a breeze to stay on track instead of juggling a bunch of different resources. It’s like having everything you need to learn programming right at your fingertips!",
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
                    {testimonial.type === 'image' && testimonial.image && (
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
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
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}