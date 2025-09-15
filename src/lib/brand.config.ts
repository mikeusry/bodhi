// Brand Configuration for Highlands NC Vacation Rental
// Based on official brand guidelines

export const brandConfig = {
  // Color Palette from Brand Guidelines
  colors: {
    // Primary Brand Colors
    canvas: {
      50: 'rgb(252, 253, 252)',
      100: 'rgb(248, 249, 248)', // Primary light/background
      200: 'rgb(240, 241, 240)',
      300: 'rgb(228, 229, 228)',
    },
    feltedGreen: {
      50: 'rgb(240, 245, 241)',
      100: 'rgb(225, 235, 227)',
      500: 'rgb(86, 125, 95)', // Primary brand color
      600: 'rgb(77, 112, 85)',
      700: 'rgb(68, 99, 75)',
      800: 'rgb(59, 86, 65)',
      900: 'rgb(50, 73, 55)',
    },
    deepForest: {
      500: 'rgb(45, 69, 56)', // Dark green accent
      600: 'rgb(40, 62, 50)',
      700: 'rgb(35, 55, 44)',
      800: 'rgb(30, 48, 38)',
      900: 'rgb(25, 41, 32)',
    },
    brookBlue: {
      50: 'rgb(240, 246, 248)',
      100: 'rgb(225, 237, 241)',
      500: 'rgb(94, 142, 158)', // Secondary accent
      600: 'rgb(85, 128, 142)',
      700: 'rgb(76, 114, 126)',
      800: 'rgb(67, 100, 110)',
      900: 'rgb(58, 86, 94)',
    },
    granite: {
      100: 'rgb(240, 241, 242)',
      200: 'rgb(225, 227, 228)',
      300: 'rgb(191, 195, 197)',
      400: 'rgb(157, 163, 166)',
      500: 'rgb(64, 68, 71)', // Neutral/text color
      600: 'rgb(58, 61, 64)',
      700: 'rgb(51, 54, 57)',
      800: 'rgb(45, 48, 50)',
      900: 'rgb(38, 41, 43)',
    },
  },

  // Typography from Brand Guidelines
  typography: {
    fonts: {
      // Primary Headings - Script font like "The Banyan Tree"
      anamortee: '"Anamortee", cursive',
      // Secondary Headings
      nimbusSansBold: '"Nimbus Sans Bold", "Nimbus Sans", system-ui, sans-serif',
      // Body Text
      nimbusSansLight: '"Nimbus Sans Light", "Nimbus Sans", system-ui, sans-serif',
      nimbusSansRegular: '"Nimbus Sans", system-ui, sans-serif',
      // Accent Text
      abrilDisplay: '"Abril Display", serif',
    },
    scale: {
      xs: '0.75rem',   // 12px
      sm: '0.875rem',  // 14px
      base: '1rem',    // 16px
      lg: '1.125rem',  // 18px
      xl: '1.25rem',   // 20px
      '2xl': '1.5rem', // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem',  // 36px
      '5xl': '3rem',     // 48px
      '6xl': '3.75rem',  // 60px
    },
  },

  // Design Tokens
  spacing: {
    xs: '0.5rem',   // 8px
    sm: '1rem',     // 16px
    md: '1.5rem',   // 24px
    lg: '2rem',     // 32px
    xl: '3rem',     // 48px
    '2xl': '4rem',  // 64px
    '3xl': '6rem',  // 96px
  },

  // Border Radius
  borderRadius: {
    sm: '0.25rem',  // 4px
    md: '0.5rem',   // 8px
    lg: '0.75rem',  // 12px
    xl: '1rem',     // 16px
    full: '9999px',
  },

  // Shadows for depth
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  },

  // Brand-specific design elements
  brand: {
    // Circular tree motif dimensions
    treeIcon: {
      small: '2rem',   // 32px
      medium: '3rem',  // 48px
      large: '4rem',   // 64px
    },

    // Brand style preferences
    aesthetic: 'wellness/natural',
    personality: ['sophisticated', 'natural', 'luxurious', 'welcoming'],

    // Logo usage
    logo: {
      primary: 'The Banyan Tree style with circular tree motif',
      colors: ['feltedGreen', 'deepForest'],
      minSize: '120px',
    },
  },

  // Component Design Patterns
  components: {
    button: {
      primary: {
        bg: 'feltedGreen.500',
        text: 'canvas.100',
        hover: 'feltedGreen.600',
        padding: 'sm md',
        borderRadius: 'md',
      },
      secondary: {
        bg: 'transparent',
        text: 'feltedGreen.500',
        border: 'feltedGreen.500',
        hover: 'feltedGreen.50',
        padding: 'sm md',
        borderRadius: 'md',
      },
    },
    card: {
      bg: 'canvas.100',
      border: 'granite.200',
      shadow: 'md',
      borderRadius: 'lg',
      padding: 'lg',
    },
    section: {
      padding: 'xl 2xl',
      maxWidth: '7xl',
    },
  },

  // Responsive Breakpoints
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
};

// Helper functions for brand consistency
export const brandHelpers = {
  // Get color value by path (e.g., 'feltedGreen.500')
  getColor: (colorPath: string): string => {
    const [color, shade] = colorPath.split('.');
    return brandConfig.colors[color as keyof typeof brandConfig.colors]?.[shade as any] || colorPath;
  },

  // Get font family by name
  getFont: (fontName: keyof typeof brandConfig.typography.fonts): string => {
    return brandConfig.typography.fonts[fontName];
  },

  // Generate brand-compliant gradient
  getGradient: (from: string, to: string): string => {
    const fromColor = brandHelpers.getColor(from);
    const toColor = brandHelpers.getColor(to);
    return `linear-gradient(135deg, ${fromColor} 0%, ${toColor} 100%)`;
  },
};

export default brandConfig;