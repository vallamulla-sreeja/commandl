import React from "react";
import Navbar from "../components/Navbar";

export const metadata = {
  title: 'Security | CommandL',
  description:
    'Learn how CommandL, a fork of VS Code focused on coding education and project-based tasks, approaches security, data handling, and AI requests.',
  openGraph: {
    title: 'CommandL Security',
    description:
      'Read about CommandL’s security measures, data retention policies, and how we integrate with OpenAI to power learning-focused AI features.',
    type: 'website',
    url: 'https://commandl.com/security',
    siteName: 'CommandL',
  },
  twitter: {
    card: 'summary',
    title: 'CommandL Security',
    description:
      'Discover how CommandL protects your task data, progress, and personal information in our AI-enhanced, learning-focused coding environment.',
  },
};

export default function Security() {
  return (
    <>
      <Navbar />
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4 py-16 max-w-5xl">
          <h1 className="text-4xl font-bold text-[#58cc02] text-center mb-8">
            Security
          </h1>
          <p className="text-md text-gray-600 text-center mb-6">
            Last updated: January 2, 2025
          </p>

          <p className="text-xl text-gray-600 mb-6">
            At CommandL, safeguarding your learning progress and personal
            information is our top priority. Below is an overview of how we
            protect your data, handle AI requests to OpenAI, and maintain a
            secure environment—particularly for those using our platform to
            learn and practice coding through interactive tasks.
          </p>

          <p className="text-lg text-gray-600 mb-6">
            If you discover potential vulnerabilities or have concerns about our
            security posture, please submit a detailed report to our GitHub
            Security page or contact us at
            <a
              href="mailto:hi@commandl.com"
              className="text-[#58cc02] underline ml-1"
            >
              hi@commandl.com
            </a>.
          </p>

          <h2 className="text-2xl font-bold text-[#58cc02] mb-4 mt-8">
            Our Approach to Security
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            CommandL is a fork of Visual Studio Code (VS Code) optimized
            for learning. Unlike some AI-first code editors that focus heavily
            on code completions (like Cursor), CommandL provides a structured, 
            task-based learning experience. We store user data related to task 
            progress and challenge completions, along with minimal personal 
            information (name and email) required for user authentication and 
            progress tracking. Apart from this task and progress data, we do not 
            retain any code you write. 
          </p>
          <p className="text-lg text-gray-600 mb-6">
            While we already have users who trust CommandL, we are actively 
            expanding our product and refining our security measures. If your 
            organization has stringent data security requirements, we encourage 
            you to review all AI-based tools carefully. We hope the details 
            provided here enable you to make an informed decision about using 
            CommandL.
          </p>

          <h2 className="text-2xl font-bold text-[#58cc02] mb-4 mt-8">
            Infrastructure Security
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            All CommandL services operate in secure cloud environments with 
            industry-standard measures such as HTTPS/TLS for data in transit 
            and multi-factor authentication for our internal systems. We follow 
            a least-privilege access model, ensuring team members only have the 
            permissions necessary for their role.
          </p>
          <p className="text-lg text-gray-600 mb-6">
            We do not currently hold specific security certifications (e.g., SOC 
            2 or ISO), but we plan to undergo third-party penetration testing 
            and audits on a regular basis. We will share summaries of those 
            assessments when available.
          </p>

          <h2 className="text-2xl font-bold text-[#58cc02] mb-4 mt-8">
            Data Storage & Retention
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            <strong>Task &amp; Progress Data:</strong> CommandL retains records 
            of your completed tasks, code challenges, and project progress. This 
            allows you to revisit lessons and track improvements over time. 
            Storing this progress data is essential to the learning experience 
            we provide.
          </p>
          <p className="text-lg text-gray-600 mb-6">
            <strong>Personal Information:</strong> The only personal information 
            we collect is what you provide during onboarding, typically your 
            email address and a display name. This information is used for 
            authentication, personalized support, and notifying you of important 
            updates. We do not sell or share your personal data with third 
            parties for marketing purposes.
          </p>
          <p className="text-lg text-gray-600 mb-6">
            <strong>Code Data:</strong> We do not store the actual code you 
            write or submit within the editor. Your code typically remains in 
            your local environment unless you explicitly choose to share 
            snippets or solutions with others (e.g., in community forums).
          </p>

          <h2 className="text-2xl font-bold text-[#58cc02] mb-4 mt-8">
            AI Requests (OpenAI)
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            CommandL relies on OpenAI’s models to offer select AI-powered 
            assistance, such as code hints or explanations. When you choose to 
            request AI guidance, we briefly send a snippet of your current code 
            context—along with relevant discussion or task instructions—to our 
            servers, which then forward it to OpenAI. We have a zero data 
            retention agreement with OpenAI, and we do not locally persist your 
            full codebase on our servers beyond handling that specific request. 
            After the AI response is generated, both CommandL and OpenAI discard 
            the code context used, except for minimal, transient logging strictly 
            necessary to maintain system performance and debug issues.
          </p>
          <p className="text-lg text-gray-600 mb-6">
            Unlike code editors that focus on automated completions, CommandL 
            primarily leverages AI to facilitate learning and reinforce concepts. 
            We do not utilize the code you provide for AI training or any 
            purpose beyond fulfilling your specific AI request.
          </p>

          <h2 className="text-2xl font-bold text-[#58cc02] mb-4 mt-8">
            Fork of VS Code
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Because CommandL is built on VS Code, we routinely merge upstream 
            changes from Microsoft&apos;s repository to incorporate their latest 
            security patches. If you need to confirm which version of VS Code 
            your CommandL application is based on, navigate to 
            <strong>&quot;CommandL &gt; About CommandL&quot;</strong> within the app. 
            Notably, some VS Code security features—such as Workspace Trust—may 
            be toggled differently in CommandL due to our focus on educational 
            tasks and user progress.
          </p>

          <h2 className="text-2xl font-bold text-[#58cc02] mb-4 mt-8">
            Responsible Disclosure
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            If you discover a vulnerability in CommandL, we encourage you to 
            report it through our GitHub Security page. If you prefer direct 
            communication, you may also email 
            <a
              href="mailto:hi@commandl.com"
              className="text-[#58cc02] underline ml-1"
            >
              hi@commandl.com
            </a>. 
            We commit to reviewing and addressing confirmed security issues 
            within 15 business days and will publish relevant findings via 
            security advisories for full transparency.
          </p>

          <h2 className="text-2xl font-bold text-[#58cc02] mb-4 mt-8">
            Contact Us
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            If you have any additional questions or concerns related to 
            security—or if you need help understanding how CommandL protects 
            your task data and learning progress—feel free to reach out at
            <a
              href="mailto:hi@commandl.com"
              className="text-[#58cc02] underline ml-1"
            >
              hi@commandl.com
            </a>.
          </p>
        </div>
      </main>
    </>
  );
}
