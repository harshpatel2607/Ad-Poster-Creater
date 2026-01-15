
import React, { useState } from 'react';
import { CopyIcon, CheckIcon, DownloadIcon } from './icons';

interface SizeItem {
  name: string;
  dimsInch: string;
  dimsMm: string;
  useCase: string;
}

interface SizeCard {
  title: string;
  icon: string;
  colorTheme: 'blue' | 'green' | 'orange' | 'red';
  items: SizeItem[];
}

const posterData: {
  title: string;
  intro: string;
  cards: SizeCard[];
  note: { title: string; text: string };
} = {
  title: "Poster Sizes — सामान्य और प्रिंट मानक",
  intro: "इन स्टैंडर्ड साइज़ेस को उपयोग करें — प्रिंटिंग और डिजिटल पोस्टर दोनों के लिए।",
  cards: [
    {
      title: "Small Poster Sizes",
      icon: "🟦",
      colorTheme: "blue",
      items: [
        { name: "A5", dimsInch: "5.8 × 8.3 in", dimsMm: "148 × 210 mm", useCase: "Flyers, small menus." },
        { name: "A4", dimsInch: "8.3 × 11.7 in", dimsMm: "210 × 297 mm", useCase: "Handouts, posters." },
        { name: "A3", dimsInch: "11.7 × 16.5 in", dimsMm: "297 × 420 mm", useCase: "In-store displays." },
      ]
    },
    {
      title: "Medium Poster Sizes",
      icon: "🟩",
      colorTheme: "green",
      items: [
        { name: "A2", dimsInch: "16.5 × 23.4 in", dimsMm: "420 × 594 mm", useCase: "Shop walls." },
        { name: "12 × 18 in", dimsInch: "12 × 18 in", dimsMm: "305 × 457 mm", useCase: "Small store ads." },
        { name: "Tabloid", dimsInch: "11 × 17 in", dimsMm: "279 × 432 mm", useCase: "Brochures, notices." },
      ]
    },
    {
      title: "Large Poster Sizes",
      icon: "🟧",
      colorTheme: "orange",
      items: [
        { name: "A1", dimsInch: "23.4 × 33.1 in", dimsMm: "594 × 841 mm", useCase: "Event posters." },
        { name: "18 × 24 in", dimsInch: "18 × 24 in", dimsMm: "457 × 610 mm", useCase: "Product ads." },
        { name: "24 × 36 in", dimsInch: "24 × 36 in", dimsMm: "610 × 914 mm", useCase: "Large display posters." },
      ]
    },
    {
      title: "Extra Large Poster Sizes",
      icon: "🟥",
      colorTheme: "red",
      items: [
        { name: "A0", dimsInch: "33.1 × 46.8 in", dimsMm: "841 × 1189 mm", useCase: "Exhibition banners." },
        { name: "36 × 48 in", dimsInch: "36 × 48 in", dimsMm: "914 × 1219 mm", useCase: "Big banners, events." },
      ]
    }
  ],
  note: {
    title: "📌 Quick Note",
    text: "Professional printing के लिए A-series (A0–A5) सबसे प्रसिद्ध हैं। Digital ads के लिए: 1080×1350 px, 1080×1920 px, और 4:5 / 1:1 ratio लोकप्रिय हैं।"
  }
};

const getThemeClasses = (theme: 'blue' | 'green' | 'orange' | 'red') => {
  switch (theme) {
    case 'blue': return 'bg-blue-900/10 border-blue-500/30 text-blue-100';
    case 'green': return 'bg-green-900/10 border-green-500/30 text-green-100';
    case 'orange': return 'bg-orange-900/10 border-orange-500/30 text-orange-100';
    case 'red': return 'bg-red-900/10 border-red-500/30 text-red-100';
    default: return 'bg-gray-800 border-gray-700';
  }
};

const getTitleColor = (theme: 'blue' | 'green' | 'orange' | 'red') => {
  switch (theme) {
    case 'blue': return 'text-blue-400';
    case 'green': return 'text-green-400';
    case 'orange': return 'text-orange-400';
    case 'red': return 'text-red-400';
    default: return 'text-white';
  }
};

const PosterSizes: React.FC = () => {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(id);
      setTimeout(() => setCopied(null), 2000);
    });
  };

  const handleDownloadPlaceholder = (e: React.MouseEvent) => {
    e.preventDefault();
    alert("Download preset functionality coming soon!");
  };

  return (
    <section className="mt-16 border-t border-gray-800 pt-12 animate-fade-in" aria-labelledby="poster-sizes-title">
      <div className="text-center mb-10">
        <h2 id="poster-sizes-title" className="text-3xl font-bold text-white mb-3">
          {posterData.title}
        </h2>
        <p className="text-gray-400 text-lg">
          {posterData.intro}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {posterData.cards.map((card, idx) => (
          <div 
            key={idx}
            className={`rounded-2xl p-6 border transition-all hover:shadow-lg hover:shadow-black/20 ${getThemeClasses(card.colorTheme)}`}
          >
            <h3 className={`text-xl font-bold mb-6 flex items-center gap-2 ${getTitleColor(card.colorTheme)}`}>
              <span aria-hidden="true">{card.icon}</span> {card.title}
            </h3>
            
            <ul className="space-y-6">
              {card.items.map((item, itemIdx) => {
                const uniqueId = `${idx}-${itemIdx}`;
                const copyText = `${item.dimsInch} (${item.dimsMm})`;
                
                return (
                  <li key={itemIdx} className="bg-gray-900/40 rounded-xl p-4 border border-white/5 hover:border-white/10 transition">
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-bold text-white text-lg">{item.name}</span>
                    </div>
                    
                    <div className="text-sm text-gray-300 font-mono mb-2">
                      {item.dimsInch}
                      <br />
                      <span className="text-gray-500">{item.dimsMm}</span>
                    </div>
                    
                    <p className="text-xs text-gray-400 mb-3 italic">
                      {item.useCase}
                    </p>

                    <div className="flex items-center gap-2 mt-3 pt-3 border-t border-white/5">
                      <button
                        onClick={() => handleCopy(copyText, uniqueId)}
                        className="flex-1 flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 text-xs py-2 rounded-md transition border border-gray-700 hover:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                        aria-label={`Copy dimensions for ${item.name}`}
                      >
                        {copied === uniqueId ? (
                           <>
                             <CheckIcon /> Copied
                           </>
                        ) : (
                           <>
                             <CopyIcon /> Copy
                           </>
                        )}
                      </button>
                      
                      <div className="flex gap-1">
                        <button 
                            onClick={handleDownloadPlaceholder}
                            className="p-2 bg-gray-800 hover:bg-gray-700 rounded-md text-gray-400 hover:text-white transition border border-gray-700 hover:border-gray-600"
                            title="Download PNG Preset"
                            aria-label="Download PNG Preset"
                        >
                            <span className="text-[10px] font-bold">PNG</span>
                        </button>
                        <button 
                            onClick={handleDownloadPlaceholder}
                            className="p-2 bg-gray-800 hover:bg-gray-700 rounded-md text-gray-400 hover:text-white transition border border-gray-700 hover:border-gray-600"
                            title="Download SVG Preset"
                            aria-label="Download SVG Preset"
                        >
                             <span className="text-[10px] font-bold">SVG</span>
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-indigo-900/20 border border-indigo-500/30 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center gap-4">
        <div className="bg-indigo-600 p-3 rounded-full shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        </div>
        <div>
            <h4 className="text-xl font-bold text-white mb-2">{posterData.note.title}</h4>
            <p className="text-gray-300 leading-relaxed">
                {posterData.note.text}
            </p>
        </div>
      </div>
    </section>
  );
};

export default PosterSizes;
