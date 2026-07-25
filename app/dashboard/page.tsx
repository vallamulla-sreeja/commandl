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
            <h1 className="text-4xl lg:text-5xl font-extrabold text-[#4b4b4b] mb-6">
              Welcome to CommandL
            </h1>
            <div className="p-8 rounded-2xl bg-gray-50">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                We're excited to have you on board. We're currently putting the finishing touches on 
                CommandL and will notify you as soon as we're ready to launch. In the meantime, 
                stay tuned for updates and early access opportunities!
              </p>
              <div className="inline-flex items-center justify-center space-x-2 bg-primary/10 text-primary font-medium py-3 px-6 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>You're on our waitlist</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}