import type { Tokens } from '@pandacss/dev'
import type { Color } from '../types/color'
import { createColorTokens } from '../utils/create-color-tokens'

export const presetPrimaryColors: { [key: string]: Color } = {
  red: '#F5222D',
  volcano: '#FA541C',
  orange: '#FA8C16',
  gold: '#FAAD14',
  yellow: '#FADB14',
  lime: '#A0D911',
  green: '#52C41A',
  cyan: '#13C2C2',
  blue: '#1677FF',
  geekblue: '#2F54EB',
  purple: '#722ED1',
  magenta: '#EB2F96',
  grey: '#666666',
}

export const paletteGenerator = (
  presetPrimaryColors: Record<string, Color>,
): Record<string, Tokens['colors']> => {
  // generate color tokens for each color in presetPrimaryColors
  const colorTokens = Object.entries(presetPrimaryColors).reduce(
    (acc, [colorName, colorValue]: [string, Color]) => {
      acc[colorName] = createColorTokens({ colorName, colorValue })
      return acc
    },
    {} as Record<string, Tokens['colors']>,
  )
  return colorTokens
}
