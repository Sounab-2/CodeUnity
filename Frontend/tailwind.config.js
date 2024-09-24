/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Ensures dark mode is applied based on a specific class
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Your desired font
        heading: ['Montserrat', 'sans-serif'], // Montserrat as the heading font
      },
      keyframes: {
        wave: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '50%': { transform: 'rotate(20deg)' },
        },
        forward: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(10px)' },
        },
      },
      animation: {
        'text-wave': 'wave 2s ease-in-out infinite',
        'text-forward': 'forward 5s ease-in-out infinite',
      },
      colors: {
        'primary-dark': '#0b6a7a',    // Darker shade of primary
        'secondary-dark': '#FF1493',  // Darker shade of secondary
        'accent-dark': '#194d33',     // Darker shade of accent
        'info-dark': '#116a84',       // Darker shade of info
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require("daisyui")],
  daisyui: {
    themes: ["dark"], // Restrict DaisyUI to dark mode only
    darkTheme: "dark", // Set dark mode as the default and only theme
    base: true, // Applies background color and foreground color for root element
    styled: true, // Include DaisyUI styles for all components
    utils: true, // Adds responsive and modifier utility classes
    logs: true, // Logs DaisyUI version and config in console
  },
}
