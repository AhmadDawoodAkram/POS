import type { NamedColor } from './color'

export interface ThemeColorPalette {
  primary: NamedColor
  success: NamedColor
  warning: NamedColor
  error: NamedColor
  info: NamedColor
}

export interface ThemeOptions {
  colors: ThemeColorPalette
  baseRadius: number
}
