module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      'sm': { 'max': '768px' }
    },
    extend: {},
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
      'white': '#FFFFFF'
    }
  },
  plugins: [],
}
