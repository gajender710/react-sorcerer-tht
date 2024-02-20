/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      height: (theme) => ({
        112: "28rem",
        120: "30rem",
      }),
      minHeight: (theme) => ({
        80: "20rem",
      }),
      colors: {
       
          lighter: "#F5F3FF",
          light: "#DDD6FE",
          primary: "#0B1251",
          secondary:"#3B4374",
          surface:"#AAAAAB",
        
      },
      fontFamily: {
        primary: ['"Josefin Sans"'],
      },
    },
  },
  plugins: [],
};
