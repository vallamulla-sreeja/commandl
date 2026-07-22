import Image from 'next/image';

export default function Hero() {
  return (
    <section className="flex flex-col items-center text-center py-4 md:py-8 px-4 max-w-[1000px] mx-auto">
      {/* Text Content */}
      <div className="flex flex-col items-center gap-3 md:gap-5 mb-6 md:mb-8">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#1e1e1e] tracking-tight max-w-[800px] leading-tight">
          <span className="relative z-10 block mb-4">Code Editor Designed</span>
          <span className="relative inline-block">
            <span className="relative z-10">for Students</span>
            <span className="absolute inset-x-[-1rem] inset-y-[-0.5rem] bg-[#EFCCFF] -rotate-0 rounded-lg -z-0"></span>
          </span>
        </h1>
        <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-gray-600 font-bold mt-2 max-w-[600px]">
          The fun &amp; effective way to learn programming
        </p>

        {/* Feature Points with Checkmarks */}
        <div className="flex justify-center gap-6 mt-4 mb-6">
          <div className="flex items-center gap-2">
            <Image src="/images/check.png" alt="Checkmark" width={16} height={16} className="text-green-600" />
            <span>Structured Path to <strong>Mastery</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <Image src="/images/check.png" alt="Checkmark" width={16} height={16} className="text-green-600" />
            <span>No More <strong>Switching Between Tools</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <Image src="/images/check.png" alt="Checkmark" width={16} height={16} className="text-green-600" />
            <span>From <strong>Confusion</strong> to <strong>Clarity</strong></span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 justify-center w-full sm:w-auto flex-col sm:flex-row mt-6">
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
