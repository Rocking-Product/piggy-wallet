import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
   
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        brand : "#8B5CF6",
        disabledGray: "#D9D9D9",
        disabledGrayText: "#B3B3B3",
        neutral: {
          200 : "#E2E8F0",
        },
        "brand-fifty": "#F5F3FF",
        success: "#BBF7D0",
        successText: "#166534",

      },
    },
  },
  plugins: [],
};
export default config;
