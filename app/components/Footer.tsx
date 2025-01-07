import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="bg-[#58CC02] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/images/commandl_logo.png"
                alt="CommandL Icon"
                width={30}
                height={30}
                className="brightness-0 invert"
              />
              <Image
                src="/images/logo.png"
                alt="CommandL Logo"
                width={150}
                height={40}
                className="brightness-0 invert"
              />
            </Link>
            {/* <p className="mt-4 text-base text-white font-medium">
              Your code editor redefined with AI superpowers. Built for the next generation of developers.
            </p> */}
            <p className="mt-2 text-lg text-white font-black font-medium">
              Made by{' '}
              <a 
                href="https://www.vedaverse.io" 
                target="_blank" 
                rel="noopener noreferrer"
                className="underline hover:text-white/90 transition-colors"
              >
                VedaVerse
              </a>
            </p>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-xl font-black text-white tracking-wider uppercase font-[1000]">Company</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link href="/about" className="text-lg font-semibold text-white hover:text-white/90 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <a href="mailto:sreeja.v@vedaverse.io" className="text-lg font-semibold text-white hover:text-white/90 transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-xl font-black text-white tracking-wider uppercase font-[1000]">Legal</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link href="/terms-of-service" className="text-lg font-semibold text-white hover:text-white/90 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/security" className="text-lg font-semibold text-white hover:text-white/90 transition-colors">
                  Security
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-lg font-semibold text-white hover:text-white/90 transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-xl font-black text-white tracking-wider uppercase font-[1000]">Connect</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a 
                  href="https://twitter.com/veda_verse" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-lg font-semibold hover:opacity-80 transition-all flex items-center gap-2 group"
                >
                  <div className="bg-black p-1.5 rounded-md">
                    <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </div>
                  <span className="text-white">Twitter</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://www.linkedin.com/company/vedaverse-io" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-lg font-semibold hover:opacity-80 transition-all flex items-center gap-2 group"
                >
                  <Image
                    src="/images/linkedin.png"
                    alt="LinkedIn"
                    width={28}
                    height={28}
                    className="rounded-md"
                  />
                  <span className="text-white">LinkedIn</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 border-t border-white/20 pt-8">
          <div className="flex justify-center items-center">
            <p className="text-base font-medium text-white font-bold">
              &copy; {new Date().getFullYear()} VedaVerse. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 