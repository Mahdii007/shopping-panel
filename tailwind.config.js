/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pinko: "#F9E9EC",
        cardsBg:"#F9DAD5",
        buybutton:"#5814A2",
        addbuttom:"#FF5404"
      },
    },
  },
  plugins: [],
}