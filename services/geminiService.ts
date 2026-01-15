import { GoogleGenAI, Modality } from '@google/genai';
import type { PosterGenerationParams, PosterType } from '../types';

// Helper to convert File to base64
const fileToBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve((reader.result as string).split(',')[1]);
    reader.onerror = (error) => reject(error);
  });

// Helper to fetch image from URL and return base64
const fetchImageAsBase64 = async (url: string): Promise<{ data: string, mimeType: string }> => {
  const response = await fetch(url);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = (reader.result as string).split(',')[1];
      resolve({ data: base64String, mimeType: blob.type });
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

/**
 * Analyzes brand and product visuals using gemini-3-flash-preview.
 */
export const analyzeBrandAndProduct = async (brandName: string, image: File): Promise<string> => {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const imageBase64 = await fileToBase64(image);

    const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: {
            parts: [
                {
                    inlineData: {
                        data: imageBase64,
                        mimeType: image.type
                    }
                },
                {
                    text: `As a world-class Marketing Strategist, Brand Psychologist, and Art Director, conduct a HYPER-DETAILED analysis of the attached image for the brand "${brandName}". 
                    
                    Your goal is to understand the soul of the product and how to manipulate human desire to buy it.
                    
                    Report structure:
                    1. BRAND PSYCHOLOGY & HUMAN INSIGHT: What deep human need does this satisfy?
                    2. VISUAL DNA: Aesthetic, color theory, and lighting strategy.
                    3. THE "MANIPULATION" ANGLE: How to frame this product to make it irresistible.
                    4. TARGET PSYCHOGRAPHICS: Who is the person buying this?
                    5. 15 EXPLOSIVE SLOGANS: Multi-lingual (Hindi/English/Contextual) powerful taglines.
                    6. DESIGN DIRECTIVE: Professional agency-level layout strategy.`
                }
            ]
        }
    });

    return response.text || "Analysis failed. Please try again.";
};

/**
 * Builds the system-style prompt for the ad director.
 */
const buildSystemPrompt = (
    params: PosterGenerationParams,
    imageCount: number, 
    hasLogo: boolean
): string => {
    const { 
        brandName, productName, targetAudience, description, language,
        autoGenerateLogo, posterType, festivalName, 
        contactPhone, website, address, locationUrl 
    } = params;

    const logoInstruction = hasLogo 
        ? "USE THE PROVIDED LOGO IMAGE EXACTLY. Place it subtly but clearly in a premium position (e.g., bottom right or top center)."
        : autoGenerateLogo 
            ? `CREATE A PROFESSIONAL, LUXURY LOGO FOR THE BRAND "${brandName}" from scratch. The logo must be minimalist, modern, and perfectly integrated into the poster's visual hierarchy. It should look like a multi-billion dollar brand's identity.`
            : `Represent "${brandName}" using elegant, high-end typography that matches the overall campaign aesthetic.`;

    const heroInstruction = imageCount > 0
        ? `Use the ${imageCount} provided product photos to create a STYLIZED, artistic "Hero Shot". Do not just paste them; blend them into a cinematic, 8k professional scene.`
        : `GENERATE A WORLD-CLASS HERO VISUAL from scratch based on this insight: "${description}". It must be photorealistic, cinematic, and use "God-ray" lighting or premium studio softbox effects. Focus on ${productName || 'the product'} as the centerpiece.`;

    const campaignBrief = `
**CAMPAIGN BRIEF:**
- Brand: ${brandName}
- Product: ${productName || 'General Brand Identity'}
- Audience: ${targetAudience || 'Premium seeking individuals'}
- Insight/Mood: ${description}
- Language: ${language}
- Strategy: ${posterType === 'Festival' ? `Celebrate ${festivalName}` : 'Professional Market Manipulation'}
`;

    return `
YOU ARE THE WORLD'S BEST ADVERTISING TEAM: A combination of a Global Creative Director, a Master Marketer, a Brand Strategist, and a Consumer Psychologist. 
Your goal is to create a poster so perfect that professional marketers will ask, "How did you get this masterpiece? Who is your agency?"

${campaignBrief}

**MANDATORY LANGUAGE RULE:**
All visible text on the poster (Headlines, Slogans, Descriptions, and Call to Actions) MUST be written in the **${language}** language. Do not use English unless it's for the brand name or technical details.

**CORE MISSION:**
Manipulate people's emotions to build an irresistible desire for this brand. The viewer must feel an instant "must-have" reaction within 3 seconds.

**DESIGN RULES (GOD-TIER STANDARDS):**
1. **VISUAL HIERARCHY:** 1. Hero Visual (Emotion-driven or Product-masterpiece) -> 2. Benefit-driven Headline -> 3. Brand Identity -> 4. Call to Action.
2. **CINEMATIC LIGHTING:** Use advanced photography principles (Rim lighting, shallow depth of field, premium color grading).
3. **PSYCHOLOGICAL TRIGGERS:** Use colors and composition to trigger ${posterType === 'Festival' ? 'belonging, joy, and tradition' : 'aspiration, status, trust, and luxury'}.
4. **CLEANLINESS:** Use generous negative space (White Space). Maximum TWO fonts. No clutter. 

**HEADLINE & SLOGAN:**
- Create a short, legendary headline (3-7 words) in ${language}.
- The headline and slogans must be benefit-driven (e.g., "Silence the World" for headphones).

**ASSETS & LOGISTICS:**
- HERO: ${heroInstruction}
- LOGO: ${logoInstruction}
- CONTACT: ${[contactPhone, website, address].filter(Boolean).join(' | ')} (Format appropriate for ${language} context)
- CALL TO ACTION: Place a clear, high-end CTA in ${language} like "Experience Luxury" or "Own it Today".
- ${locationUrl ? 'Place the provided QR code in a sharp white square with high contrast. Label it "Experience Now" in ' + language + '.' : ''}

**FINAL COMMAND:**
Produce a "Wow" factor ad poster in ${language} that looks like it cost $50,000 in agency fees. Use Gemini 2.5 Flash Image capabilities to their absolute limit. Photorealistic, 8k, professional advertising photography. IF THE VIEWER SEES THIS, THEY MUST BE CONVINCED THIS WAS MADE BY THE WORLD'S BEST MARKETER.
`;
};

/**
 * Generates an ad poster using gemini-2.5-flash-image.
 */
export const generatePoster = async (params: PosterGenerationParams): Promise<string> => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const isEditing = !!params.baseImage;

  const textPrompt = buildSystemPrompt(
      params,
      params.productImages.length, 
      !!params.brandLogo
  );

  const parts: any[] = [];

  // If a base image is provided (for refinement), include it as inlineData
  if (params.baseImage) {
      const base64Data = params.baseImage.split(',')[1]; 
      const mimeType = params.baseImage.substring(params.baseImage.indexOf(':') + 1, params.baseImage.indexOf(';'));
      parts.push({ inlineData: { data: base64Data, mimeType: mimeType } });
  }

  parts.push({ text: textPrompt });

  if (!isEditing) {
      // Include product images as visual context
      for (const file of params.productImages) {
        parts.push({ inlineData: { data: await fileToBase64(file), mimeType: file.type } });
      }
      // Include brand logo if provided
      if (params.brandLogo) {
        parts.push({ inlineData: { data: await fileToBase64(params.brandLogo), mimeType: params.brandLogo.type } });
      }
      // Generate and include a QR code if a location link is provided
      if (params.locationUrl) {
          try {
              const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=600x600&margin=40&data=${encodeURIComponent(params.locationUrl)}`;
              const qrData = await fetchImageAsBase64(qrApiUrl);
              parts.push({ inlineData: { data: qrData.data, mimeType: qrData.mimeType } });
          } catch (e) {
              console.warn("QR failed", e);
          }
      }
  }

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: { parts },
    config: {
      // For image generation via generateContent, we only specify imageConfig
      imageConfig: { aspectRatio: params.aspectRatio }
    },
  });

  // Iterate through parts to find the generated image
  const firstPart = response.candidates?.[0]?.content?.parts?.find(p => 'inlineData' in p);
  if (firstPart && 'inlineData' in firstPart && firstPart.inlineData) {
    return `data:${firstPart.inlineData.mimeType};base64,${firstPart.inlineData.data}`;
  }

  throw new Error('Art direction failed. Our creative team recommends refining the campaign brief.');
};
