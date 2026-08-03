'use client';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import type { Components } from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import '../../styles/notes.css';

interface VerifyField {
  type: string;
}

interface Asset {
  type: 'video' | 'image';
  asset_url: string;
}

interface MoreInfo {
  data: {
    verify_field?: VerifyField;
    asset?: Asset;
  };
  user_input?: string;
}

interface SubTaskRendererProps {
  subtask: string;
  completed?: boolean;
  more_info?: MoreInfo | null;
}

interface CodeProps {
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
}

interface HeadingProps {
  children?: React.ReactNode;
}

interface ListProps {
  children?: React.ReactNode;
}

interface AnchorProps {
  href?: string;
  children?: React.ReactNode;
}

interface StrongProps {
  children?: React.ReactNode;
}

interface EmphasizeProps {
  children?: React.ReactNode;
}

interface BlockquoteProps {
  children?: React.ReactNode;
}

const SubTaskRenderer: React.FC<SubTaskRendererProps> = ({ 
  subtask,
  completed = false,
  more_info = null,
}) => {

  const components: Partial<Components> = {
    code({ inline, className, children, ...props }: CodeProps) {
      const match = /language-(\w+)/.exec(className || '');
      if (!inline && match) {
        return (
          <SyntaxHighlighter
            language={match[1]}
            PreTag="div"
            {...props}
            style={tomorrow}
          >
            {String(children).replace(/\n$/, '')}
          </SyntaxHighlighter>
        );
      }
      return (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
    h1: ({ children }: HeadingProps) => <h1 className="text-2xl font-bold">{children}</h1>,
    h2: ({ children }: HeadingProps) => <h2 className="text-xl font-bold">{children}</h2>,
    h3: ({ children }: HeadingProps) => <h3 className="text-lg font-bold">{children}</h3>,
    ul: ({ children }: ListProps) => <ul className="list-disc list-outside">{children}</ul>,
    ol: ({ children }: ListProps) => <ol className="list-decimal list-outside">{children}</ol>,
    li: ({ children }: ListProps) => <li className="ml-4">{children}</li>,
    a: ({ href, children }: AnchorProps) => (
      <a 
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:text-blue-800 underline"
      >
        {children}
      </a>
    ),
    strong: ({ children }: StrongProps) => <strong className="font-semibold">{children}</strong>,
    em: ({ children }: EmphasizeProps) => <em className="italic text-gray-700">{children}</em>,
    blockquote: ({ children }: BlockquoteProps) => (
      <blockquote className="border-l-4 border-gray-300 pl-4 italic">{children}</blockquote>
    ),
  };

  return (
    <div className="container mx-auto px-2 sm:px-4 py-2 relative">
      <div className="pr-4 sm:pr-16">
        <div className="prose max-w-none prose-sm sm:prose-base">
          {subtask ? (
            <>
              <ReactMarkdown components={components}>
                {subtask}
              </ReactMarkdown>
              
              {more_info?.data?.asset && (
                <div className="mt-6 border-t border-gray-200 pt-4">
                  <div className="bg-white">
                    {more_info.data.asset.type === 'video' && (
                      <div className="relative pt-[56.25%] rounded-lg overflow-hidden">
                        <video
                          className="absolute top-0 left-0 w-full h-full object-cover"
                          controls
                          controlsList="nodownload"
                          preload="metadata"
                        >
                          <source src={more_info.data.asset.asset_url} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {completed && more_info?.data?.verify_field && more_info.user_input && (
                <div className="mt-6 border-t border-gray-200 pt-4">
                  <div className="bg-white">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your submitted {more_info.data.verify_field.type} profile URL:
                    </label>
                    <input
                      type="url"
                      value={more_info.user_input}
                      readOnly
                      disabled
                      className="w-full px-3 py-2 border rounded-md shadow-sm bg-gray-50 text-gray-700 cursor-not-allowed"
                    />
                  </div>
                </div>
              )}
            </>
          ) : (
            <p>No sub tasks available for this task.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubTaskRenderer;