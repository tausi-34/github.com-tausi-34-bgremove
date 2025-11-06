
import React, { useCallback, useState } from 'react';

interface ImageUploaderProps {
  onFileSelect: (file: File) => void;
}

const UploadIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
    </svg>
);


export const ImageUploader: React.FC<ImageUploaderProps> = ({ onFileSelect }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      onFileSelect(event.target.files[0]);
    }
  };

  const handleDragEnter = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);
  
  const handleDrop = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileSelect(e.dataTransfer.files[0]);
    }
  }, [onFileSelect]);


  return (
    <div className="w-full max-w-lg mx-auto">
      <label
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`flex justify-center items-center w-full h-64 px-4 transition-all duration-300 bg-gray-800 border-2 border-dashed rounded-xl cursor-pointer hover:border-indigo-400 ${isDragging ? 'border-indigo-400 scale-105' : 'border-gray-600'}`}
      >
        <div className="text-center">
          <UploadIcon className="mx-auto h-12 w-12 text-gray-500" />
          <p className="mt-2 text-lg font-semibold text-gray-300">
            <span className="text-indigo-400">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
        </div>
        <input
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />
      </label>
    </div>
  );
};
