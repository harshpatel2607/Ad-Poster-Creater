export type AspectRatio = '1:1' | '3:4' | '4:3' | '9:16' | '16:9';

export type PosterType = 'Professional' | 'Festival';

export interface SizeOption {
  id: string;
  title: string;
  dimensions: string;
  aspectRatio: AspectRatio;
  iconType: 'square' | 'portrait' | 'landscape' | 'tall' | 'wide';
  description: string;
}

export interface PosterGenerationParams {
    brandName: string;
    productName?: string;
    targetAudience?: string;
    description: string;
    language: string;
    productImages: File[];
    productUrl?: string;
    brandLogo?: File | null;
    autoGenerateLogo: boolean;
    aspectRatio: AspectRatio;
    posterType: PosterType;
    festivalName?: string;
    contactPhone?: string;
    website?: string;
    address?: string;
    locationUrl?: string;
    baseImage?: string; // base64 string for editing existing poster
}
