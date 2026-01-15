
import React, { useState } from 'react';
import { CopyIcon, CheckIcon, XIcon } from './icons';

interface AnalysisResultProps {
  brandName: string;
  result: string;
  onClose: () => void;
}

const AnalysisResult: React.FC<AnalysisResultProps> = ({ brandName, result, onClose }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gray-800 border-2 border-purple-500/50 rounded-2xl p-6 shadow-2xl animate-fade-in relative overflow-hidden">
      <div className="absolute top-0 right-0 p-2">
          <button onClick={onClose} className="text-gray-400 hover:text-white p-1"><XIcon /></button>
      </div>
      
      <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="p-1.5 bg-purple-600 rounded-lg">✨</span>
              Intelligence Report: {brandName}
          </h3>
          <button 
            onClick={handleCopy}
            className="flex items-center gap-2 text-xs bg-gray-900 hover:bg-gray-700 text-gray-300 px-3 py-1.5 rounded-lg border border-gray-700 transition"
          >
            {copied ? <><CheckIcon /> Copied</> : <><CopyIcon /> Copy Analysis</>}
          </button>
      </div>

      <div className="bg-gray-900/50 rounded-xl p-4 max-h-96 overflow-y-auto custom-scrollbar">
          <div className="prose prose-invert prose-sm max-w-none text-gray-300 whitespace-pre-line">
              {result}
          </div>
      </div>
      
      <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
          {["Professional", "Trendy", "Bold", "Premium", "Minimalist"].map(tag => (
              <span key={tag} className="px-3 py-1 bg-purple-900/30 border border-purple-500/30 rounded-full text-[10px] text-purple-300 font-bold uppercase tracking-widest">
                  {tag}
              </span>
          ))}
      </div>
    </div>
  );
};

export default AnalysisResult;
