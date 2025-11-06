
import React, { useState, useCallback } from 'react';
import { ImageUploader } from './components/ImageUploader';
import { ImageDisplay } from './components/ImageDisplay';
import { Button } from './components/Button';
import { Header } from './components/Header';
import { toBase64 } from './utils/fileUtils';
import { removeBackground } from './services/geminiService';

const App: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = useCallback((selectedFile: File) => {
    setFile(selectedFile);
    setResultImage(null);
    setError(null);

    const reader = new FileReader();
    reader.onloadend = () => {
      setOriginalImage(reader.result as string);
    };
    reader.readAsDataURL(selectedFile);
  }, []);

  const handleRemoveBackground = async () => {
    if (!file) {
      setError("Please select an image first.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setResultImage(null);

    try {
      const base64Image = await toBase64(file);
      const resultBase64 = await removeBackground(base64Image, file.type);
      setResultImage(`data:image/png;base64,${resultBase64}`);
    } catch (e) {
      console.error(e);
      setError("Failed to remove background. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setOriginalImage(null);
    setResultImage(null);
    setFile(null);
    setError(null);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <Header />

      <main className="w-full max-w-6xl flex flex-col items-center">
        {!originalImage ? (
          <ImageUploader onFileSelect={handleFileSelect} />
        ) : (
          <div className="w-full">
            {error && (
              <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg relative mb-6 text-center" role="alert">
                <span className="block sm:inline">{error}</span>
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <ImageDisplay title="Original Image" imageUrl={originalImage} />
              <ImageDisplay title="Background Removed" imageUrl={resultImage} isLoading={isLoading} />
            </div>
            
            <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
              <Button
                onClick={handleRemoveBackground}
                disabled={isLoading}
                className="w-full sm:w-auto"
              >
                {isLoading ? 'Processing...' : 'Remove Background'}
              </Button>

              {resultImage && (
                <a
                  href={resultImage}
                  download="background-removed.png"
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300 w-full sm:w-auto text-center"
                >
                  Download Image
                </a>
              )}
               <Button
                onClick={handleReset}
                variant="secondary"
                className="w-full sm:w-auto"
               >
                Upload New Image
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
