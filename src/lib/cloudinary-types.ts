// Comprehensive TypeScript types for Cloudinary transformations

export type CloudinaryFormat = 'auto' | 'jpg' | 'png' | 'webp' | 'avif' | 'gif' | 'svg';

export type CloudinaryQuality =
  | 'auto'
  | 'auto:best'
  | 'auto:good'
  | 'auto:eco'
  | 'auto:low'
  | number;

export type CloudinaryGravity =
  | 'auto'
  | 'center'
  | 'north'
  | 'south'
  | 'east'
  | 'west'
  | 'north_east'
  | 'north_west'
  | 'south_east'
  | 'south_west'
  | 'face'
  | 'faces'
  | 'face:center'
  | 'face:auto'
  | 'faces:center'
  | 'faces:auto'
  | 'body'
  | 'body:face'
  | 'custom'
  | 'custom:face'
  | 'custom:faces'
  | 'custom:adv_face'
  | 'custom:adv_faces'
  | 'auto:subject';

export type CloudinaryCrop =
  | 'scale'
  | 'fit'
  | 'mfit'
  | 'fill'
  | 'lfill'
  | 'fill_pad'
  | 'crop'
  | 'thumb'
  | 'imagga_crop'
  | 'imagga_scale'
  | 'auto'
  | 'limit'
  | 'pad'
  | 'lpad'
  | 'mpad';

export type CloudinaryEffect =
  | 'art:al_dente'
  | 'art:athena'
  | 'art:audrey'
  | 'art:aurora'
  | 'art:daguerre'
  | 'art:eucalyptus'
  | 'art:fes'
  | 'art:frost'
  | 'art:hairspray'
  | 'art:hokusai'
  | 'art:incognito'
  | 'art:linen'
  | 'art:peacock'
  | 'art:primavera'
  | 'art:quartz'
  | 'art:red_rock'
  | 'art:refresh'
  | 'art:sizzle'
  | 'art:sonnet'
  | 'art:ukulele'
  | 'art:zorro'
  | 'blur'
  | 'brightness'
  | 'contrast'
  | 'gamma'
  | 'grayscale'
  | 'hue'
  | 'improve'
  | 'modulate'
  | 'negate'
  | 'oil_paint'
  | 'saturation'
  | 'sepia'
  | 'shadow'
  | 'sharpen'
  | 'unsharp_mask'
  | 'vibrance'
  | 'vignette';

export interface CloudinaryTransformation {
  width?: number;
  height?: number;
  crop?: CloudinaryCrop;
  gravity?: CloudinaryGravity;
  quality?: CloudinaryQuality;
  format?: CloudinaryFormat;
  effect?: CloudinaryEffect | string;
  radius?: number | string;
  border?: string;
  angle?: number;
  opacity?: number;
  overlay?: string;
  underlay?: string;
  fetch_format?: CloudinaryFormat;
  dpr?: number | 'auto';
  flags?: string[];
  rawTransformation?: string;
}

export interface ResponsiveImageConfig {
  breakpoints: number[];
  sizes: string;
  maxWidth?: number;
  devicePixelRatio?: number[];
}

export interface CloudinaryImageProps {
  publicId: string;
  alt: string;
  transformation?: CloudinaryTransformation;
  responsive?: boolean | ResponsiveImageConfig;
  loading?: 'lazy' | 'eager';
  priority?: boolean;
  placeholder?: boolean | string;
  errorFallback?: string;
  onLoad?: () => void;
  onError?: () => void;
  className?: string;
  style?: Record<string, any>;
  width?: number;
  height?: number;
  // Astro-specific props
  'data-testid'?: string;
  id?: string;
}

export interface CloudinaryPreset {
  name: string;
  transformation: CloudinaryTransformation;
  description?: string;
}

// Predefined presets are now defined in cloudinary-enhanced.ts to avoid circular imports
export type PresetName = 'hero' | 'gallery' | 'thumbnail' | 'avatar' | 'mobile' | 'amenityCard' | 'blogThumbnail';

// Helper type for component factory
export interface ComponentConfig {
  defaultTransformation?: CloudinaryTransformation;
  className?: string;
  containerClassName?: string;
  aspectRatio?: string;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
}