// SEO utilities for Highlands NC vacation rental website

export interface SEOData {
  title: string;
  description: string;
  canonicalURL?: string;
  image?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
}

// Property-specific SEO data
export const propertySEO = {
  siteName: 'The Bodhi - Luxury 5-Bedroom Mountain Estate in Highlands, NC',
  baseURL: 'https://thebodhihighlands.com', // Update with actual domain
  defaultImage: '/images/the-bodhi-hero-exterior.jpg',

  // Location-specific keywords for Highlands NC
  location: {
    city: 'Highlands',
    state: 'NC',
    region: 'North Carolina',
    area: 'Western North Carolina Mountains',
    nearby: ['Cashiers', 'Franklin', 'Sylva', 'Cherokee']
  },

  // Core SEO keywords
  keywords: {
    primary: [
      'The Bodhi Highlands NC vacation rental',
      'luxury 5-bedroom mountain estate Highlands',
      'Flat Mountain Estates vacation rental',
      'private theater vacation rental Highlands NC',
      'large group vacation rental Blue Ridge Mountains'
    ],
    secondary: [
      'Highlands NC vacation rental sleeps 17',
      'luxury mountain estate North Carolina',
      'koi pond vacation rental NC',
      'Big Green Egg vacation rental',
      'vacation rental near Cashiers NC',
      'Blue Ridge Mountain retreat'
    ],
    localSEO: [
      'vacation rental 480 Flat Mountain Estates Road',
      'The Bodhi Highlands NC 28741',
      'luxury estate rental Highlands North Carolina',
      'movie theater vacation rental Highlands',
      'large family vacation rental Highlands NC'
    ]
  }
};

// Generate SEO-optimized title
export function generateSEOTitle(pageTitle: string, includeLocation = true): string {
  const locationSuffix = includeLocation ? ` | Highlands, NC` : '';
  const siteName = propertySEO.siteName;

  if (pageTitle === 'Home' || pageTitle === '') {
    return siteName + locationSuffix;
  }

  return `${pageTitle} | ${siteName}${locationSuffix}`;
}

// Generate SEO-optimized description
export function generateSEODescription(
  content: string,
  maxLength = 160,
  includeLocation = true
): string {
  const locationPhrase = includeLocation ? ' in Highlands, NC' : '';
  let description = content + locationPhrase;

  if (description.length > maxLength) {
    description = description.substring(0, maxLength - 3) + '...';
  }

  return description;
}

// Page-specific SEO configurations
export const pageSEO = {
  home: {
    title: generateSEOTitle('The Bodhi'),
    description: generateSEODescription(
      'Escape to The Bodhi - a luxury 5-bedroom mountain estate in prestigious Flat Mountain Estates. Sleeps 17 guests with private theater, koi pond, and stunning Blue Ridge Mountain views. Perfect for large groups and special celebrations'
    ),
    keywords: propertySEO.keywords.primary.join(', ')
  },

  property: {
    title: generateSEOTitle('The Bodhi Property Details'),
    description: generateSEODescription(
      'Discover The Bodhi\'s unique amenities: private movie theater, tranquil koi pond with waterfalls, Big Green Egg, multiple fireplaces, and panoramic mountain views. 5 bedrooms, 5 bathrooms accommodating up to 17 guests'
    ),
    keywords: propertySEO.keywords.secondary.join(', ')
  },

  booking: {
    title: generateSEOTitle('Book The Bodhi'),
    description: generateSEODescription(
      'Book The Bodhi luxury mountain estate today. Check availability for up to 17 guests and secure your reservation at this exceptional Flat Mountain Estates vacation rental with private theater and unique amenities'
    ),
    keywords: 'book The Bodhi Highlands NC, luxury mountain estate reservations, large group vacation rental booking'
  },

  localGuide: {
    title: generateSEOTitle('Highlands Area Guide'),
    description: generateSEODescription(
      'Your complete guide to Highlands, NC from The Bodhi. Discover restaurants, waterfalls, hiking trails, and attractions near Flat Mountain Estates. Perfect for planning your Blue Ridge Mountain vacation'
    ),
    keywords: 'Highlands NC attractions, Flat Mountain Estates area, things to do near The Bodhi, Highlands waterfalls'
  }
};

// Generate structured data for local business
export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    "name": "The Bodhi - Luxury Mountain Estate",
    "description": "The Bodhi is a luxury 5-bedroom mountain estate in Highlands, NC, sleeping up to 17 guests. Features private movie theater, koi pond with waterfalls, Big Green Egg, and stunning Blue Ridge Mountain views.",
    "url": propertySEO.baseURL,
    "telephone": "+1-XXX-XXX-XXXX", // Update with actual phone
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "480 Flat Mountain Estates Road",
      "addressLocality": "Highlands",
      "addressRegion": "NC",
      "postalCode": "28741",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "35.0531",
      "longitude": "-83.1960"
    },
    "accommodationCategory": "Vacation Rental",
    "numberOfRooms": "5",
    "occupancy": {
      "@type": "QuantitativeValue",
      "maxValue": "17"
    },
    "amenityFeature": [
      {"@type": "LocationFeatureSpecification", "name": "Private Movie Theater"},
      {"@type": "LocationFeatureSpecification", "name": "Koi Pond with Waterfalls"},
      {"@type": "LocationFeatureSpecification", "name": "Big Green Egg Outdoor Cooking"},
      {"@type": "LocationFeatureSpecification", "name": "Multiple Fireplaces"},
      {"@type": "LocationFeatureSpecification", "name": "Blue Ridge Mountain Views"},
      {"@type": "LocationFeatureSpecification", "name": "5 Bedrooms"},
      {"@type": "LocationFeatureSpecification", "name": "5 Bathrooms"},
      {"@type": "LocationFeatureSpecification", "name": "Sleeps 17 Guests"},
      {"@type": "LocationFeatureSpecification", "name": "Full Kitchen"},
      {"@type": "LocationFeatureSpecification", "name": "Multiple Covered Patios"},
      {"@type": "LocationFeatureSpecification", "name": "Reading Nook"},
      {"@type": "LocationFeatureSpecification", "name": "Bar Area"},
      {"@type": "LocationFeatureSpecification", "name": "Sunroom"},
      {"@type": "LocationFeatureSpecification", "name": "Private Parking"},
      {"@type": "LocationFeatureSpecification", "name": "WiFi"},
      {"@type": "LocationFeatureSpecification", "name": "Air Conditioning"},
      {"@type": "LocationFeatureSpecification", "name": "Heating"}
    ],
    "starRating": {
      "@type": "Rating",
      "ratingValue": "5"
    },
    "priceRange": "$$$$"
  };
}