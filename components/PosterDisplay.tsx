import React from 'react';
import { DownloadIcon, ImageIcon, WarningIcon } from './icons';

interface PosterDisplayProps {
  generatedImage: string | null;
  isLoading: boolean;
  error: string | null;
}

const loadingMessages = [
  "Deep-diving into brand psychology...",
  "Applying professional color science...",
  "Positioning the hero for maximum impact...",
  "Crafting benefit-driven messaging...",
  "Setting up cinematic 8k lighting...",
  "Removing visual clutter for premium feel...",
  "Perfecting scannable call-to-actions...",
  "Final review by the Creative Director..."
];

const LoadingState: React.FC = () => {
    const [messageIndex, setMessageIndex] = React.useState(0);

    React.useEffect(() => {
        const interval = setInterval(() => {
            setMessageIndex((prevIndex) => (prevIndex + 1) % loadingMessages.length);
        }, 2500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center h-full text-center p-4">
             <div className="w-20 h-20 border-t-4 border-indigo-500 border-solid rounded-full animate-spin"></div>
             <p className="mt-6 text-xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
                Crafting Your Masterpiece
             </p>
             <p className="text-gray-400 mt-2 text-sm italic transition-opacity duration-500 h-10">
                {loadingMessages[messageIndex]}
             </p>
        </div>
    );
};

const PosterDisplay: React.FC<PosterDisplayProps> = ({ generatedImage, isLoading, error }) => {
  return (
    <div className="bg-gray-800 p-2 rounded-2xl border border-gray-700 shadow-2xl aspect-[3/4] flex items-center justify-center sticky top-24 overflow-hidden">
      <div className="w-full h-full bg-black/40 rounded-lg flex items-center justify-center relative">
        {isLoading && <LoadingState />}
        
        {error && !isLoading && (
          <div className="text-center text-red-400 p-8">
            <WarningIcon />
            <h3 className="mt-4 text-lg font-semibold text-white">Art Direction Error</h3>
            <p className="mt-2 text-sm text-red-300/80">{error}</p>
          </div>
        )}
        
        {!isLoading && !error && generatedImage && (
          <div className="relative w-full h-full group">
            <img src={generatedImage} alt="Generated Ad Masterpiece" className="w-full h-full object-contain rounded-lg shadow-2xl" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-lg pointer-events-none"></div>
            <a
              href={generatedImage}
              download="world-class-ad-poster.png"
              className="absolute bottom-6 right-6 bg-indigo-600 text-white p-4 rounded-full shadow-2xl opacity-0 group-hover:opacity-100 transition-all hover:bg-indigo-500 transform hover:scale-110 active:scale-90"
              title="Download Masterpiece"
            >
              <DownloadIcon />
            </a>
          </div>
        )}

        {!isLoading && !error && !generatedImage && (
          <div className="text-center text-gray-500 p-8 max-w-xs">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-700/50 rounded-full flex items-center justify-center">
                <ImageIcon />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">The Studio is Ready</h3>
            <p className="text-sm leading-relaxed">Provide your brand brief. We'll handle the design, marketing, and psychology to build you a world-class ad.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PosterDisplay;
