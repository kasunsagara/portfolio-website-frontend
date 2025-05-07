/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1a1a1a",
        secondary: "#2c2c2c",        
        accent: "#00ffff", 
      },
      animation: {
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite', // glow animation
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': {
            boxShadow: '0 0 0px rgba(0, 255, 255, 0)', // no glow at start/end
          },
          '50%': {
            boxShadow: '0 0 40px rgba(0, 255, 255, 0.7)', // glowing effect
          },
        },
      },
    },
  },
  plugins: [],
}
