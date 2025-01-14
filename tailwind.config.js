/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Karanlık mod desteği
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      spacing: {
        '1': '0.25rem',  // 4px
        '2': '0.5rem',   // 8px
        '4': '1rem',     // 16px
        '8': '2rem',     // 32px
        '12': '3rem',    // 48px
        '16': '4rem',    // 64px
        '20': '5rem',    // 80px
        '21': '5.25rem',    // 80px
        '24': '6rem',    // 96px
        '32': '8rem',    // 128px
        '40': '10rem',   // 160px
        '48': '12rem',   // 192px
        '56': '14rem',   // 224px
        '64': '16rem',   // 256px
        '72': '18rem',   
        '80': '20rem',   // 320px
        '88': '22rem',   
        '96': '24rem',   // 384px
        '100': '25rem',  // 400px
      },
      screens: {
        'mobile-s': '320px',
        'mobile-m': '375px',
        'mobile-l': '425px',
        'tablet': '768px',
        'laptop': '1024px',
        'laptop-l': '1440px',
      },
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
