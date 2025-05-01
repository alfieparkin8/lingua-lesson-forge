import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1400px'
      }
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))'
        },
        // Spanish lesson theme colors based on the PDF
        spanish: {
          blue: {
            DEFAULT: '#0052CC', // Primary blue
            light: '#E6F0FF',   // Light blue background
            dark: '#003D99',    // Darker blue for hover states
            50: '#F0F7FF',
            100: '#E1EFFF',
            200: '#C3DFFF',
            300: '#A5CFFF',
            400: '#87BFFF',
            500: '#0052CC',
            600: '#004BB9',
            700: '#0044A6',
            800: '#003D93',
            900: '#003380'
          },
          orange: {
            DEFAULT: '#FF8C00', // Accent orange
            light: '#FFEBD6',   // Light orange background
            dark: '#E67E00',    // Darker orange for hover states
            50: '#FFF7EB',
            100: '#FFEFD7',
            200: '#FFDFAF',
            300: '#FFCF87',
            400: '#FFBF5F',
            500: '#FF8C00',
            600: '#E67E00',
            700: '#CC7000',
            800: '#B36200',
            900: '#995400'
          },
          gray: {
            light: '#F5F5F5',   // Light gray for backgrounds
            medium: '#E0E0E0',  // Medium gray for borders
            dark: '#333333'     // Dark gray for text
          },
          // Special colors for grammar sections and examples
          grammar: {
            ser: '#0052CC',     // Blue for "ser" examples
            estar: '#FF8C00'    // Orange for "estar" examples
          }
        },
        // Keeping the existing lingua colors for backward compatibility
        lingua: {
          primary: '#2563eb', // Blue
          secondary: '#f97316', // Orange
          accent: '#8b5cf6', // Purple
          light: '#f1f5f9', // Light background
          dark: '#1e293b', // Dark text
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
        mono: ['Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0'
          },
          to: {
            height: 'var(--radix-accordion-content-height)'
          }
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)'
          },
          to: {
            height: '0'
          }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;