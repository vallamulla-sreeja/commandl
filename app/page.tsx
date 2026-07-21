'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      {/* Navigation */}
      <nav className="flex items-center gap-8 py-3 px-4 md:px-8 border-b border-gray-200 bg-white max-w-7xl mx-auto">
        <Link href="/" className="flex items-center">
          <Image
            src="/images/logo.png"
            alt="CommandL Logo"
            width={48}
            height={48}
            priority
          />
        </Link>
        <div className="flex items-center gap-8 md:gap-8">
          <Link href="/updates" className="text-sm text-gray-600 hover:text-[#0066b8] transition-colors">Updates</Link>
          <Link href="/blog" className="text-sm text-gray-600 hover:text-[#0066b8] transition-colors">Blogs</Link>
          <Link href="/faq" className="text-sm text-gray-600 hover:text-[#0066b8] transition-colors">FAQ</Link>
        </div>
        <div className="ml-auto flex items-center gap-4">

          <Link href="/download" className="buttonPrimary">Download</Link>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="flex flex-col items-center text-center py-8 px-4 max-w-[1000px] mx-auto">
          {/* Text Content */}
          <div className="flex flex-col items-center gap-5 mb-8">
            <h1 className="text-7xl md:text-6xl font-extrabold text-[#1e1e1e] tracking-tight max-w-[800px] leading-tight">
              Code Editor Designed for Students
            </h1>
            <p className="text-4xl text-gray-600 font-bold mt-2 max-w-[600px]">
              The fun & effective way to learn programming
            </p>

            {/* Buttons */}
            <div className="flex gap-3  justify-center md:flex-row flex-col">
              <a href="#download" className="buttonPrimary font-bold">
                GET STARTED
              </a>
              <a href="#get-copilot-free" className="buttonSecondary font-bold">
                WATCH DEMO
              </a>
            </div>
          </div>

          {/* Editor Screenshot */}
          <div className="w-full max-w-[1000px] mx-auto">
            <Image
              src="/images/editor-screenshot.png"
              alt="Screenshot of CommandL Code Editor"
              width={1000}
              height={625}
              priority
              quality={100}
              className="w-full h-auto rounded-xl shadow-2xl"
            />
          </div>
        </section>
      </main>
    </>
  );
}
