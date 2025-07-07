import type { SemanticTokens } from '@pandacss/dev'
import type { ThemeColorTokens } from '../types/color'
import type { ThemeColorPalette } from '../types/theme'
import { createColorTokens } from '../utils/create-color-tokens'
import { getAlphaColor, getSolidColor } from '../utils/create-colors'

export const generateThemeColors = ({
  primary,
  error,
  info,
  success,
  warning,
}: ThemeColorPalette): ThemeColorTokens => {
  const primaryColorsTokens = createColorTokens(primary)
  const successColorsTokens = createColorTokens(success)
  const warningColorsTokens = createColorTokens(warning)
  const errorColorsTokens = createColorTokens(error)
  const infoColorsTokens = createColorTokens(info)

  const tokens = [
    primaryColorsTokens,
    successColorsTokens,
    warningColorsTokens,
    errorColorsTokens,
    infoColorsTokens,
  ]
  const themeSemanticTokens: SemanticTokens['colors'] = {
    primary: {
      // Primary Colors #0176d3
      DEFAULT: {
        value: {
          base: `{colors.${primary.colorName}.500}`,
          _dark: `{colors.${primary.colorName}.500.dark}`,
        },
      },
      bg: {
        value: {
          base: `{colors.${primary.colorName}.50}`,
          _dark: `{colors.${primary.colorName}.50.dark}`,
        },
      },
      bgHover: {
        value: {
          base: `{colors.${primary.colorName}.100}`,
          _dark: `{colors.${primary.colorName}.100.dark}`,
        },
      },
      border: {
        value: {
          base: `{colors.${primary.colorName}.200}`,
          _dark: `{colors.${primary.colorName}.200.dark}`,
        },
      },
      borderHover: {
        value: {
          base: `{colors.${primary.colorName}.300}`,
          _dark: `{colors.${primary.colorName}.300.dark}`,
        },
      },
      hover: {
        value: {
          base: `{colors.${primary.colorName}.400}`,
          _dark: `{colors.${primary.colorName}.400.dark}`,
        },
      },
      active: {
        value: {
          base: `{colors.${primary.colorName}.600}`,
          _dark: `{colors.${primary.colorName}.600.dark}`,
        },
      },
      textHover: {
        value: {
          base: `{colors.${primary.colorName}.700}`,
          _dark: `{colors.${primary.colorName}.700.dark}`,
        },
      },
      text: {
        value: {
          base: `{colors.${primary.colorName}.800}`,
          _dark: `{colors.${primary.colorName}.800.dark}`,
        },
      },
      textActive: {
        value: {
          base: `{colors.${primary.colorName}.900}`,
          _dark: `{colors.${primary.colorName}.900.dark}`,
        },
      },
    },

    success: {
      // Success Colors
      DEFAULT: {
        value: {
          base: `{colors.${success.colorName}.500}`,
          _dark: `{colors.${success.colorName}.500.dark}`,
        },
      },
      bg: {
        value: {
          base: `{colors.${success.colorName}.50}`,
          _dark: `{colors.${success.colorName}.50.dark}`,
        },
      },
      bgHover: {
        value: {
          base: `{colors.${success.colorName}.100}`,
          _dark: `{colors.${success.colorName}.100.dark}`,
        },
      },
      border: {
        value: {
          base: `{colors.${success.colorName}.200}`,
          _dark: `{colors.${success.colorName}.200.dark}`,
        },
      },
      borderHover: {
        value: {
          base: `{colors.${success.colorName}.300}`,
          _dark: `{colors.${success.colorName}.300.dark}`,
        },
      },
      hover: {
        value: {
          base: `{colors.${success.colorName}.400}`,
          _dark: `{colors.${success.colorName}.400.dark}`,
        },
      },
      active: {
        value: {
          base: `{colors.${success.colorName}.600}`,
          _dark: `{colors.${success.colorName}.600.dark}`,
        },
      },
      textHover: {
        value: {
          base: `{colors.${success.colorName}.700}`,
          _dark: `{colors.${success.colorName}.700.dark}`,
        },
      },
      text: {
        value: {
          base: `{colors.${success.colorName}.800}`,
          _dark: `{colors.${success.colorName}.800.dark}`,
        },
      },
      textActive: {
        value: {
          base: `{colors.${success.colorName}.900}`,
          _dark: `{colors.${success.colorName}.900.dark}`,
        },
      },
    },

    error: {
      DEFAULT: {
        value: {
          base: `{colors.${error.colorName}.500}`,
          _dark: `{colors.${error.colorName}.500.dark}`,
        },
      },
      bg: {
        value: {
          base: `{colors.${error.colorName}.50}`,
          _dark: `{colors.${error.colorName}.50.dark}`,
        },
      },
      bgHover: {
        value: {
          base: `{colors.${error.colorName}.100}`,
          _dark: `{colors.${error.colorName}.100.dark}`,
        },
      },
      border: {
        value: {
          base: `{colors.${error.colorName}.200}`,
          _dark: `{colors.${error.colorName}.200.dark}`,
        },
      },
      borderHover: {
        value: {
          base: `{colors.${error.colorName}.300}`,
          _dark: `{colors.${error.colorName}.300.dark}`,
        },
      },
      hover: {
        value: {
          base: `{colors.${error.colorName}.400}`,
          _dark: `{colors.${error.colorName}.400.dark}`,
        },
      },
      active: {
        value: {
          base: `{colors.${error.colorName}.600}`,
          _dark: `{colors.${error.colorName}.600.dark}`,
        },
      },
      text: {
        value: {
          base: `{colors.${error.colorName}.800}`,
          _dark: `{colors.${error.colorName}.800.dark}`,
        },
      },
      textHover: {
        value: {
          base: `{colors.${error.colorName}.700}`,
          _dark: `{colors.${error.colorName}.700.dark}`,
        },
      },
      textActive: {
        value: {
          base: `{colors.${error.colorName}.900}`,
          _dark: `{colors.${error.colorName}.900.dark}`,
        },
      },
    },

    warning: {
      // Warning Colors
      DEFAULT: {
        value: {
          base: `{colors.${warning.colorName}.500}`,
          _dark: `{colors.${warning.colorName}.500.dark}`,
        },
      },
      bg: {
        value: {
          base: `{colors.${warning.colorName}.50}`,
          _dark: `{colors.${warning.colorName}.50.dark}`,
        },
      },
      bgHover: {
        value: {
          base: `{colors.${warning.colorName}.100}`,
          _dark: `{colors.${warning.colorName}.100.dark}`,
        },
      },
      border: {
        value: {
          base: `{colors.${warning.colorName}.200}`,
          _dark: `{colors.${warning.colorName}.200.dark}`,
        },
      },
      borderHover: {
        value: {
          base: `{colors.${warning.colorName}.300}`,
          _dark: `{colors.${warning.colorName}.300.dark}`,
        },
      },
      hover: {
        value: {
          base: `{colors.${warning.colorName}.400}`,
          _dark: `{colors.${warning.colorName}.400.dark}`,
        },
      },
      active: {
        value: {
          base: `{colors.${warning.colorName}.600}`,
          _dark: `{colors.${warning.colorName}.600.dark}`,
        },
      },
      textHover: {
        value: {
          base: `{colors.${warning.colorName}.700}`,
          _dark: `{colors.${warning.colorName}.700.dark}`,
        },
      },
      text: {
        value: {
          base: `{colors.${warning.colorName}.800}`,
          _dark: `{colors.${warning.colorName}.800.dark}`,
        },
      },
      textActive: {
        value: {
          base: `{colors.${warning.colorName}.900}`,
          _dark: `{colors.${warning.colorName}.900.dark}`,
        },
      },
    },

    info: {
      // Info Colors
      DEFAULT: {
        value: {
          base: `{colors.${info.colorName}.500}`,
          _dark: `{colors.${info.colorName}.500.dark}`,
        },
      },
      bg: {
        value: {
          base: `{colors.${info.colorName}.50}`,
          _dark: `{colors.${info.colorName}.50.dark}`,
        },
      },
      bgHover: {
        value: {
          base: `{colors.${info.colorName}.100}`,
          _dark: `{colors.${info.colorName}.100.dark}`,
        },
      },
      border: {
        value: {
          base: `{colors.${info.colorName}.200}`,
          _dark: `{colors.${info.colorName}.200.dark}`,
        },
      },
      borderHover: {
        value: {
          base: `{colors.${info.colorName}.300}`,
          _dark: `{colors.${info.colorName}.300.dark}`,
        },
      },
      hover: {
        value: {
          base: `{colors.${info.colorName}.400}`,
          _dark: `{colors.${info.colorName}.400.dark}`,
        },
      },
      active: {
        value: {
          base: `{colors.${info.colorName}.600}`,
          _dark: `{colors.${info.colorName}.600.dark}`,
        },
      },
      textHover: {
        value: {
          base: `{colors.${info.colorName}.700}`,
          _dark: `{colors.${info.colorName}.700.dark}`,
        },
      },
      text: {
        value: {
          base: `{colors.${info.colorName}.800}`,
          _dark: `{colors.${info.colorName}.800.dark}`,
        },
      },
      textActive: {
        value: {
          base: `{colors.${info.colorName}.900}`,
          _dark: `{colors.${info.colorName}.900.dark}`,
        },
      },
    },
  }

  const neutralSemanticTokens = generateNeutralColors()

  return { tokens, semanticTokens: { ...themeSemanticTokens, ...neutralSemanticTokens } }
}

export const generateNeutralColors = (): SemanticTokens['colors'] => {
  const lightBgBase = '#fff'
  const lightTextBase = '#000'
  const darkBgBase = '#000'
  const darkTextBase = '#fff'

  const lightColors = {
    colorText: getAlphaColor(lightTextBase, 0.88),
    colorTextSecondary: getAlphaColor(lightTextBase, 0.65),
    colorTextTertiary: getAlphaColor(lightTextBase, 0.45),
    colorTextQuaternary: getAlphaColor(lightTextBase, 0.25),

    colorFill: getAlphaColor(lightTextBase, 0.15),
    colorFillSecondary: getAlphaColor(lightTextBase, 0.06),
    colorFillTertiary: getAlphaColor(lightTextBase, 0.04),
    colorFillQuaternary: getAlphaColor(lightTextBase, 0.02),

    colorBgSolid: getAlphaColor(lightTextBase, 1),
    colorBgSolidHover: getAlphaColor(lightTextBase, 0.75),
    colorBgSolidActive: getAlphaColor(lightTextBase, 0.95),

    colorBgLayout: getSolidColor(lightBgBase, 4),
    colorBgContainer: getSolidColor(lightBgBase, 0),
    colorBgElevated: getSolidColor(lightBgBase, 0),
    colorBgSpotlight: getAlphaColor(lightTextBase, 0.85),
    colorBgBlur: 'transparent',

    colorBorder: getSolidColor(lightBgBase, 15),
    colorBorderSecondary: getSolidColor(lightBgBase, 6),
  }

  const darkColors = {
    colorText: getAlphaColor(darkTextBase, 0.85),
    colorTextSecondary: getAlphaColor(darkTextBase, 0.65),
    colorTextTertiary: getAlphaColor(darkTextBase, 0.45),
    colorTextQuaternary: getAlphaColor(darkTextBase, 0.25),

    colorFill: getAlphaColor(darkTextBase, 0.18),
    colorFillSecondary: getAlphaColor(darkTextBase, 0.12),
    colorFillTertiary: getAlphaColor(darkTextBase, 0.08),
    colorFillQuaternary: getAlphaColor(darkTextBase, 0.04),

    colorBgSolid: getAlphaColor(darkTextBase, 0.95),
    colorBgSolidHover: getAlphaColor(darkTextBase, 1),
    colorBgSolidActive: getAlphaColor(darkTextBase, 0.9),

    colorBgElevated: getSolidColor(darkBgBase, 12),
    colorBgContainer: getSolidColor(darkBgBase, 8),
    colorBgLayout: getSolidColor(darkBgBase, 0),
    colorBgSpotlight: getSolidColor(darkBgBase, 26),
    colorBgBlur: getAlphaColor(darkTextBase, 0.04),

    colorBorder: getSolidColor(darkBgBase, 26),
    colorBorderSecondary: getSolidColor(darkBgBase, 19),
  }

  return {
    text: {
      DEFAULT: {
        value: {
          base: lightColors.colorText,
          _dark: darkColors.colorText,
        },
      },
      secondary: {
        value: {
          base: lightColors.colorTextSecondary,
          _dark: darkColors.colorTextSecondary,
        },
      },
      tertiary: {
        value: {
          base: lightColors.colorTextTertiary,
          _dark: darkColors.colorTextTertiary,
        },
      },
      disabled: {
        value: {
          base: lightColors.colorTextQuaternary,
          _dark: darkColors.colorTextQuaternary,
        },
      },
    },
    fill: {
      DEFAULT: {
        value: {
          base: lightColors.colorFill,
          _dark: darkColors.colorFill,
        },
      },
      secondary: {
        value: {
          base: lightColors.colorFillSecondary,
          _dark: darkColors.colorFillSecondary,
        },
      },
      tertiary: {
        value: {
          base: lightColors.colorFillTertiary,
          _dark: darkColors.colorFillTertiary,
        },
      },
      disabled: {
        value: {
          base: lightColors.colorFillQuaternary,
          _dark: darkColors.colorFillQuaternary,
        },
      },
    },
    bgSolid: {
      DEFAULT: {
        value: {
          base: lightColors.colorBgSolid,
          _dark: darkColors.colorBgSolid,
        },
      },
      hover: {
        value: {
          base: lightColors.colorBgSolidHover,
          _dark: darkColors.colorBgSolidHover,
        },
      },
      active: {
        value: {
          base: lightColors.colorBgSolidActive,
          _dark: darkColors.colorBgSolidActive,
        },
      },
      text: {
        value: {
          base: lightBgBase,
          _dark: darkBgBase,
        },
      },
    },
    surface: {
      layout: {
        value: {
          base: lightColors.colorBgLayout,
          _dark: darkColors.colorBgLayout,
        },
      },
      container: {
        value: {
          base: lightColors.colorBgContainer,
          _dark: darkColors.colorBgContainer,
        },
      },
      elevated: {
        value: {
          base: lightColors.colorBgElevated,
          _dark: darkColors.colorBgElevated,
        },
      },
      spotlight: {
        value: {
          base: lightColors.colorBgSpotlight,
          _dark: darkColors.colorBgSpotlight,
        },
      },
      blur: {
        value: {
          base: lightColors.colorBgBlur,
          _dark: darkColors.colorBgBlur,
        },
      },
    },
    border: {
      DEFAULT: {
        value: {
          base: lightColors.colorBorder,
          _dark: darkColors.colorBorder,
        },
      },
      secondary: {
        value: {
          base: lightColors.colorBorderSecondary,
          _dark: darkColors.colorBorderSecondary,
        },
      },
    },
  }
}
