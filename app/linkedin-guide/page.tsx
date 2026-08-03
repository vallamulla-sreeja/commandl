'use client';

import { Container } from '../components/ui/container';

export default function LinkedInGuide() {
  return (
    <div className="py-16 sm:py-20">
      <Container>
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Update Your LinkedIn Profile
          </h1>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            Learn how to optimize your LinkedIn profile to showcase your CommandL projects and achievements.
          </p>
        </div>
        
        <div className="w-full max-w-4xl mx-auto aspect-video relative">
          <video 
            className="w-full h-full rounded-lg shadow-lg"
            controls
            controlsList="nodownload"
            preload="metadata"
          >
            <source 
              src="https://publicvedaverse.blob.core.windows.net/public/linkedin-video.mp4" 
              type="video/mp4" 
            />
            Your browser does not support the video tag.
          </video>
        </div>
      </Container>
    </div>
  );
} 