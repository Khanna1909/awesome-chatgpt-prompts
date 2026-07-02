import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        future: {
          bg: '#08070B',
          panel: '#12111A',
          ink: '#FFF7ED',
          muted: '#A8B0C2',
          pink: '#FF0080',
          cyan: '#40E0D0',
          orange: '#FF6600'
        }
      },
      boxShadow: {
        glow: '0 0 80px rgba(255,0,128,.24)'
      }
    }
  },
  plugins: []
};

export default config;
