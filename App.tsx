import React, { useState, useCallback } from 'react';
import { generatePoster, analyzeBrandAndProduct } from './services/geminiService';
import type { SizeOption, PosterType } from './types';
import InputForm from './components/InputForm';
import PosterDisplay from './components/PosterDisplay';
import Header from './components/Header';
import SizeSelector from './components/SizeSelector';
import AnalysisResult from './components/AnalysisResult';

const App: React.FC = () => {
  const [selectedSize, setSelectedSize] = useState<SizeOption | null>(null);

  const [posterType, setPosterType] = useState<PosterType>('Professional');
  const [festivalName, setFestivalName] = useState<string>('');

  const [brandName, setBrandName] = useState<string>('');
  const [productName, setProductName] = useState<string>('');
  const [targetAudience, setTargetAudience] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [language, setLanguage] = useState<string>('English');
  
  // Contact Fields
  const [contactPhone, setContactPhone] = useState<string>('');
  const [website, setWebsite] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [locationUrl, setLocationUrl] = useState<string>('');

  const [productImages, setProductImages] = useState<File[]>([]);
  const [productUrl, setProductUrl] = useState<string>('');
  const [brandLogo, setBrandLogo] = useState<File | null>(null);
  const [autoGenerateLogo, setAutoGenerateLogo] = useState<boolean>(true);

  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const performGeneration = async (isUpdate: boolean) => {
    if (!brandName || !description) {
      setError('Brand Name and Campaign Insight are required to build your world-class ad.');
      return;
    }
    if (posterType === 'Festival' && !festivalName.trim()) {
      setError('Please specify the festival name for thematic accuracy.');
      return;
    }
    if (!selectedSize) {
      setError('Please select a target format.');
      return;
    }

    setError(null);
    setIsLoading(true);
    if (!isUpdate) setGeneratedImage(null);

    try {
      const result = await generatePoster({
        brandName,
        productName: productName.trim() || undefined,
        targetAudience: targetAudience.trim() || undefined,
        description,
        language,
        productImages,
        productUrl,
        brandLogo,
        autoGenerateLogo,
        aspectRatio: selectedSize.aspectRatio,
        posterType,
        festivalName: posterType === 'Festival' ? festivalName : undefined,
        contactPhone: contactPhone.trim() || undefined,
        website: website.trim() || undefined,
        address: address.trim() || undefined,
        locationUrl: locationUrl.trim() || undefined,
        baseImage: isUpdate && generatedImage ? generatedImage : undefined
      });
      setGeneratedImage(result);
    } catch (err) {
      setError('Artistic rendering failed. Our creative director recommends checking the brief or your API key.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnalyze = async () => {
      if (!brandName || productImages.length === 0) {
          setError('Strategic Analysis requires a Brand Name and a Product Image to analyze Visual DNA.');
          return;
      }
      setError(null);
      setIsAnalyzing(true);
      setAnalysisResult(null);
      try {
          const result = await analyzeBrandAndProduct(brandName, productImages[0]);
          setAnalysisResult(result);
      } catch (err) {
          setError('Strategic analysis failed. Please ensure your image is valid.');
      } finally {
          setIsAnalyzing(false);
      }
  };

  const handleSubmit = useCallback(() => performGeneration(false), [
      brandName, productName, targetAudience, description, language, productImages, productUrl, brandLogo, autoGenerateLogo, selectedSize, posterType, festivalName, contactPhone, website, address, locationUrl
  ]);

  const handleUpdateText = useCallback(() => performGeneration(true), [
      brandName, productName, targetAudience, description, language, productImages, productUrl, brandLogo, autoGenerateLogo, selectedSize, posterType, festivalName, contactPhone, website, address, locationUrl, generatedImage
  ]);

  const handleReset = () => {
    setBrandName('');
    setProductName('');
    setTargetAudience('');
    setDescription('');
    setLanguage('English');
    setProductImages([]);
    setProductUrl('');
    setBrandLogo(null);
    setAutoGenerateLogo(true);
    setPosterType('Professional');
    setFestivalName('');
    setContactPhone('');
    setWebsite('');
    setAddress('');
    setLocationUrl('');
    setGeneratedImage(null);
    setAnalysisResult(null);
    setError(null);
    setIsLoading(false);
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-8 space-y-16">
        {!selectedSize ? (
          <SizeSelector onSelect={setSelectedSize} />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start animate-fade-in">
            <div className="space-y-8">
                <InputForm
                    brandName={brandName}
                    setBrandName={setBrandName}
                    productName={productName}
                    setProductName={setProductName}
                    targetAudience={targetAudience}
                    setTargetAudience={setTargetAudience}
                    description={description}
                    setDescription={setDescription}
                    language={language}
                    setLanguage={setLanguage}
                    contactPhone={contactPhone}
                    setContactPhone={setContactPhone}
                    website={website}
                    setWebsite={setWebsite}
                    address={address}
                    setAddress={setAddress}
                    locationUrl={locationUrl}
                    setLocationUrl={setLocationUrl}
                    productImages={productImages}
                    setProductImages={setProductImages}
                    productUrl={productUrl}
                    setProductUrl={setProductUrl}
                    brandLogo={brandLogo}
                    setBrandLogo={setBrandLogo}
                    autoGenerateLogo={autoGenerateLogo}
                    setAutoGenerateLogo={setAutoGenerateLogo}
                    posterType={posterType}
                    setPosterType={setPosterType}
                    festivalName={festivalName}
                    setFestivalName={setFestivalName}
                    isLoading={isLoading}
                    isAnalyzing={isAnalyzing}
                    onSubmit={handleSubmit}
                    onUpdateText={handleUpdateText}
                    onAnalyze={handleAnalyze}
                    hasGeneratedImage={!!generatedImage}
                    onReset={handleReset}
                    selectedSize={selectedSize}
                    onChangeSize={() => setSelectedSize(null)}
                />
                {analysisResult && (
                    <AnalysisResult 
                        brandName={brandName} 
                        result={analysisResult} 
                        onClose={() => setAnalysisResult(null)} 
                    />
                )}
            </div>
            <PosterDisplay
              generatedImage={generatedImage}
              isLoading={isLoading}
              error={error}
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
