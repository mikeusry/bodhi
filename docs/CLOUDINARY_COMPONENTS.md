# Cloudinary Components Documentation

Comprehensive documentation for the enhanced Cloudinary image components built for the Highlands NC Vacation Rental website.

## Table of Contents

- [Overview](#overview)
- [Components](#components)
  - [CloudinaryImageEnhanced](#cloudinaryimageenhanced)
  - [CloudinaryHero](#cloudinaryhero)
  - [CloudinaryAvatar](#cloudinaryavatar)
  - [CloudinaryGallery](#cloudinarygallery)
- [Integration Examples](#integration-examples)
- [Performance Best Practices](#performance-best-practices)
- [TypeScript Support](#typescript-support)
- [Troubleshooting](#troubleshooting)

## Overview

This component library provides production-ready Cloudinary image components with advanced features:

- ✅ **Performance Optimized**: Intersection Observer lazy loading, responsive images, format optimization
- ✅ **Developer Friendly**: Full TypeScript support, preset configurations, error handling
- ✅ **Accessible**: ARIA labels, keyboard navigation, reduced motion support
- ✅ **Brand Consistent**: Pre-configured for vacation rental use cases

### Configuration

Set up your environment variables:

```env
PUBLIC_CLOUDINARY_CLOUD_NAME=southland-organics
```

## Components

### CloudinaryImageEnhanced

The foundational component with all advanced features.

#### Props

```typescript
interface CloudinaryImageProps {
  publicId: string;              // Required: Cloudinary public ID
  alt: string;                   // Required: Alt text for accessibility
  preset?: PresetName;           // Optional: Use predefined preset
  transformation?: CloudinaryTransformation;
  responsive?: boolean | ResponsiveImageConfig;
  loading?: 'lazy' | 'eager';
  priority?: boolean;            // Preload for critical images
  placeholder?: boolean | string;
  blurPlaceholder?: boolean;     // Blur effect while loading
  fadeIn?: boolean;              // Smooth fade-in animation
  errorFallback?: string;        // Custom error image
  className?: string;
  containerClassName?: string;
  aspectRatio?: string;          // CSS aspect-ratio
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  sizes?: string;                // Responsive sizes attribute
  intersectionThreshold?: number; // Lazy loading threshold
  intersectionRootMargin?: string;
  onLoad?: () => void;
  onError?: () => void;
}
```

#### Basic Usage

```astro
---
import CloudinaryImageEnhanced from '../components/ui/CloudinaryImageEnhanced.astro';
---

<!-- Simple image -->
<CloudinaryImageEnhanced
  publicId="banyan_tree/flat_mountain/living-room"
  alt="Spacious living room with mountain views"
  className="rounded-lg shadow-md"
/>

<!-- With preset -->
<CloudinaryImageEnhanced
  publicId="banyan_tree/flat_mountain/bedroom"
  alt="Master bedroom"
  preset="gallery"
  responsive={true}
/>

<!-- Custom transformation -->
<CloudinaryImageEnhanced
  publicId="banyan_tree/flat_mountain/kitchen"
  alt="Modern kitchen"
  transformation={{
    width: 800,
    height: 600,
    crop: 'fill',
    effect: 'improve'
  }}
/>
```

#### Advanced Configuration

```astro
<!-- Responsive with custom breakpoints -->
<CloudinaryImageEnhanced
  publicId="banyan_tree/flat_mountain/exterior"
  alt="Property exterior"
  responsive={{
    breakpoints: [400, 800, 1200, 1600],
    sizes: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  }}
  aspectRatio="16/9"
  priority={true}
  fadeIn={true}
  blurPlaceholder={true}
/>
```

### CloudinaryHero

Specialized component for hero sections with viewport optimization.

#### Props

```typescript
interface CloudinaryHeroProps {
  publicId: string;
  mobilePublicId?: string;       // Different image for mobile
  alt: string;
  overlay?: boolean;             // Dark overlay for text readability
  overlayOpacity?: number;       // 0-1
  overlayColor?: string;         // Tailwind class
  minHeight?: string;            // CSS height value
  maxHeight?: string;
  objectPosition?: string;       // CSS object-position
  parallax?: boolean;            // Parallax scroll effect
  priority?: boolean;            // Default: true
  className?: string;
  containerClassName?: string;
}
```

#### Usage Examples

```astro
---
import CloudinaryHero from '../components/ui/CloudinaryHero.astro';
---

<!-- Basic hero -->
<CloudinaryHero
  publicId="banyan_tree/flat_mountain/hero-exterior_rdyocb"
  alt="Flat Mountain Estates exterior"
  minHeight="100vh"
>
  <div class="text-center text-white">
    <h1 class="text-6xl font-anamortee mb-4">Flat Mountain Estates</h1>
    <p class="text-xl mb-8">Luxury Mountain Retreat</p>
    <a href="/book" class="bg-felted-green px-8 py-4 rounded-md">Book Now</a>
  </div>
</CloudinaryHero>

<!-- With mobile optimization -->
<CloudinaryHero
  publicId="banyan_tree/flat_mountain/hero-wide"
  mobilePublicId="banyan_tree/flat_mountain/hero-mobile"
  alt="Mountain view from property"
  overlay={true}
  overlayOpacity={0.3}
  parallax={true}
  objectPosition="center top"
>
  <slot />
</CloudinaryHero>
```

### CloudinaryAvatar

Perfect for user profiles and staff photos.

#### Props

```typescript
interface CloudinaryAvatarProps {
  publicId: string;
  alt: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | number;
  border?: boolean;
  borderColor?: string;
  fallbackInitials?: string;     // Show initials if image fails
  fallbackBg?: string;           // Background color for initials
  className?: string;
  priority?: boolean;
  onClick?: string;              // JavaScript function name
}
```

#### Usage Examples

```astro
---
import CloudinaryAvatar from '../components/ui/CloudinaryAvatar.astro';
---

<!-- Staff member avatar -->
<CloudinaryAvatar
  publicId="staff/john-manager"
  alt="John Smith, Property Manager"
  size="lg"
  border={true}
  borderColor="white"
/>

<!-- With fallback initials -->
<CloudinaryAvatar
  publicId="guests/guest-photo"
  alt="Guest photo"
  size="md"
  fallbackInitials="JS"
  fallbackBg="bg-brook-blue"
/>

<!-- Custom size with click handler -->
<CloudinaryAvatar
  publicId="staff/sarah-concierge"
  alt="Sarah Johnson, Concierge"
  size={96}
  onClick="showStaffDetails"
  className="hover:shadow-lg transition-shadow"
/>
```

### CloudinaryGallery

Feature-rich gallery component with multiple layout options.

#### Props

```typescript
interface CloudinaryGalleryProps {
  images: GalleryImage[];
  layout?: 'grid' | 'masonry' | 'carousel';
  columns?: 2 | 3 | 4 | 5 | 6;
  aspectRatio?: string;
  spacing?: 'none' | 'sm' | 'md' | 'lg';
  lightbox?: boolean;
  captions?: boolean;
  lazy?: boolean;
  className?: string;
  imageClassName?: string;
  onImageClick?: string;         // Custom click handler
}

interface GalleryImage {
  publicId: string;
  alt: string;
  caption?: string;
  transformation?: CloudinaryTransformation;
}
```

#### Usage Examples

```astro
---
import CloudinaryGallery from '../components/ui/CloudinaryGallery.astro';

const propertyImages = [
  {
    publicId: 'banyan_tree/flat_mountain/living-room',
    alt: 'Spacious living room',
    caption: 'Open concept living space with mountain views'
  },
  {
    publicId: 'banyan_tree/flat_mountain/kitchen',
    alt: 'Modern kitchen',
    caption: 'Fully equipped gourmet kitchen'
  },
  {
    publicId: 'banyan_tree/flat_mountain/master-bedroom',
    alt: 'Master bedroom',
    caption: 'King size bed with premium linens'
  }
];
---

<!-- Property gallery -->
<CloudinaryGallery
  images={propertyImages}
  layout="grid"
  columns={3}
  aspectRatio="4/3"
  lightbox={true}
  captions={true}
  className="my-8"
/>

<!-- Masonry layout -->
<CloudinaryGallery
  images={propertyImages}
  layout="masonry"
  spacing="md"
  lightbox={true}
/>

<!-- Mobile-friendly carousel -->
<CloudinaryGallery
  images={propertyImages}
  layout="carousel"
  lightbox={true}
  className="md:hidden"
/>
```

## Integration Examples

### Property Detail Page

```astro
---
import CloudinaryHero from '../components/ui/CloudinaryHero.astro';
import CloudinaryGallery from '../components/ui/CloudinaryGallery.astro';
import CloudinaryImageEnhanced from '../components/ui/CloudinaryImageEnhanced.astro';

const amenityImages = [
  { publicId: 'banyan_tree/flat_mountain/hot-tub', alt: 'Private hot tub' },
  { publicId: 'banyan_tree/flat_mountain/fire-pit', alt: 'Outdoor fire pit' },
  { publicId: 'banyan_tree/flat_mountain/deck', alt: 'Wraparound deck' }
];
---

<!-- Hero section -->
<CloudinaryHero
  publicId="banyan_tree/flat_mountain/hero-exterior_rdyocb"
  alt="Flat Mountain Estates"
  overlay={true}
  overlayOpacity={0.4}
>
  <div class="text-center text-white max-w-4xl">
    <h1 class="text-6xl font-anamortee mb-4">Your Mountain Retreat</h1>
    <p class="text-xl">Experience luxury in the heart of Highlands, NC</p>
  </div>
</CloudinaryHero>

<!-- Property gallery -->
<section class="py-16">
  <div class="max-w-7xl mx-auto px-4">
    <h2 class="text-3xl font-anamortee text-center mb-8">Interior & Amenities</h2>
    <CloudinaryGallery
      images={amenityImages}
      layout="grid"
      columns={3}
      lightbox={true}
      captions={true}
    />
  </div>
</section>

<!-- Individual feature showcase -->
<section class="py-16 bg-canvas-50">
  <div class="max-w-7xl mx-auto px-4">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div>
        <h3 class="text-2xl font-semibold mb-4">Gourmet Kitchen</h3>
        <p class="text-granite-600 leading-relaxed">
          Prepare meals in style with our fully equipped gourmet kitchen featuring
          premium appliances, granite countertops, and everything you need for
          your mountain getaway.
        </p>
      </div>
      <CloudinaryImageEnhanced
        publicId="banyan_tree/flat_mountain/kitchen-detail"
        alt="Gourmet kitchen with granite countertops"
        preset="gallery"
        responsive={true}
        className="rounded-lg shadow-lg"
      />
    </div>
  </div>
</section>
```

### Staff Directory

```astro
---
import CloudinaryAvatar from '../components/ui/CloudinaryAvatar.astro';

const staff = [
  { publicId: 'staff/manager', name: 'John Smith', role: 'Property Manager' },
  { publicId: 'staff/concierge', name: 'Sarah Johnson', role: 'Concierge' },
  { publicId: 'staff/maintenance', name: 'Mike Wilson', role: 'Maintenance' }
];
---

<section class="py-16">
  <div class="max-w-4xl mx-auto px-4">
    <h2 class="text-3xl font-anamortee text-center mb-12">Meet Our Team</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      {staff.map(person => (
        <div class="text-center">
          <CloudinaryAvatar
            publicId={person.publicId}
            alt={`${person.name}, ${person.role}`}
            size="xl"
            border={true}
            borderColor="rgb(var(--color-felted-green-500))"
            className="mx-auto mb-4"
          />
          <h3 class="text-xl font-semibold text-deep-forest">{person.name}</h3>
          <p class="text-granite-600">{person.role}</p>
        </div>
      ))}
    </div>
  </div>
</section>
```

### Blog Post with Optimized Images

```astro
---
import CloudinaryImageEnhanced from '../components/ui/CloudinaryImageEnhanced.astro';
---

<article class="max-w-4xl mx-auto px-4 py-16">
  <!-- Hero image -->
  <CloudinaryImageEnhanced
    publicId="blog/highlands-waterfalls-guide"
    alt="Beautiful waterfall in Highlands, NC"
    preset="hero"
    priority={true}
    className="rounded-lg mb-8"
    aspectRatio="16/9"
  />

  <h1 class="text-4xl font-anamortee mb-6">Ultimate Guide to Highlands NC Waterfalls</h1>

  <div class="prose prose-lg max-w-none">
    <p>Discover the most breathtaking waterfalls near Flat Mountain Estates...</p>

    <!-- Inline image with text wrap -->
    <div class="float-right ml-6 mb-4 max-w-sm">
      <CloudinaryImageEnhanced
        publicId="blog/dry-falls-summer"
        alt="Dry Falls during summer"
        transformation={{
          width: 400,
          height: 300,
          crop: 'fill',
          radius: 8
        }}
        className="rounded-lg"
      />
      <p class="text-sm text-granite-600 mt-2 italic">Dry Falls - a must-visit attraction</p>
    </div>

    <p>Continue with your blog content...</p>
  </div>
</article>
```

## Performance Best Practices

### 1. Use Appropriate Loading Strategies

```astro
<!-- Critical above-the-fold images -->
<CloudinaryImageEnhanced
  publicId="hero-image"
  alt="Hero"
  priority={true}
  loading="eager"
/>

<!-- Below-the-fold images -->
<CloudinaryImageEnhanced
  publicId="gallery-image"
  alt="Gallery"
  loading="lazy"
  intersectionRootMargin="100px"
/>
```

### 2. Responsive Images Configuration

```astro
<!-- For full-width images -->
<CloudinaryImageEnhanced
  publicId="banner"
  alt="Banner"
  responsive={{
    breakpoints: [768, 1024, 1280, 1536, 1920],
    sizes: "100vw"
  }}
/>

<!-- For content images -->
<CloudinaryImageEnhanced
  publicId="content"
  alt="Content"
  responsive={{
    breakpoints: [400, 600, 800],
    sizes: "(max-width: 768px) 100vw, 800px"
  }}
/>
```

### 3. Preset Usage

```astro
<!-- Use presets for consistency -->
<CloudinaryImageEnhanced publicId="image" alt="Alt" preset="gallery" />
<CloudinaryImageEnhanced publicId="image" alt="Alt" preset="thumbnail" />
<CloudinaryImageEnhanced publicId="image" alt="Alt" preset="hero" />
```

### 4. Error Handling

```astro
<CloudinaryImageEnhanced
  publicId="might-not-exist"
  alt="Image"
  errorFallback="https://via.placeholder.com/400x300?text=Image+Not+Available"
  onError={() => console.log('Image failed to load')}
/>
```

## TypeScript Support

All components are fully typed. Import types for advanced usage:

```typescript
import type {
  CloudinaryTransformation,
  CloudinaryImageProps,
  PresetName,
  ResponsiveImageConfig
} from '../lib/cloudinary-types';

// Use in your Astro components
const customTransformation: CloudinaryTransformation = {
  width: 800,
  height: 600,
  crop: 'fill',
  gravity: 'face',
  effect: 'improve'
};
```

### Available Presets

- `hero`: 1920x1080, high quality for hero sections
- `gallery`: 800x600, balanced quality for galleries
- `thumbnail`: 400x300, optimized for small previews
- `avatar`: 128x128, circular with face detection
- `mobile`: 768x576, mobile-optimized
- `amenityCard`: 600x400, rounded corners for feature cards
- `blogThumbnail`: 480x320, blog post previews

## Troubleshooting

### Common Issues

1. **Images not loading**
   - Verify `PUBLIC_CLOUDINARY_CLOUD_NAME` is set correctly
   - Check that publicId exists in your Cloudinary account
   - Ensure folder structure matches: `banyan_tree/flat_mountain/image-name`

2. **Slow loading**
   - Use `priority={true}` for above-the-fold images
   - Implement proper responsive configurations
   - Check Cloudinary auto-quality settings

3. **Layout issues**
   - Set explicit `aspectRatio` for consistent layouts
   - Use `objectFit` property for control over image fitting
   - Consider container constraints

### Debug Mode

Enable debug logging:

```astro
<CloudinaryImageEnhanced
  publicId="debug-image"
  alt="Debug"
  onLoad={() => console.log('Image loaded successfully')}
  onError={() => console.error('Image failed to load')}
/>
```

### Performance Monitoring

Monitor Core Web Vitals:
- **LCP**: Use `priority={true}` for hero images
- **CLS**: Set explicit dimensions or aspect ratios
- **FID**: Minimize JavaScript execution during image loading

---

For additional support, refer to the [Cloudinary documentation](https://cloudinary.com/documentation) or contact the development team.