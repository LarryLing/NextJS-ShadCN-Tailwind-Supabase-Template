import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "background": "var(--background)",
        "foreground": "var(--foreground)",
        "primary": "var(--primary)",
        "primary-lighter": "var(--primary-lighter)",
        "primary-lightest": "var(--primary-lightest)",
        "secondary": "var(--secondary)",
        "secondary-lighter": "var(--secondary-lighter)",
        "secondary-lightest": "var(--secondary-lightest)",
        "success": "var(--success)",
        "success-lighter": "var(--success-lighter)",
        "success-lightest": "var(--success-lightest)",
        "danger": "var(--danger)",
        "danger-lighter": "var(--danger-lighter)",
        "danger-lightest": "var(--danger-lightest)",
        "tertiary": "var(--tertiary)",
        "text-color": "var(--text-color)",
      },
      transitionProperty: {
        "opacity-position": "opacity, left, right, top, bottom",
       }
    },
  },
  plugins: [],
} satisfies Config;
