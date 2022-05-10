module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      'md': { 'max': '1040px' },
      'sm': { 'max': '768px' }
    },
    extend: {
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' }
        },
        popup: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 }
        }
      },
      animation: {
        wiggle: 'wiggle 1s ease-in-out',
        popup: 'popup 0.5s ease-in-out'
      }
    },
    fontFamily: {
      sans: ['Lato', 'sans-serif'],
      heading: ['Raleway', 'sans-serif']
    },
    colors: {
      'light-green': '#B5FFEC',
      'dark-green': '#06D6A0',
      'pale-blue': '#F1FAFF',
      'dark-blue': '#053661',
      'light-blue': '#66C3FF',
      'grey': '#E5E5E5',
      'dark-grey': '#8E8E8E',
      'white': '#FFFFFF',
      'black': '#000000',
      'red': '#FF0000',
      'pink': '#FDE8E8'
    }
  },
  plugins: [],
}
