// components/SubTaskRenderer.tsx

'use client';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
// import dynamic from 'next/dynamic';
import './styles/notes.css'; // Make sure to import the same CSS file

// const DynamicMermaidDiagram = dynamic(() => import('../utils/MermaidDiagram'), {
//   ssr: false
// });

interface SubTaskRendererProps {
  subtask: string;
}

const SubTaskRenderer: React.FC<SubTaskRendererProps> = ({ 
  subtask, 
}) => {

  const components = {
    code({ inline, className, children, ...props }: React.ComponentPropsWithoutRef<'code'> & { inline?: boolean }) {
      const match = /language-(\w+)/.exec(className || '');
      if (!inline && match) {
        // if (match[1] === 'mermaid') {
        //   return <DynamicMermaidDiagram chart={String(children)} />;
        // }
        return (
          <SyntaxHighlighter
            // @ts-expect-error - Known issue with react-syntax-highlighter types
            style={tomorrow}
            language={match[1]}
            PreTag="div"
            {...props}
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
  };

  return (
    <div className={`container mx-auto px-2 sm:px-4 py-2 relative`}>
      <div className="pr-4 sm:pr-16">
        <div className={`prose max-w-none prose-sm sm:prose-base`}>
          {subtask ? (
            <ReactMarkdown components={components}>
              {subtask}
            </ReactMarkdown>
          ) : (
            <p>No sub tasks available for this task.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubTaskRenderer;