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
  baseURL: 'https://highlands-rental.com',
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
    title: 'Highlands NC Vacation Rentals | The Bodhi Luxury Mountain Estate | Sleeps 17',
    description: 'Book The Bodhi - luxury Highlands NC vacation rental sleeping 17 guests. 5-bedroom mountain estate with private theater, koi pond & stunning views. Best vacation rental in Highlands NC!',
    keywords: 'Highlands NC vacation rentals, luxury mountain estate, Highlands NC rentals, vacation rental sleeps 17, private theater rental, Highlands North Carolina cabins'
  },

  property: {
    title: 'Luxury 5-Bedroom Highlands NC Rental | The Bodhi Property Details | Private Theater',
    description: 'Explore The Bodhi luxury Highlands NC vacation rental: 5 bedrooms, private theater, koi pond, Big Green Egg & mountain views. Premium vacation rental sleeping 17 guests in Highlands NC.',
    keywords: 'luxury Highlands NC rental, 5-bedroom vacation rental, private theater rental, large group rentals Highlands NC, mountain view vacation rental'
  },

  booking: {
    title: 'Book Highlands NC Vacation Rental | The Bodhi Estate | Check Availability',
    description: 'Book The Bodhi luxury Highlands NC vacation rental online. Check availability for 17 guests at our premium mountain estate. Best rates guaranteed for Highlands NC rentals!',
    keywords: 'book Highlands NC rental, vacation rental booking, large group rental Highlands, luxury mountain estate booking, Highlands NC availability'
  },

  localGuide: {
    title: 'Highlands NC Travel Guide | Things to Do | Vacation Rental Insider Tips',
    description: 'Complete Highlands NC travel guide from The Bodhi vacation rental. Discover waterfalls, restaurants, activities & attractions. Expert local recommendations for your Highlands NC vacation.',
    keywords: 'Highlands NC travel guide, things to do Highlands NC, Highlands waterfalls, Highlands restaurants, vacation rental travel tips'
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