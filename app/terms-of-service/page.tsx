import React from "react";
import Navbar from "../components/Navbar";

export const metadata = {
  title: 'Terms of Service | CommandL',
  description: 'Read and understand the Terms of Service for using CommandL, an AI-powered code editor for students. Learn about user responsibilities, privacy policy, and more.',
  openGraph: {
    title: 'CommandL Terms of Service',
    description: 'Detailed terms and conditions for using the CommandL code editor platform.',
    type: 'website',
    url: 'https://commandl.com/terms-of-service',
    siteName: 'CommandL',
  },
  twitter: {
    card: 'summary',
    title: 'CommandL Terms of Service',
    description: 'Read our Terms of Service to understand your rights and responsibilities when using CommandL.',
  },
};

export default function TermsOfService() {
  return (
    <>
      <Navbar />
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4 py-16 max-w-5xl">
          <h1 className="text-4xl font-bold text-[#58cc02] text-center mb-8">
            Terms of Service
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Welcome to CommandL! By using our platform, you agree to comply
            with and be bound by the following terms and conditions. Please
            review them carefully.
          </p>

          <h2 className="text-2xl font-bold text-[#58cc02] mb-4 mt-8">
            1. Acceptance of Terms
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            By accessing or using CommandL, you agree to be bound by these
            terms and conditions and any other guidelines, rules, and additional
            terms referenced herein. If you do not agree to these terms, please
            do not use our platform.
          </p>

          <h2 className="text-2xl font-bold text-[#58cc02] mb-4">
            2. Changes to Terms
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            CommandL reserves the right to modify or update these terms at any
            time, with or without notice. Continued use of the platform after
            any changes constitute acceptance of the new terms.
          </p>

          <h2 className="text-2xl font-bold text-[#58cc02] mb-4">
            3. User Responsibilities
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            As a user, you agree to use CommandL responsibly and in compliance
            with all applicable laws and regulations. You are responsible for
            maintaining the confidentiality of your account and password, and for
            all code and content you create using our platform.
          </p>

          <h2 className="text-2xl font-bold text-[#58cc02] mb-4">
            4. Privacy Policy
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Your use of CommandL is also governed by our Privacy Policy. Please
            review our Privacy Policy to understand how we collect, use, and protect
            your personal information and coding data.
          </p>

          <h2 className="text-2xl font-bold text-[#58cc02] mb-4">
            5. Intellectual Property
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            All content on CommandL, including but not limited to text,
            graphics, logos, code editor features, and software, is the property of
            CommandL or its content suppliers and is protected by intellectual
            property laws. The code you write using our platform remains your
            intellectual property.
          </p>

          <h2 className="text-2xl font-bold text-[#58cc02] mb-4">
            6. Educational Use
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            CommandL is designed for educational purposes. While we provide
            coding assistance and tutorials, we are not responsible for the
            accuracy or reliability of any code generated through our platform.
            Users should always review and test their code thoroughly.
          </p>

          <h2 className="text-2xl font-bold text-[#58cc02] mb-4">
            7. Termination
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            CommandL reserves the right to terminate or suspend your account
            and access to the platform at any time, without notice, for conduct
            that we believe violates these terms or is harmful to other users,
            our platform, or third parties.
          </p>

          <h2 className="text-2xl font-bold text-[#58cc02] mb-4">
            8. Limitation of Liability
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            In no event shall CommandL or its suppliers be liable for any
            direct, indirect, incidental, special, or consequential damages
            arising out of the use or inability to use the platform, including
            any loss of data or code.
          </p>

          <h2 className="text-2xl font-bold text-[#58cc02] mb-4">
            9. Governing Law
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            These terms and conditions are governed by and construed in
            accordance with the laws of California, United States. You agree to
            submit to the exclusive jurisdiction of the courts located within
            California to resolve any legal matter arising from these terms.
          </p>

          <h2 className="text-2xl font-bold text-[#58cc02] mb-4">
            10. Contact Information
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            If you have any questions about these Terms of Service, please
            contact us at <a href="mailto:sreeja.v@vedaverse.io" className="text-[#1cb0f6] hover:underline">sreeja.v@vedaverse.io</a>.
          </p>
        </div>
      </main>
    </>
  );
} 