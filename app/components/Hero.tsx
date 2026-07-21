import Image from 'next/image';

export default function Hero() {
  return (
    <section className="flex flex-col items-center text-center py-4 md:py-8 px-4 max-w-[1000px] mx-auto">
      {/* Text Content */}
      <div className="flex flex-col items-center gap-3 md:gap-5 mb-6 md:mb-8">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#1e1e1e] tracking-tight max-w-[800px] leading-tight">
          Code Editor Designed for Students
        </h1>
        <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-gray-600 font-bold mt-2 max-w-[600px]">
          The fun & effective way to learn programming
        </p>

        {/* Buttons */}
        <div className="flex gap-3 justify-center w-full sm:w-auto flex-col sm:flex-row mt-2">
          <a href="#download" className="buttonPrimary font-bold w-full sm:w-auto">
            GET STARTED
          </a>
          <a href="#get-copilot-free" className="buttonSecondary font-bold w-full sm:w-auto">
            WATCH DEMO
          </a>
        </div>
      </div>

      {/* Editor Screenshot */}
      <div className="w-full max-w-[1000px] mx-auto px-2 sm:px-4">
        <Image
          src="/images/editor-screenshot.png"
          alt="Screenshot of CommandL Code Editor"
          width={1000}
          height={625}
          priority
          quality={100}
          className="w-full h-auto rounded-lg md:rounded-xl"
        />
      </div>
    </section>
  );
}
