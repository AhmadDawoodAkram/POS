import { defineConfig } from '@pandacss/dev'
import { presetPrimaryColors } from './src/colors/paletteGenerator'
import { createPreset } from './src/create-preset'
import type { ThemeColorPalette } from './src/types'

//gave error on build time, defined defaults
const defaultColors = {
  blue: '#1677ff',
  red: '#f5222d',
  green: '#52c41a',
  yellow: '#fadb14',
}

export const themeColorPalette: ThemeColorPalette = {
  primary: {
    colorName: 'blue',
    colorValue: presetPrimaryColors['blue'] ?? defaultColors.blue,
  },
  error: {
    colorName: 'red',
    colorValue: presetPrimaryColors['red'] ?? defaultColors.red,
  },
  success: {
    colorName: 'green',
    colorValue: presetPrimaryColors['green'] ?? defaultColors.green,
  },
  warning: {
    colorName: 'yellow',
    colorValue: presetPrimaryColors['yellow'] ?? defaultColors.yellow,
  },
  info: {
    colorName: 'blue',
    colorValue: presetPrimaryColors['blue'] ?? defaultColors.blue,
  },
}

const preset = createPreset({ colors: themeColorPalette, baseRadius: 2 })

export default defineConfig({
  preflight: true,
  presets: [preset],
  include: ['./src/**/*.{js,jsx,ts,tsx,vue}', './src/stories/**/*.{js,jsx,ts,tsx,vue}'],
  jsxFramework: 'react',
  jsxStyleProps: 'minimal',
  outdir: 'styled-system',
})
