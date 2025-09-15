// Enhanced Cloudinary utilities with advanced features

import type {
  CloudinaryTransformation,
  CloudinaryImageProps,
  ResponsiveImageConfig,
  PresetName,
  CloudinaryPreset
} from './cloudinary-types';

// Environment configuration
const CLOUDINARY_CLOUD_NAME = import.meta.env.PUBLIC_CLOUDINARY_CLOUD_NAME || 'demo';
const BASE_URL = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload`;

// Predefined presets for vacation rental website
export const VacationRentalPresets: Record<string, CloudinaryPreset> = {
  hero: {
    name: 'hero',
    transformation: {
      width: 1920,
      height: 1080,
      crop: 'fill',
      gravity: 'auto',
      quality: 'auto:good',
      format: 'auto',
      dpr: 'auto'
    },
    description: 'Full-screen hero images with optimal quality'
  },

  gallery: {
    name: 'gallery',
    transformation: {
      width: 800,
      height: 600,
      crop: 'fill',
      gravity: 'auto',
      quality: 'auto:good',
      format: 'auto',
      dpr: 'auto'
    },
    description: 'Property gallery images with balanced quality and size'
  },

  thumbnail: {
    name: 'thumbnail',
    transformation: {
      width: 400,
      height: 300,
      crop: 'fill',
      gravity: 'auto',
      quality: 'auto:eco',
      format: 'auto',
      dpr: 'auto'
    },
    description: 'Small thumbnails for cards and previews'
  },

  avatar: {
    name: 'avatar',
    transformation: {
      width: 128,
      height: 128,
      crop: 'fill',
      gravity: 'face',
      quality: 'auto:good',
      format: 'auto',
      radius: 'max',
      dpr: 'auto'
    },
    description: 'Circular avatars for user profiles'
  },

  mobile: {
    name: 'mobile',
    transformation: {
      width: 768,
      height: 576,
      crop: 'fill',
      gravity: 'auto',
      quality: 'auto:good',
      format: 'auto',
      dpr: 'auto'
    },
    description: 'Mobile-optimized images'
  },

  amenityCard: {
    name: 'amenityCard',
    transformation: {
      width: 600,
      height: 400,
      crop: 'fill',
      gravity: 'auto',
      quality: 'auto:good',
      format: 'auto',
      radius: 16,
      dpr: 'auto'
    },
    description: 'Amenity showcase cards with rounded corners'
  },

  blogThumbnail: {
    name: 'blogThumbnail',
    transformation: {
      width: 480,
      height: 320,
      crop: 'fill',
      gravity: 'auto',
      quality: 'auto:eco',
      format: 'auto',
      dpr: 'auto'
    },
    description: 'Blog post thumbnails and previews'
  }
};

/**
 * Convert transformation object to Cloudinary URL parameters
 */
export function transformationToParams(transformation: CloudinaryTransformation): string {
  const params: string[] = [];

  // Resize parameters
  if (transformation.width) params.push(`w_${transformation.width}`);
  if (transformation.height) params.push(`h_${transformation.height}`);
  if (transformation.crop) params.push(`c_${transformation.crop}`);

  // Quality and format
  if (transformation.quality) params.push(`q_${transformation.quality}`);
  if (transformation.format) params.push(`f_${transformation.format}`);

  // Positioning and gravity
  if (transformation.gravity) params.push(`g_${transformation.gravity}`);

  // Effects and adjustments
  if (transformation.effect) params.push(`e_${transformation.effect}`);
  if (transformation.radius !== undefined) params.push(`r_${transformation.radius}`);
  if (transformation.border) params.push(`bo_${transformation.border}`);
  if (transformation.angle) params.push(`a_${transformation.angle}`);
  if (transformation.opacity !== undefined) params.push(`o_${transformation.opacity}`);

  // Overlays and underlays
  if (transformation.overlay) params.push(`l_${transformation.overlay}`);
  if (transformation.underlay) params.push(`u_${transformation.underlay}`);

  // Device pixel ratio
  if (transformation.dpr) params.push(`dpr_${transformation.dpr}`);

  // Flags
  if (transformation.flags && transformation.flags.length > 0) {
    params.push(`fl_${transformation.flags.join('.')}`);
  }

  // Raw transformation string (for advanced cases)
  if (transformation.rawTransformation) {
    params.push(transformation.rawTransformation);
  }

  return params.join(',');
}

/**
 * Generate optimized Cloudinary URL
 */
export function generateCloudinaryUrl(
  publicId: string,
  transformation?: CloudinaryTransformation
): string {
  if (!publicId) {
    throw new Error('publicId is required for Cloudinary URL generation');
  }

  // Default transformation for optimal performance
  const defaultTransformation: CloudinaryTransformation = {
    quality: 'auto:good',
    format: 'auto',
    dpr: 'auto'
  };

  const finalTransformation = { ...defaultTransformation, ...transformation };
  const params = transformationToParams(finalTransformation);

  return params ? `${BASE_URL}/${params}/${publicId}` : `${BASE_URL}/${publicId}`;
}

/**
 * Generate responsive srcset for multiple device sizes
 */
export function generateResponsiveSrcSet(
  publicId: string,
  config: ResponsiveImageConfig,
  baseTransformation?: CloudinaryTransformation
): { src: string; srcset: string; sizes: string } {
  const { breakpoints, sizes, devicePixelRatio = [1, 2] } = config;

  // Generate URLs for all breakpoint and DPR combinations
  const srcsetEntries: string[] = [];

  breakpoints.forEach(width => {
    devicePixelRatio.forEach(dpr => {
      const transformation: CloudinaryTransformation = {
        ...baseTransformation,
        width: Math.round(width * dpr),
        dpr: 1 // Set to 1 since we're manually calculating
      };

      const url = generateCloudinaryUrl(publicId, transformation);
      const descriptor = dpr === 1 ? `${width}w` : `${width}w ${dpr}x`;
      srcsetEntries.push(`${url} ${descriptor}`);
    });
  });

  // Generate main src (largest breakpoint at 1x)
  const mainWidth = Math.max(...breakpoints);
  const mainTransformation: CloudinaryTransformation = {
    ...baseTransformation,
    width: mainWidth
  };
  const src = generateCloudinaryUrl(publicId, mainTransformation);

  return {
    src,
    srcset: srcsetEntries.join(', '),
    sizes
  };
}

/**
 * Generate URL using predefined preset
 */
export function generatePresetUrl(publicId: string, presetName: PresetName): string {
  const preset = VacationRentalPresets[presetName];
  if (!preset) {
    throw new Error(`Unknown preset: ${presetName}`);
  }

  return generateCloudinaryUrl(publicId, preset.transformation);
}

/**
 * Generate placeholder image URL (blurred, low quality)
 */
export function generatePlaceholderUrl(
  publicId: string,
  width: number = 40,
  height?: number
): string {
  const transformation: CloudinaryTransformation = {
    width,
    height: height || Math.round(width * 0.75), // Default 4:3 aspect ratio
    crop: 'fill',
    quality: 'auto:low',
    format: 'auto',
    effect: 'blur:300'
  };

  return generateCloudinaryUrl(publicId, transformation);
}

/**
 * Generate error fallback image URL
 */
export function generateErrorFallbackUrl(width: number = 400, height: number = 300): string {
  // Using a generic placeholder service or a default image from your Cloudinary account
  const transformation: CloudinaryTransformation = {
    width,
    height,
    crop: 'fill',
    quality: 'auto:eco',
    format: 'auto'
  };

  // You can replace this with a specific error image from your Cloudinary account
  return generateCloudinaryUrl('placeholder-error', transformation);
}

/**
 * Validate image URL and return optimization suggestions
 */
export function validateAndOptimize(
  publicId: string,
  transformation?: CloudinaryTransformation
): {
  isValid: boolean;
  optimized: CloudinaryTransformation;
  suggestions: string[];
} {
  const suggestions: string[] = [];
  const optimized: CloudinaryTransformation = { ...transformation };

  // Check for basic optimizations
  if (!optimized.quality) {
    optimized.quality = 'auto:good';
    suggestions.push('Added auto quality optimization');
  }

  if (!optimized.format) {
    optimized.format = 'auto';
    suggestions.push('Added auto format optimization');
  }

  if (!optimized.dpr) {
    optimized.dpr = 'auto';
    suggestions.push('Added auto device pixel ratio');
  }

  // Check for common issues
  if (optimized.width && optimized.width > 3000) {
    suggestions.push('Consider reducing width for better performance');
  }

  if (optimized.quality === 100) {
    suggestions.push('Quality of 100 may result in large file sizes');
  }

  return {
    isValid: !!publicId,
    optimized,
    suggestions
  };
}

/**
 * Preload critical images
 */
export function preloadImage(url: string, as: 'image' = 'image'): void {
  if (typeof document !== 'undefined') {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = as;
    link.href = url;
    document.head.appendChild(link);
  }
}

/**
 * Get image dimensions and basic info from Cloudinary
 */
export async function getImageDimensions(publicId: string): Promise<{
  width: number;
  height: number;
  format: string;
  bytes: number;
} | null> {
  try {
    // Use Cloudinary's info endpoint
    const infoUrl = `${BASE_URL}/q_auto,f_json/${publicId}`;
    const response = await fetch(infoUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch image info: ${response.status}`);
    }

    const data = await response.json();
    return {
      width: data.width,
      height: data.height,
      format: data.format,
      bytes: data.bytes
    };
  } catch (error) {
    console.warn('Failed to get image dimensions:', error);
    return null;
  }
}

/**
 * Get image metadata including tags from Cloudinary Admin API
 * Note: Requires API credentials for server-side use only
 */
export async function getImageMetadata(publicId: string): Promise<{
  public_id: string;
  tags: string[];
  context?: Record<string, any>;
  metadata?: Record<string, any>;
  width: number;
  height: number;
  format: string;
  bytes: number;
  created_at: string;
  folder?: string;
} | null> {
  try {
    // This would require server-side implementation with API credentials
    // For client-side, we can only get basic info from the delivery URL
    console.warn('getImageMetadata requires server-side implementation with Cloudinary Admin API');
    return null;
  } catch (error) {
    console.warn('Failed to get image metadata:', error);
    return null;
  }
}

/**
 * Search images by tags (server-side only)
 * Note: Requires Cloudinary Admin API credentials
 */
export async function searchImagesByTag(tag: string): Promise<string[] | null> {
  try {
    // This would require server-side implementation
    console.warn('searchImagesByTag requires server-side implementation with Cloudinary Admin API');
    return null;
  } catch (error) {
    console.warn('Failed to search images by tag:', error);
    return null;
  }
}

/**
 * Get images by folder path
 */
export async function getImagesByFolder(folderPath: string): Promise<string[]> {
  try {
    // For basic folder listing, we can construct likely public IDs
    // This is a simplified approach - for full functionality, use Admin API
    const commonImageNames = [
      'hero-exterior',
      'living-room',
      'kitchen',
      'master-bedroom',
      'bedroom-2',
      'bedroom-3',
      'theater-room',
      'koi-pond',
      'dining-area',
      'patio'
    ];

    return commonImageNames.map(name => `${folderPath}/${name}`);
  } catch (error) {
    console.warn('Failed to get images by folder:', error);
    return [];
  }
}

/**
 * Calculate optimal breakpoints based on image dimensions
 */
export function calculateOptimalBreakpoints(
  originalWidth: number,
  maxBreakpoints: number = 6
): number[] {
  const minWidth = 320; // Minimum mobile width
  const maxWidth = Math.min(originalWidth, 1920); // Cap at 1920px

  if (maxWidth <= minWidth) {
    return [minWidth];
  }

  const breakpoints: number[] = [];
  const step = (maxWidth - minWidth) / (maxBreakpoints - 1);

  for (let i = 0; i < maxBreakpoints; i++) {
    const width = Math.round(minWidth + (step * i));
    breakpoints.push(width);
  }

  // Ensure we include the original width if it's reasonable
  if (originalWidth <= 1920 && !breakpoints.includes(originalWidth)) {
    breakpoints.push(originalWidth);
    breakpoints.sort((a, b) => a - b);
  }

  return breakpoints;
}

// VacationRentalPresets exported above

// Export commonly used responsive configurations
export const ResponsiveConfigs = {
  hero: {
    breakpoints: [768, 1024, 1280, 1536, 1920],
    sizes: '100vw'
  },
  gallery: {
    breakpoints: [400, 600, 800, 1200],
    sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
  },
  card: {
    breakpoints: [300, 400, 600],
    sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw'
  },
  fullWidth: {
    breakpoints: [768, 1024, 1280, 1536, 1920],
    sizes: '100vw'
  },
  halfWidth: {
    breakpoints: [400, 600, 800, 1200],
    sizes: '(max-width: 768px) 100vw, 50vw'
  }
};