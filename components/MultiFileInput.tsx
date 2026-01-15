
import React, { useState, useEffect, useRef } from 'react';
import { UploadIcon, TrashIcon } from './icons';

interface MultiFileInputProps {
  label: string;
  files: File[];
  setFiles: (files: File[]) => void;
  maxFiles?: number;
}

const MultiFileInput: React.FC<MultiFileInputProps> = ({ label, files, setFiles, maxFiles = 6 }) => {
  const [previews, setPreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Cleanup old previews
    const oldPreviews = previews;
    
    // Create new previews
    const newPreviews = files.map(file => URL.createObjectURL(file));
    setPreviews(newPreviews);

    return () => {
      newPreviews.forEach(url => URL.revokeObjectURL(url));
    };
  }, [files]);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      const combinedFiles = [...files, ...newFiles].slice(0, maxFiles);
      setFiles(combinedFiles);
    }
    // Reset input so same file can be selected again if needed
    if (fileInputRef.current) {
        fileInputRef.current.value = "";
    }
  };

  const handleRemoveFile = (indexToRemove: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const updatedFiles = files.filter((_, index) => index !== indexToRemove);
    setFiles(updatedFiles);
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-end">
        <label className="block text-sm font-medium text-gray-300">{label}</label>
        <span className="text-xs text-gray-500">{files.length} / {maxFiles} images</span>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {previews.map((preview, index) => (
            <div key={index} className="relative group aspect-square rounded-lg border border-gray-600 bg-gray-900 overflow-hidden">
                <img src={preview} alt={`Product ${index + 1}`} className="w-full h-full object-cover" />
                <button
                    onClick={(e) => handleRemoveFile(index, e)}
                    className="absolute top-1 right-1 bg-black/70 hover:bg-red-600 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all transform scale-90 group-hover:scale-100"
                    title="Remove image"
                >
                    <TrashIcon />
                </button>
            </div>
        ))}
        
        {files.length < maxFiles && (
            <div 
                onClick={() => fileInputRef.current?.click()}
                className="aspect-square flex flex-col justify-center items-center bg-gray-900/50 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:border-indigo-500 hover:bg-gray-800/50 transition group"
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png, image/jpeg, image/webp"
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                />
                <div className="text-center text-gray-500 group-hover:text-indigo-400 transition transform group-hover:scale-105">
                    <UploadIcon />
                    <p className="text-xs mt-2 font-medium">Add Photos</p>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default MultiFileInput;
