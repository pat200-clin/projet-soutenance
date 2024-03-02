/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      padding:{
        "100": "0 10px",
        "001": "10px 0",
      },
      margin:{
        "001": "10px 0",
        "01": "0 10px",
        "00": "0 auto"
      },

      flex:{
        "4": "4",
      },
      borderWidth:{
        "full": "full",
      },
     gridTemplateColumns:{
        "4": "16rem auto 28rem",
      }, 
    },
  },
  plugins: [
    require('tailwind-scrollbar')({ nocompatible: true }),
  ],
}

