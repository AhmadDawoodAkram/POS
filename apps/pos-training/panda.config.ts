import { defineConfig } from "@pandacss/dev";
import { createPreset } from "@pallas-ui/panda-preset";
import { presetPrimaryColors } from "@pallas-ui/panda-preset/colors/paletteGenerator";
import type { ThemeColorPalette } from "@pallas-ui/panda-preset/types";
import { CardRecipe } from "./theme/recipes/card";

const themeColorPalette: ThemeColorPalette = {
  // biome-ignore lint/style/noNonNullAssertion: <explanation>
  primary: { colorName: "blue", colorValue: presetPrimaryColors["blue"]! },
  // biome-ignore lint/style/noNonNullAssertion: <explanation>
  error: { colorName: "red", colorValue: presetPrimaryColors["red"]! },
  success: {
    colorName: "green",
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    colorValue: presetPrimaryColors["green"]!,
  },
  warning: {
    colorName: "yellow",
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    colorValue: presetPrimaryColors["yellow"]!,
  },
  info: {
    colorName: "blue",
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    colorValue: presetPrimaryColors["blue"]!,
  },
};

export default defineConfig({
  preflight: true,
  presets: [createPreset({ colors: themeColorPalette, baseRadius: 2 })],

  // Where to look for your css declarations
  include: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./containers/**/*.{js,ts,jsx,tsx}",
  ],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {
      // recipes: {
      //   Card: CardRecipe,
      // },
      keyframes: {
        fadeInSlideUp: {
          from: {
            opacity: 0,
            transform: "translateY(20px)",
          },
          to: {
            opacity: 1,
            transform: "translateY(0)",
          },
        },
      },
      tokens: {
        animations: {
          fadeInSlideUp: {
            value: "fadeInSlideUp 1s ease-out",
          },
        },
      },
    },
  },
  jsxFramework: "react",
  jsxStyleProps: "minimal",
  // The output directory for your css system
  outdir: "styled-system",
});
