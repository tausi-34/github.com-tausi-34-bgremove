
import React from 'react';

interface ImageDisplayProps {
  title: string;
  imageUrl: string | null;
  isLoading?: boolean;
}

const Loader: React.FC = () => (
    <div className="flex items-center justify-center w-full h-full">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-indigo-400"></div>
    </div>
);

const Placeholder: React.FC = () => (
    <div className="flex items-center justify-center w-full h-full bg-gray-800/50 rounded-lg">
        <p className="text-gray-500">Result will appear here</p>
    </div>
);


export const ImageDisplay: React.FC<ImageDisplayProps> = ({ title, imageUrl, isLoading = false }) => {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold text-center text-gray-300">{title}</h2>
      <div className="aspect-square w-full bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-700">
        {isLoading ? (
          <Loader />
        ) : imageUrl ? (
          <img src={imageUrl} alt={title} className="object-contain w-full h-full" />
        ) : (
          <Placeholder />
        )}
      </div>
    </div>
  );
};
