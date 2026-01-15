
import React, { useState, useEffect, useRef } from 'react';
import { UploadIcon, XIcon } from './icons';

interface FileInputProps {
  label: string;
  file: File | null;
  setFile: (file: File | null) => void;
}

const FileInput: React.FC<FileInputProps> = ({ label, file, setFile }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!file) {
      setPreview(null);
      return;
    }
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleRemoveFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFile(null);
    if(fileInputRef.current) {
        fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-300">{label}</label>
      <div 
        onClick={() => fileInputRef.current?.click()}
        className="group relative w-full h-32 flex justify-center items-center bg-gray-900/50 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:border-indigo-500 transition"
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png, image/jpeg, image/webp"
          onChange={handleFileChange}
          className="hidden"
        />
        {preview ? (
          <>
            <img src={preview} alt="Preview" className="h-full w-full object-contain rounded-md p-1" />
            <button
              onClick={handleRemoveFile}
              className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Remove image"
            >
              <XIcon />
            </button>
          </>
        ) : (
          <div className="text-center text-gray-500 group-hover:text-gray-400 transition">
            <UploadIcon />
            <p className="text-xs mt-1">Click to upload</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileInput;
