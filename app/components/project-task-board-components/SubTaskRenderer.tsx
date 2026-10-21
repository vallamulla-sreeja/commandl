'use client';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import type { Components } from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Crown } from 'lucide-react';
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
    db_tables?: string[];
    feedback?: {
      message: string;
      feedback: string;
      results?: Record<string, unknown>[];
      ran_user_code?: boolean;
      code_to_execute?: string | null;
    };
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
        <code className={`${className} bg-gray-100 text-gray-800 px-2 py-1 rounded font-mono text-sm font-semibold`} {...props}>
          {children}
        </code>
      );
    },
    h1: ({ children }: HeadingProps) => <h1 className="text-3xl font-bold text-gray-800 mb-4 border-b-2 border-emerald-500 pb-2">{children}</h1>,
    h2: ({ children }: HeadingProps) => <h2 className="text-2xl font-bold text-gray-800 mb-3">{children}</h2>,
    h3: ({ children }: HeadingProps) => <h3 className="text-xl font-bold text-gray-800 mb-2">{children}</h3>,
    p: ({ children }: { children?: React.ReactNode }) => <p className="mb-4 text-gray-700 font-medium leading-relaxed">{children}</p>,
    ul: ({ children }: ListProps) => <ul className="list-disc list-outside ml-6 mb-4 space-y-2">{children}</ul>,
    ol: ({ children }: ListProps) => <ol className="list-decimal list-outside ml-6 mb-4 space-y-2">{children}</ol>,
    li: ({ children }: ListProps) => <li className="text-gray-700 font-medium">{children}</li>,
    a: ({ href, children }: AnchorProps) => (
      <a 
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:text-blue-800 underline font-semibold transition-colors duration-200"
      >
        {children}
      </a>
    ),
    strong: ({ children }: StrongProps) => <strong className="font-bold text-gray-800">{children}</strong>,
    em: ({ children }: EmphasizeProps) => <em className="italic text-gray-600 font-medium">{children}</em>,
    blockquote: ({ children }: BlockquoteProps) => (
      <blockquote className="border-l-4 border-emerald-500 bg-emerald-50 pl-6 py-4 my-4 italic text-gray-700 rounded-r-lg">{children}</blockquote>
    ),
  };

  // Check if this is a limited details subtask (empty or very short description)
  const isLimitedDetails = !subtask || subtask.trim() === '';

  return (
    <div className="container mx-auto px-2 sm:px-4 py-2 relative">
      <div className="pr-4 sm:pr-16">
        <div className="prose max-w-none prose-lg">
          {isLimitedDetails ? (
            <div className="bg-gradient-to-br from-amber-50 to-yellow-50 border-2 border-amber-200 rounded-2xl p-8 mb-6 w-full shadow-sm">
              <div className="flex items-center justify-center mb-6">
                <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl shadow-lg mr-4">
                  <Crown className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-amber-700">Premium Content</h3>
              </div>
              <p className="text-center text-amber-800 mb-8 text-lg font-medium leading-relaxed">
                This content is only available for premium users. Upgrade now to access the full details and complete this task.
              </p>
              <button 
                className="w-full py-4 px-6 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                onClick={() => {
                  // Navigate to the Stripe payment link
                  window.open('https://buy.stripe.com/eVa9DB3fr9og0RqeUZ', '_blank');
                }}
              >
                🚀 Upgrade Now
              </button>
            </div>
          ) : (
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
                      {more_info.data.verify_field.type === 'db_connection_string' 
                        ? 'Your submitted connection string:' 
                        : more_info.data.verify_field.type === 'code_verify'
                          ? 'Your verified code:' 
                          : `Your submitted ${more_info.data.verify_field.type} profile URL:`}
                    </label>
                    {more_info.data.verify_field.type === 'code_verify' ? (
                      <div className="rounded-md overflow-hidden">
                        {/* <div className="bg-gray-800 px-4 py-2 text-xs text-gray-400 flex justify-between items-center border-b border-gray-700">
                          <span>Verified SQL Query</span>
                        </div> */}
                        <pre className="p-4 bg-gray-900 text-gray-100 font-mono overflow-auto whitespace-pre-wrap">
                          {more_info.user_input}
                        </pre>
                      </div>
                    ) : (
                      <input
                        type={more_info.data.verify_field.type === 'db_connection_string' ? 'text' : 'url'}
                        value={more_info.user_input}
                        readOnly
                        disabled
                        className="w-full px-3 py-2 border rounded-md shadow-sm bg-gray-50 text-gray-700 cursor-not-allowed"
                      />
                    )}
                    {more_info.data.verify_field.type === 'db_connection_string' && (
                      <div>
                        <p className="mt-2 text-sm text-green-600">
                          Connection string verified successfully
                        </p>
                        {more_info.data.db_tables && more_info.data.db_tables.length > 0 && (
                          <div className="mt-2 p-3 bg-gray-50 border border-gray-200 rounded-md">
                            <p className="text-sm font-medium text-gray-700">Tables found in your database:</p>
                            <ul className="mt-1 text-sm text-gray-600 list-disc pl-5">
                              {more_info.data.db_tables.map((table, index) => (
                                <li key={index}>{table}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {more_info.data.db_tables && more_info.data.db_tables.length === 0 && (
                          <p className="mt-2 text-sm text-gray-600">
                            Connection was valid but no tables were found in the public schema.
                          </p>
                        )}
                      </div>
                    )}
                    {more_info.data.verify_field.type === 'code_verify' && (
                      <div>
                        <p className="mt-2 text-sm text-green-600">
                          Code verified successfully
                        </p>
                        {more_info.data.feedback && (
                          <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded-md">
                            <p className="text-sm font-medium text-green-700">{more_info.data.feedback.message}</p>
                            {more_info.data.feedback.feedback && (
                              <p className="mt-1 text-sm text-green-600">{more_info.data.feedback.feedback}</p>
                            )}
                            {more_info.data.feedback.code_to_execute && (
                              <div className="mt-2 bg-green-100 p-2 rounded text-xs font-mono text-green-800">
                                {more_info.data.feedback.code_to_execute}
                              </div>
                            )}
                          </div>
                        )}
                        {more_info.data.feedback?.results && (
                          <SQLResultsTable results={more_info.data.feedback.results} />
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// SQL Results Table Component for completed tasks
const SQLResultsTable = ({ results }: { results?: Record<string, unknown>[] }) => {
  if (!results || results.length === 0) {
    return <p className="text-sm text-gray-500 italic">No results returned</p>;
  }

  // Get all unique column names from the results
  const columns = Array.from(
    new Set(
      results.flatMap(row => Object.keys(row))
    )
  );

  // If there are no columns but we have results (empty objects), show a message
  if (columns.length === 0 && results.length > 0) {
    return (
      <div className="mt-4">
        <p className="text-sm text-gray-500">Query executed successfully but returned empty results</p>
        <p className="text-xs text-gray-400">{results.length} row(s) affected</p>
      </div>
    );
  }

  return (
    <div className="mt-4 overflow-x-auto">
      <p className="text-sm text-gray-500 mb-2">Query Results:</p>
      <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-md">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column, i) => (
              <th 
                key={i} 
                className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b"
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {results.map((row, i) => (
            <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              {columns.map((column, j) => (
                <td 
                  key={j} 
                  className="px-4 py-2 text-sm text-gray-500 border-r last:border-r-0"
                >
                  {row[column] !== undefined && row[column] !== null 
                    ? String(row[column]) 
                    : <span className="text-gray-300">null</span>}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <p className="text-xs text-gray-400 mt-1">{results.length} row(s) returned</p>
    </div>
  );
};

export default SubTaskRenderer;