import type { SemanticTokens, Tokens } from '@pandacss/dev'

export type Color = string
export type NamedColor = {
  colorName: string
  colorValue: Color
}

export type ColorMapKeys = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900
export type ColorMap = {
  [key in ColorMapKeys]: Color
}

export interface ThemeColorTokens {
  tokens: Tokens['colors'][]
  semanticTokens: SemanticTokens['colors']
}
