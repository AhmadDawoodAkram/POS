import type { Tokens } from '@pandacss/dev'
import type { ColorMapKeys, NamedColor } from '../types/color'
import generate from './create-colors'

export const createColorTokens = (color: NamedColor): Tokens['colors'] => {
  const defaultShades = generate(color.colorValue)
  const darkShades = generate(color.colorValue, { theme: 'dark' })
  const scale: ColorMapKeys[] = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900]

  const tokens = defaultShades.reduce(
    (acc, shade, index) => {
      const tokenName = `${color.colorName}.${scale[index]}`

      //ensure we have a dark shade at this index
      // biome-ignore lint/style/noNonNullAssertion: <explanation>
      const darkShade = darkShades[index]!

      acc[tokenName] = {
        DEFAULT: { value: shade },
        dark: { value: darkShade },
      }

      return acc
    },
    {} as Record<string, { DEFAULT: { value: string }; dark?: { value: string } }>,
  )

  return tokens
}
