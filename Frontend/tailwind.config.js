/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Add the desired font here

        heading: ['Montserrat', 'sans-serif'], // Add Montserrat as the heading font

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
  // daisyui: {
  //   themes: false, // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
  //   darkTheme: "dark", // name of one of the included themes for dark mode
  //   base: true, // applies background color and foreground color for root element by default
  //   styled: true, // include daisyUI colors and design decisions for all components
  //   utils: true, // adds responsive and modifier utility classes
  //   prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
  //   logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
  //   // themeRoot: ":root", // The element that receives theme color CSS variables
  // },



}