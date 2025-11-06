
import React from 'react';

const SparklesIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.293 2.293a1 1 0 010 1.414L11 15l-4 6h12l-4-6 2.293-2.293a1 1 0 011.414 0L19 12" />
  </svg>
);


export const Header: React.FC = () => {
  return (
    <header className="text-center mb-8 md:mb-12">
      <div className="flex items-center justify-center gap-3">
         <SparklesIcon className="w-8 h-8 text-indigo-400" />
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500">
          AI Background Remover
        </h1>
      </div>
      <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-400">
        Upload any image and let Gemini AI magically remove the background in seconds.
      </p>
    </header>
  );
};
