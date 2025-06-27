import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-[#58CC02] to-[#4CAF02] text-white relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Main gradient orbs - subtle and well positioned */}
        <div className="absolute top-16 left-16 w-64 h-64 bg-white/4 rounded-full mix-blend-overlay filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-16 right-16 w-56 h-56 bg-white/5 rounded-full mix-blend-overlay filter blur-3xl animate-pulse" style={{ animationDelay: '5s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-white/3 rounded-full mix-blend-overlay filter blur-3xl animate-pulse" style={{ animationDelay: '10s' }}></div>
        
        {/* Minimal floating particles */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-0.5 bg-white/20 rounded-full animate-bounce"
            style={{
              left: `${20 + Math.random() * 60}%`,
              top: `${20 + Math.random() * 60}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${5 + Math.random() * 3}s`
            }}
          />
        ))}
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-3" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
        
        {/* Gentle gradient waves */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-white/3 to-transparent opacity-40"></div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white/2 to-transparent opacity-50"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-1 group">
            <Link href="/" className="flex items-center gap-2 transition-transform duration-300 group-hover:scale-105">
              <div className="transition-transform duration-300 group-hover:rotate-12">
                <Image
                  src="/images/commandl_logo.png"
                  alt="CommandL Icon"
                  width={30}
                  height={30}
                  className="brightness-0 invert"
                />
              </div>
              <div className="transition-transform duration-300 group-hover:scale-110">
                <Image
                  src="/images/logo.png"
                  alt="CommandL Logo"
                  width={150}
                  height={40}
                  className="brightness-0 invert"
                />
              </div>
            </Link>
            {/* <p className="mt-4 text-base text-white font-medium">
              Your code editor redefined with AI superpowers. Built for the next generation of developers.
            </p> */}
            <p className="mt-4 text-lg text-white/90 font-medium transition-all duration-300 group-hover:text-white">
              Made by{' '}
              <a 
                href="https://www.vedaverse.io" 
                target="_blank" 
                rel="noopener noreferrer"
                className="underline hover:text-white transition-colors duration-300 relative group/link"
              >
                VedaVerse
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover/link:w-full"></span>
              </a>
            </p>
          </div>

          {/* Company */}
          <div className="group">
            <h3 className="text-xl text-white tracking-wider uppercase font-[1000] mb-4 relative">
              Company
              <div className="absolute -bottom-1 left-0 w-8 h-0.5 bg-white/50 transition-all duration-500 group-hover:w-full group-hover:bg-white"></div>
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link href="/about" className="text-lg font-semibold text-white/90 hover:text-white transition-all duration-300 hover:translate-x-2 hover:scale-105 inline-block relative group/item">
                  About Us
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white/70 transition-all duration-300 group-hover/item:w-full"></span>
                </Link>
              </li>
              <li>
                <a href="mailto:hi@vedaverse.io" className="text-lg font-semibold text-white/90 hover:text-white transition-all duration-300 hover:translate-x-2 hover:scale-105 inline-block relative group/item">
                  Contact
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white/70 transition-all duration-300 group-hover/item:w-full"></span>
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="group">
            <h3 className="text-xl text-white tracking-wider uppercase font-[1000] mb-4 relative">
              Legal
              <div className="absolute -bottom-1 left-0 w-8 h-0.5 bg-white/50 transition-all duration-500 group-hover:w-full group-hover:bg-white"></div>
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link href="/terms-of-service" className="text-lg font-semibold text-white/90 hover:text-white transition-all duration-300 hover:translate-x-2 hover:scale-105 inline-block relative group/item">
                  Terms of Service
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white/70 transition-all duration-300 group-hover/item:w-full"></span>
                </Link>
              </li>
              <li>
                <Link href="/security" className="text-lg font-semibold text-white/90 hover:text-white transition-all duration-300 hover:translate-x-2 hover:scale-105 inline-block relative group/item">
                  Security
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white/70 transition-all duration-300 group-hover/item:w-full"></span>
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-lg font-semibold text-white/90 hover:text-white transition-all duration-300 hover:translate-x-2 hover:scale-105 inline-block relative group/item">
                  Privacy Policy
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white/70 transition-all duration-300 group-hover/item:w-full"></span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div className="group">
            <h3 className="text-xl text-white tracking-wider uppercase font-[1000] mb-4 relative">
              Connect
              <div className="absolute -bottom-1 left-0 w-8 h-0.5 bg-white/50 transition-all duration-500 group-hover:w-full group-hover:bg-white"></div>
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a 
                  href="https://twitter.com/veda_verse" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-lg font-semibold hover:opacity-80 transition-all duration-300 flex items-center gap-3 group/social hover:translate-x-2"
                >
                  <div className="bg-black/80 p-2 rounded-lg transition-all duration-300 group-hover/social:bg-black group-hover/social:scale-110 group-hover/social:rotate-6">
                    <svg className="h-5 w-5 text-white transition-transform duration-300 group-hover/social:scale-110" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </div>
                  <span className="text-white/90 group-hover/social:text-white transition-colors duration-300">Twitter</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://www.linkedin.com/company/vedaverse-io" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-lg font-semibold hover:opacity-80 transition-all duration-300 flex items-center gap-3 group/social hover:translate-x-2"
                >
                  <div className="transition-all duration-300 group-hover/social:scale-110 group-hover/social:rotate-6">
                    <Image
                      src="/images/linkedin.png"
                      alt="LinkedIn"
                      width={32}
                      height={32}
                      className="rounded-lg transition-all duration-300 group-hover/social:shadow-lg"
                    />
                  </div>
                  <span className="text-white/90 group-hover/social:text-white transition-colors duration-300">LinkedIn</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 border-t border-white/20 pt-8">
          <div className="flex justify-center items-center">
            <p className="text-base text-white/90 font-bold transition-all duration-300 hover:text-white hover:scale-105 cursor-default">
              &copy; {new Date().getFullYear()} commandL. All rights reserved.
            </p>
          </div>
          
          {/* Floating decoration elements */}
          <div className="absolute bottom-4 left-8 w-2 h-2 bg-white/30 rounded-full animate-ping"></div>
          <div className="absolute bottom-8 right-12 w-1.5 h-1.5 bg-white/40 rounded-full animate-pulse"></div>
          <div className="absolute bottom-12 left-1/4 w-1 h-1 bg-white/50 rounded-full animate-bounce"></div>
        </div>
      </div>

      {/* Bottom gradient overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
    </footer>
  );
};

export default Footer; 