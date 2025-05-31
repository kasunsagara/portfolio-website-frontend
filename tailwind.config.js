/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // You can add custom colors here if needed
      },
      animation: {
        'blink': 'blink 1s step-end infinite',              // blinking cursor animation
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
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}
