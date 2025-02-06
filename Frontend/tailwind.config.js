/** @type {import('tailwindcss').Config} */
import forms from "@tailwindcss/forms";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      phone: "360px",
      tablet: "768px",
      laptop: "1024px",
      desktop: "1280px",
    },
    colors: {
      primary: "var(--primary-color, #012840)", // Default value
      secondary: "var(--secondary-color, #025373)",
      accent: "var(--accent-color, #03738C)",
      tertiary: "var(--tertiary-color, #3FA8BF)",
      highlight: "var(--highlight-color, #96D2D9)",
      textcolor: "var(--text-color, #1A1A1A)",
      offblack: "var(--offblack-color, #1A1A1A)",
      offwhite: "var(--offwhite-color, #F4F9F9)",
      lightgrey: "var(--lightgrey-color, #E0E6E6)",
      mediumgrey: "var(--mediumgrey-color, #B0C4C4)",
      darkgrey: "var(--darkgrey-color, #606D6D)",
      error: "var(--error-color, #e12a2a)",
    },
    fontFamily: {
      sans: ["Josefin Sans", "sans"],
      serif: ["Raleway", "serif"],
    },
    extend: {
      fontWeight: {
        thin: "100",
        extraLight: "200",
        light: "300",
        normal: "400",
        medium: "500",
        semiBold: "600",
        bold: "700",
        extraBold: "800",
        black: "900",
      },
    },
  },
  plugins: [forms], // Use the imported `forms` instead of require
};
