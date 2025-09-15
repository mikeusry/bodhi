import { Cloudinary } from '@cloudinary/url-gen';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { format, quality } from '@cloudinary/url-gen/actions/delivery';

// Initialize Cloudinary instance
const cld = new Cloudinary({
  cloud: {
    cloudName: import.meta.env.PUBLIC_CLOUDINARY_CLOUD_NAME
  }
});

// Image transformation presets for vacation rental website
export const imagePresets = {
  hero: {
    width: 1920,
    height: 1080,
    crop: 'fill',
    gravity: 'auto',
    quality: 'auto:good',
    format: 'auto'
  },
  gallery: {
    width: 800,
    height: 600,
    crop: 'fill',
    gravity: 'auto',
    quality: 'auto:good',
    format: 'auto'
  },
  thumbnail: {
    width: 400,
    height: 300,
    crop: 'fill',
    gravity: 'auto',
    quality: 'auto:eco',
    format: 'auto'
  },
  mobile: {
    width: 768,
    height: 576,
    crop: 'fill',
    gravity: 'auto',
    quality: 'auto:good',
    format: 'auto'
  }
};

// Helper function to generate optimized image URL
export function getOptimizedImageUrl(
  publicId: string,
  preset: keyof typeof imagePresets = 'gallery'
) {
  const config = imagePresets[preset];

  const image = cld.image(publicId);

  // Apply transformations
  image.resize(auto().width(config.width).height(config.height));
  image.addTransformation(`g_auto`); // gravity auto
  image.delivery(format('auto'));
  image.delivery(quality('auto:good'));

  return image.toURL();
}

// Generate responsive srcset for images
export function generateResponsiveSrcSet(publicId: string, sizes: number[]) {
  return sizes
    .map(size => {
      const image = cld.image(publicId);
      image.resize(auto().width(size));
      image.addTransformation(`g_auto`); // gravity auto
      image.delivery(format('auto'));
      image.delivery(quality('auto:good'));
      const url = image.toURL();
      return `${url} ${size}w`;
    })
    .join(', ');
}

// Property-specific image transformations
export const propertyImageTransforms = {
  // Hero images for homepage
  heroMain: (publicId: string) => getOptimizedImageUrl(publicId, 'hero'),

  // Property gallery images
  galleryImage: (publicId: string) => getOptimizedImageUrl(publicId, 'gallery'),

  // Thumbnail for cards and previews
  cardThumbnail: (publicId: string) => getOptimizedImageUrl(publicId, 'thumbnail'),

  // Mobile-optimized images
  mobileHero: (publicId: string) => getOptimizedImageUrl(publicId, 'mobile'),

  // Generate responsive image with multiple sizes
  responsiveImage: (publicId: string) => ({
    src: getOptimizedImageUrl(publicId, 'gallery'),
    srcset: generateResponsiveSrcSet(publicId, [400, 600, 800, 1200, 1600]),
    sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
  })
};

export default cld;