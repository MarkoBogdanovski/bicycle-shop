/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {},
  },
  safelist: [
    {
      pattern: /^bg-/,
    },
    {
      pattern: /^ring-/,
    },
  ],
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust this path according to your project structure
  ],
};
