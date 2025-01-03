'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      {/* Navigation */}
      <nav className="nav container">
        <Link href="/" className="logo">
          <Image
            src="/images/logo.png"
            alt="CommandL Logo"
            width={48}
            height={48}
            priority
          />
        </Link>
        <div className="navLinks">
          <Link href="/updates">Updates</Link>
          <Link href="/blog">Blogs</Link>
          <Link href="/faq">FAQ</Link>
        </div>
        <div className="navRight">
          <input type="text" placeholder="Search Docs" className="searchBox" />
          <Link href="/download" className="buttonPrimary">Download</Link>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="hero container">
          {/* Text Content */}
          <div className="heroText">
            <h1 className="heroTitle">
              Code Editor for Students
            </h1>
            <p className="heroCaption">
              Fun & Effective way to learn programming
            </p>

            {/* Buttons */}
            <div className="heroButtons">
              <a href="#download" className="buttonPrimary">
                Download
              </a>
              <a href="#get-copilot-free" className="buttonSecondary">
                Get AI Assist Free
              </a>
            </div>
          </div>

          {/* Editor Screenshot */}
          <div className="heroImage">
            <Image
              src="/images/editor-screenshot.png"
              alt="Screenshot of CommandL Code Editor"
              width={1000}
              height={625}
              priority
              quality={100}
            />
          </div>
        </section>
      </main>
    </>
  );
}
