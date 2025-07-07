import { definePreset } from '@pandacss/dev'
import presetBase from '@pandacss/preset-base'
import { generateThemeColors } from './colors/colors'
import { paletteGenerator, presetPrimaryColors } from './colors/paletteGenerator'
import { animationStyles } from './theme/animation-styles'
import { breakpoints } from './theme/breakpoints'
import { conditions } from './theme/conditions'
import { globalCss } from './theme/global-css'
import { keyframes } from './theme/keyframes'
import { patterns } from './theme/patterns'
import { recipes, slotRecipes } from './theme/recipes'
import { semanticTokens } from './theme/semantic-tokens'
import { textStyles } from './theme/text-styles'
import { tokens } from './theme/tokens'
import { utilities } from './theme/utilities'
import type { ThemeOptions } from './types/theme'

export const createPreset = (options: ThemeOptions) => {
  const { colors } = options

  const themeColors = generateThemeColors(colors)

  const themeColorsTokens = themeColors.tokens.reduce((acc, curr) => {
    // biome-ignore lint/performance/noAccumulatingSpread: <explanation>
    return { ...acc, ...curr }
  }, {})

  const presetColorPalette = paletteGenerator(presetPrimaryColors)

  const presetColorPaletteTokens = Object.values(presetColorPalette).reduce((acc, curr) => {
    // biome-ignore lint/performance/noAccumulatingSpread: <explanation>
    return { ...acc, ...curr }
  }, {})

  const colorTokens = {
    ...presetColorPaletteTokens,
    ...themeColorsTokens,
  }

  return definePreset({
    name: '@pallas-ui/panda-preset',
    presets: [presetBase],
    conditions,
    utilities: {
      extend: utilities,
    },
    patterns: {
      extend: patterns,
    },
    globalCss: {
      ...globalCss,
      html: {
        colorPalette: colors.primary.colorName,
      },
    },
    theme: {
      extend: {
        breakpoints,
        keyframes,
        recipes,
        slotRecipes,
        textStyles,
        animationStyles,
        tokens: {
          ...tokens,
          colors: {
            ...colorTokens,
          },
        },
        semanticTokens: {
          ...semanticTokens,
          colors: {
            ...themeColors.semanticTokens,
          },
        },
      },
    },
  })
}
