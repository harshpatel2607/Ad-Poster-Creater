import React from 'react';
import type { SizeOption, PosterType } from '../types';
import FileInput from './FileInput';
import MultiFileInput from './MultiFileInput';
import { SparklesIcon, LinkIcon } from './icons';

interface InputFormProps {
  brandName: string;
  setBrandName: (value: string) => void;
  productName: string;
  setProductName: (value: string) => void;
  targetAudience: string;
  setTargetAudience: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
  language: string;
  setLanguage: (value: string) => void;
  
  contactPhone: string;
  setContactPhone: (value: string) => void;
  website: string;
  setWebsite: (value: string) => void;
  address: string;
  setAddress: (value: string) => void;
  locationUrl: string;
  setLocationUrl: (value: string) => void;

  productImages: File[];
  setProductImages: (files: File[]) => void;
  productUrl: string;
  setProductUrl: (value: string) => void;
  brandLogo: File | null;
  setBrandLogo: (file: File | null) => void;
  autoGenerateLogo: boolean;
  setAutoGenerateLogo: (val: boolean) => void;
  
  posterType: PosterType;
  setPosterType: (type: PosterType) => void;
  festivalName: string;
  setFestivalName: (value: string) => void;

  isLoading: boolean;
  isAnalyzing: boolean;
  onSubmit: () => void;
  onUpdateText: () => void;
  onAnalyze: () => void;
  hasGeneratedImage: boolean;
  onReset: () => void;
  selectedSize: SizeOption | null;
  onChangeSize: () => void;
}

const LANGUAGES = [
    'English', 'Hindi', 'Gujarati', 'Marathi', 'Bengali', 'Tamil', 'Telugu', 
    'Spanish', 'French', 'German', 'Arabic', 'Japanese', 'Korean'
];

const InputForm: React.FC<InputFormProps> = ({
  brandName, setBrandName, 
  productName, setProductName,
  targetAudience, setTargetAudience,
  description, setDescription,
  language, setLanguage,
  contactPhone, setContactPhone, website, setWebsite, address, setAddress,
  locationUrl, setLocationUrl,
  productImages, setProductImages, productUrl, setProductUrl, brandLogo, setBrandLogo,
  autoGenerateLogo, setAutoGenerateLogo,
  posterType, setPosterType, festivalName, setFestivalName,
  isLoading, isAnalyzing, onSubmit, onUpdateText, onAnalyze, hasGeneratedImage, onReset, selectedSize, onChangeSize
}) => {
  return (
    <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700 shadow-lg space-y-6 animate-fade-in max-w-2xl mx-auto text-gray-100">
      
      {selectedSize && (
        <div className="flex items-center justify-between bg-indigo-900/40 border border-indigo-500/30 p-4 rounded-xl mb-2">
            <div>
                <span className="text-[10px] text-indigo-400 uppercase font-black tracking-widest block mb-1">Canvas Format</span>
                <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-lg">{selectedSize.title}</span>
                </div>
            </div>
            <button onClick={onChangeSize} className="text-xs bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition font-bold">Change</button>
        </div>
      )}

      {/* Campaign Mode Switch */}
      <div className="space-y-3">
        <label className="block text-sm font-bold text-gray-400 uppercase tracking-tighter">Campaign Strategy</label>
        <div className="bg-gray-900/80 p-1.5 rounded-xl flex gap-1">
            <button className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${posterType === 'Professional' ? 'bg-indigo-600 text-white shadow-lg' : 'text-gray-500 hover:text-gray-300'}`} onClick={() => setPosterType('Professional')}>Professional Ads</button>
            <button className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${posterType === 'Festival' ? 'bg-indigo-600 text-white shadow-lg' : 'text-gray-500 hover:text-gray-300'}`} onClick={() => setPosterType('Festival')}>Festival Special</button>
        </div>
      </div>

      {posterType === 'Festival' && (
        <div className="space-y-2 animate-fade-in bg-indigo-900/10 p-4 rounded-xl border border-indigo-500/20">
             <label className="block text-sm font-bold text-indigo-300">Occasion / Celebration Name</label>
             <input type="text" value={festivalName} onChange={(e) => setFestivalName(e.target.value)} placeholder="e.g., Diwali, Christmas, Grand Opening" className="w-full bg-gray-900 border border-indigo-500/50 rounded-lg px-4 py-3 text-white outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
      )}

      <div className="space-y-5">
        <h3 className="text-md font-bold text-white border-b border-gray-700 pb-3 flex justify-between items-center">
            1. Brand Personality & Strategy
            <button 
                onClick={onAnalyze} 
                disabled={isAnalyzing || !brandName || productImages.length === 0}
                className="text-[10px] bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:from-gray-700 disabled:to-gray-800 text-white px-4 py-2 rounded-lg uppercase font-black tracking-widest transition shadow-lg shadow-purple-500/20"
                title="Requires at least one product image"
            >
                {isAnalyzing ? 'Deep Strategizing...' : 'Strategic AI Analysis ✨'}
            </button>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
                <label className="block text-sm font-bold text-gray-400">Brand Name</label>
                <input type="text" value={brandName} onChange={(e) => setBrandName(e.target.value)} placeholder="e.g., Zenith Watch Co." className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-3 text-white outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div className="space-y-2">
                <label className="block text-sm font-bold text-gray-400">Product Name (Optional)</label>
                <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} placeholder="e.g., Chronos Ultra" className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-3 text-white outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
                <label className="block text-sm font-bold text-gray-400">Target Audience (Optional)</label>
                <input type="text" value={targetAudience} onChange={(e) => setTargetAudience(e.target.value)} placeholder="e.g., High-net-worth professionals..." className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-3 text-white outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div className="space-y-2">
                <label className="block text-sm font-bold text-gray-400">Poster Language</label>
                <select 
                    value={language} 
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-3 text-white outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    {LANGUAGES.map(lang => <option key={lang} value={lang}>{lang}</option>)}
                </select>
            </div>
        </div>

        <div className="space-y-2">
            <label className="block text-sm font-bold text-gray-400">Campaign Insight & Human Emotion</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} placeholder="Describe the feeling: 'The absolute power of silence' or 'Elegance for the modern woman'..." className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-3 text-white outline-none focus:ring-2 focus:ring-indigo-500 text-sm" />
            <p className="text-[10px] text-gray-500 italic">Our AI acts as a top-tier marketer. Focus on human emotion to manipulate desire.</p>
        </div>
      </div>

      <div className="space-y-5">
        <h3 className="text-md font-bold text-white border-b border-gray-700 pb-3">2. Visual Core Assets</h3>
        
        <div className="space-y-4">
            <MultiFileInput label="Product Photos (Optional)" files={productImages} setFiles={setProductImages} maxFiles={6} />
            <p className="text-[10px] text-gray-500 italic ml-1">If no photos are uploaded, AI will generate a God-tier hero visual for you.</p>
        </div>

        <div className="space-y-4 pt-2">
            <FileInput label="Brand Watermark / Logo (Optional)" file={brandLogo} setFile={setBrandLogo} />
            
            {!brandLogo && (
                <div className="flex items-center justify-between bg-gray-900/50 p-3 rounded-lg border border-gray-700">
                    <div className="space-y-1">
                        <span className="text-xs font-bold text-white block">Auto-Generate AI Logo</span>
                        <span className="text-[10px] text-gray-400 block italic">AI will create a professional, minimal logo for your brand.</span>
                    </div>
                    <button 
                        onClick={() => setAutoGenerateLogo(!autoGenerateLogo)}
                        className={`w-12 h-6 rounded-full transition-colors relative ${autoGenerateLogo ? 'bg-indigo-600' : 'bg-gray-600'}`}
                    >
                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${autoGenerateLogo ? 'left-7' : 'left-1'}`}></div>
                    </button>
                </div>
            )}
        </div>
      </div>

      <div className="space-y-5">
        <h3 className="text-md font-bold text-white border-b border-gray-700 pb-3">3. Reach & Action</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-gray-500 ml-1">Phone (Optional)</label>
                <input type="text" value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} placeholder="+1 (555) 000-0000" className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-3 text-sm text-white outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-gray-500 ml-1">Website (Optional)</label>
                <input type="text" value={website} onChange={(e) => setWebsite(e.target.value)} placeholder="zenithwatches.com" className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-3 text-sm text-white outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
        </div>
        <div className="space-y-2">
            <label className="block text-sm font-bold text-gray-400 ml-1">Physical Address (Optional)</label>
            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="e.g., 5th Avenue, New York, NY" className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-3 text-sm text-white outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
        <div className="space-y-1">
             <label className="text-[10px] uppercase font-bold text-gray-500 ml-1 text-indigo-300">Scannable Location Link (Optional)</label>
            <div className="relative">
                <input type="url" value={locationUrl} onChange={(e) => setLocationUrl(e.target.value)} placeholder="e.g., https://maps.app.goo.gl/..." className="w-full bg-gray-900 border border-indigo-500/30 rounded-lg px-4 py-3 text-sm text-white pl-12 outline-none focus:ring-2 focus:ring-indigo-500" />
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400/70"><LinkIcon /></div>
            </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 pt-4">
         {hasGeneratedImage ? (
             <div className="grid grid-cols-2 gap-4">
                 <button onClick={onUpdateText} disabled={isLoading} className="bg-indigo-600 text-white font-black py-4 px-4 rounded-xl hover:bg-indigo-700 transition shadow-xl shadow-indigo-600/20 active:scale-95 text-xs uppercase tracking-widest">Re-Polish Ad</button>
                 <button onClick={onSubmit} disabled={isLoading} className="bg-gray-700 text-white font-black py-4 px-4 rounded-xl hover:bg-gray-600 transition active:scale-95 text-xs uppercase tracking-widest">New Ad Concept</button>
             </div>
         ) : (
            <button onClick={onSubmit} disabled={isLoading} className="w-full bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-700 hover:from-indigo-500 hover:via-blue-500 hover:to-indigo-600 text-white font-black py-4 px-4 rounded-xl flex justify-center items-center gap-3 transition-all shadow-2xl shadow-indigo-600/40 active:scale-[0.98] text-sm uppercase tracking-widest">
                {isLoading ? (
                    <span className="flex items-center gap-3">
                        <svg className="animate-spin h-6 w-6 text-white" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                        Art Director working...
                    </span>
                ) : <><SparklesIcon /> Craft World-Class Ad</>}
            </button>
         )}
        <button onClick={onReset} className="text-gray-500 text-[10px] font-bold uppercase tracking-widest py-2 hover:text-red-400 transition text-center">Reset Design Brief</button>
      </div>
    </div>
  );
};

export default InputForm;
