/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./pages/**/*.tsx",
    "./components/**/*.tsx",
    "./layouts/**/*.tsx",
    "./data/**/*.(mdx|md)",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ['GeistSans', "MISans", ...defaultTheme.fontFamily.sans],
        mono: ["GeistMono", ...defaultTheme.fontFamily.mono],
      },

      typography: (theme) => {
        // some fontSizes return [size, props], others just size :/
        const fontSize = (size) => {
          const result = theme(`fontSize.${size}`);
          return Array.isArray(result) ? result[0] : result;
        };

        return {
          // DEFAULT only holds shared stuff and not the things that change
          // between light/dark
          DEFAULT: {
            css: [
              {
                "> *": {
                  gridColumn: "1 / -1",
                },
                p: {
                  marginTop: 0,
                  marginBottom: theme("spacing.6"),
                  fontSize: fontSize("lg"),
                },
                "> div": {
                  marginTop: 0,
                  marginBottom: theme("spacing.8"),
                  fontSize: fontSize("lg"),
                },
                "code": {
                  fontWeight: '500'
                },
                "code::before": {
                  content: "none",
                },
                "code::after": {
                  content: "none",
                },
                strong: {
                  fontWeight: theme("fontWeight.medium"),
                  fontSize: fontSize("lg"),
                },
                ".embed, .sandpack-root": {
                  [`@media (min-width: ${theme("screens.lg")})`]: {
                    position: "relative",
                    marginLeft: "-8vw",
                    marginRight: "-8vw",
                    gridColumn: "2 / span 10",
                  },
                },
                ".embed > div": {
                  height: "0px",
                },
                ".embed > div > iframe": {
                  height: "100% !important",
                  width: "100% !important",
                  top: "0",
                  left: "0",
                  position: "absolute",
                  border: "none",
                  borderRadius: "0 !important",
                  [`@media (min-width: ${theme("screens.lg")})`]: {
                    borderRadius: "0.5rem !important",
                  },
                },
                pre: {
                  lineHeight: 1.8
                },
                ul: {
                  marginTop: 0,
                  marginBottom: theme("spacing.6"),
                  fontSize: fontSize("lg"),
                },
                ol: {
                  marginTop: 0,
                  marginBottom: theme("spacing.6"),
                  fontSize: fontSize("lg"),
                },
                // tailwind doesn't stick to this property order, so we can't make 'h3' overrule 'h2, h3, h4'
                "h1, h2": {
                  fontSize: fontSize("3xl"),
                  marginTop: theme("spacing.16"),
                  marginBottom: theme("spacing.8"),
                },
                h3: {
                  fontSize: fontSize("2xl"),
                  marginTop: theme("spacing.14"),
                  marginBottom: theme("spacing.8"),
                },
                "h4, h5, h6": {
                  fontSize: fontSize("xl"),
                },
                img: {
                  // images are wrapped in <p>, which already has margin
                  marginTop: 0,
                  marginBottom: 0,
                  borderRadius: theme("borderRadius.md"),
                  [`@media (min-width: ${theme("screens.lg")})`]: {
                    borderRadius: theme("borderRadius.lg"),
                  },
                },
                blockquote: {
                  fontWeight: theme("fontWeight.normal"),
                  border: "none",
                  borderRadius: theme("borderRadius.lg"),
                  padding: theme("spacing.8"),
                  marginTop: 0,
                  marginBottom: theme("spacing.10"),
                },
                "blockquote > :last-child": {
                  marginBottom: 0,
                },
              },
            ],
          },
        };
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
