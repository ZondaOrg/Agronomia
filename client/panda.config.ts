import { defineConfig } from "@pandacss/dev";
import tokenColors from './src/core/styles/token/colors'
import animations from './src/core/styles/animations/animations'
import { durationsToken } from './src/core/styles/token/durations'
import tokenBorder from './src/core/styles/token/border'

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ["./src/**/*.{js,jsx,ts,tsx}", "./pages/**/*.{js,jsx,ts,tsx}"],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {
      keyframes: animations,
      tokens: {
        colors: tokenColors,
        durations: durationsToken,
        borders: tokenBorder,
      },
    },
  },

  // The output directory for your css system
  outdir: "styled-system",
});