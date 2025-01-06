/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Karanlık mod desteği
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Genel Renkler (Koyu Mod)
        dark: {
          bgcolor: '#161818', // Arka plan rengi
          accentpurple: '#7231E2', // Vurgu rengi
          white: '#FFFFFF', // Beyaz
          black: '#000000', // Siyah
          gray: '#929292', // Gri
        },
        // Genel Renkler (Açık Mod)
        light: {
          bgcolor: '#E1DEE7', // Arka plan rengi
          accentpurple: '#7231E2', // Vurgu rengi
          white: '#FFFFFF', // Beyaz
          black: '#000000', // Siyah
          gray: '#929292', // Gri
        },
        // Form Renkleri
        form: {
          gray: {
            light: '#C7C7C7', // Açık gri
            dark: '#2E2E2E', // Koyu gri
          },
          red: '#FF0000', // Form kırmızı rengi
          text: {
            light: '#161818', // Açık mod form metin rengi
            dark: '#FFFFFF', // Koyu mod form metin rengi
          },
          input: {
            light: '#E1DEE7', // Açık mod input arka plan
            dark: '#2E2E2E', // Koyu mod input arka plan
          },
        },
      },
    },
  },
  plugins: [],
};
