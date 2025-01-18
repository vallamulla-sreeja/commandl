'use client';

import React from 'react';
import Sidebar from '../components/Sidebar';

export default function Dashboard() {
  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <main className="flex-1 py-10 lg:pl-72">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Welcome to CommandL
            </h1>
            {/* <p className="text-xl text-gray-600 mb-8">
              Your journey to becoming a skilled developer starts here. With built-in tutorials, 
              guided paths, hints, and real-time feedback—plus fun reward points—you&apos;ll have 
              the support you need at every step of your coding journey.
            </p> */}
            <div className="p-8 rounded-2xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Ready to Start Building?
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Fill out our quick form to join the waitlist and be among the first to explore 
                all that CommandL has to offer!
              </p>
              <a
                href="https://forms.gle/HadSaA64CD9UyoJE6"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-primary text-white text-xl font-medium py-4 px-8 rounded-lg hover:bg-primary-hover transition-colors duration-200"
              >
                Join the Waitlist
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}