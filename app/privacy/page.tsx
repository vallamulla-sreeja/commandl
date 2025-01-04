import React from "react";
import Navbar from "../components/Navbar";

export const metadata = {
  title: 'Privacy Policy | CommandL',
  description:
    'Learn how CommandL handles your personal information, task progress data, and code snippets in our AI-assisted, learning-focused environment.',
  openGraph: {
    title: 'CommandL Privacy Policy',
    description:
      'Read about CommandL’s data collection, retention, and code handling policies to understand how we protect your privacy while you learn coding.',
    type: 'website',
    url: 'https://commandl.com/privacy',
    siteName: 'CommandL',
  },
  twitter: {
    card: 'summary',
    title: 'CommandL Privacy Policy',
    description:
      'Discover how CommandL safeguards your personal data, coding progress, and code snippets in our interactive learning platform.',
  },
};

export default function Privacy() {
  return (
    <>
      <Navbar />
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4 py-16 max-w-5xl">
          <h1 className="text-4xl font-bold text-[#58cc02] text-center mb-8">
            Privacy Policy
          </h1>
          <p className="text-md text-gray-600 text-center mb-6">
            Last updated: January 2, 2025
          </p>

          <p className="text-xl text-gray-600 mb-6">
            This Privacy Policy describes how CommandL (“we,” “us,” or “our”)
            collects, uses, and safeguards the information you provide when you
            use our AI-assisted learning environment, a fork of Visual Studio
            Code (VS Code) tailored for project-based coding tasks. Please read
            this policy carefully, and reach out to us with any questions at
            <a
              href="mailto:hi@commandl.com"
              className="text-[#58cc02] underline ml-1"
            >
              hi@commandl.com
            </a>
          </p>

          {/* TLDR Section */}
          <h2 className="text-2xl font-bold text-[#58cc02] mb-4 mt-8">
            TLDR
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            - We only retain minimal personal information (email and name) and
            your progress data (completed tasks and challenges).
            <br />
            - We do not store your code permanently. Snippets may be briefly
            processed for AI-related functionality and then discarded.
            <br />
            - Our AI integration currently uses OpenAI models, under a zero data
            retention agreement.
            <br />
            - We rely on brief logging to monitor system performance and debug
            issues but do not train our models on your code.
          </p>

          {/* Data Collection Section */}
          <h2 className="text-2xl font-bold text-[#58cc02] mb-4 mt-8">
            1. Data Collection
          </h2>
          <p className="text-lg text-gray-600 mb-4">
            <strong>Personal Information:</strong> We collect your email address
            and name when you sign up for CommandL. This information is used for
            authentication, tracking your learning progress, and communicating
            important updates related to our platform.
          </p>
          <p className="text-lg text-gray-600 mb-4">
            <strong>Task &amp; Progress Data:</strong> We store data about your
            completed tasks, coding challenges, and overall progress. This helps
            us provide you with personalized insights and allows you to revisit
            past lessons or assessments.
          </p>
          <p className="text-lg text-gray-600 mb-6">
            <strong>Code Snippets:</strong> While we do not permanently store
            any code you write, brief transmissions of your code snippets may
            occur if you request AI-powered suggestions or explanations. After
            the request is processed and a response is returned, this code is
            discarded from our servers and not used for any training purposes.
          </p>

          {/* AI Requests Section */}
          <h2 className="text-2xl font-bold text-[#58cc02] mb-4 mt-8">
            2. AI Requests (OpenAI)
          </h2>
          <p className="text-lg text-gray-600 mb-4">
            We leverage OpenAI’s models to provide optional AI-driven features
            like guided code explanations and suggestions. When you initiate an
            AI request, relevant snippets of your code and/or task context are
            sent to our servers, then forwarded to OpenAI. We have a zero data
            retention agreement with OpenAI, ensuring they do not store your
            code or use it for training. Once the AI response is generated, both
            OpenAI and CommandL discard the transmitted code snippets.
          </p>
          <p className="text-lg text-gray-600 mb-6">
            While some code editors may store or further train models on user
            input, CommandL focuses on fostering a learning environment and does
            not retain your code beyond the immediate request.
          </p>

          {/* Telemetry & Usage Analytics Section (Optional) */}
          <h2 className="text-2xl font-bold text-[#58cc02] mb-4 mt-8">
            3. Telemetry &amp; Usage Data
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            We may gather basic telemetry data—such as anonymized usage stats,
            feature engagement, and error reports—to improve our platform’s
            performance and user experience. This telemetry does not include
            your personal code. If you are uncomfortable with providing usage
            data, you can opt out in your profile settings.
          </p>

          {/* Codebase Indexing Section (If Applicable) */}
          <h2 className="text-2xl font-bold text-[#58cc02] mb-4 mt-8">
            4. Code Indexing (Optional)
          </h2>
          <p className="text-lg text-gray-600 mb-4">
            CommandL is primarily a tool for learning specific tasks and
            projects rather than indexing entire codebases. That said, if you
            opt into any functionality that scans or indexes larger sets of
            files, your code chunks will be transmitted briefly to our servers
            for processing. We do not store plaintext code outside of the
            request’s lifetime, and any embeddings or metadata (e.g., file
            hashes) that might be retained are never used for model training or
            made public.
          </p>

          {/* Data Retention & Deletion Section */}
          <h2 className="text-2xl font-bold text-[#58cc02] mb-4 mt-8">
            5. Data Retention &amp; Deletion
          </h2>
          <p className="text-lg text-gray-600 mb-4">
            Personal information (email and name) and your task progress data
            are retained as long as your account remains active, so you can
            track your learning. You can delete your account at any time from
            your user settings. Upon account deletion, we remove all associated
            data—except where required for compliance or legitimate business
            interests—within 30 days.
          </p>

          {/* Security Measures Section */}
          <h2 className="text-2xl font-bold text-[#58cc02] mb-4 mt-8">
            6. Security Measures
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            We use industry-standard encryption (HTTPS/TLS) to protect data in
            transit. Access to our servers and databases is restricted to
            authorized personnel under strict role-based permissions. We also
            conduct periodic audits and plan regular third-party security
            assessments to maintain the integrity of our systems.
          </p>

          {/* Contact Section */}
          <h2 className="text-2xl font-bold text-[#58cc02] mb-4 mt-8">
            Contact Us
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            If you have questions, concerns, or feedback about this Privacy
            Policy or our data practices, you can reach us at
            <a
              href="mailto:hi@commandl.com"
              className="text-[#58cc02] underline ml-1"
            >
              hi@commandl.com
            </a>
          </p>
        </div>
      </main>
    </>
  );
}