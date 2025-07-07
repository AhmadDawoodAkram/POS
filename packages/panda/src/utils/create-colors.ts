import { TinyColor, inputToRGB, rgbToHex, rgbToHsv } from '@ctrl/tinycolor'
import type { ColorMap, ColorMapKeys } from '../types/color'

export type Palette = string[] & { primary?: string }

export type PalettesProps = Record<string, Palette>

const hueStep = 2
const saturationStep = 0.16
const saturationStep2 = 0.05
const brightnessStep1 = 0.05
const brightnessStep2 = 0.15
const lightColorCount = 5
const darkColorCount = 4

const darkColorMap = [
  { index: 7, opacity: 0.15 },
  { index: 6, opacity: 0.25 },
  { index: 5, opacity: 0.3 },
  { index: 5, opacity: 0.45 },
  { index: 5, opacity: 0.65 },
  { index: 5, opacity: 0.85 },
  { index: 4, opacity: 0.9 },
  { index: 3, opacity: 0.95 },
  { index: 2, opacity: 0.97 },
  { index: 1, opacity: 0.98 },
]

interface HsvObject {
  h: number
  s: number
  v: number
}

interface RgbObject {
  r: number
  g: number
  b: number
}

function toHsv({ r, g, b }: RgbObject): HsvObject {
  const hsv = rgbToHsv(r, g, b)
  return { h: hsv.h * 360, s: hsv.s, v: hsv.v }
}

function toHex({ r, g, b }: RgbObject): string {
  return `#${rgbToHex(r, g, b, false)}`
}

function mix(rgb1: RgbObject, rgb2: RgbObject, amount: number): RgbObject {
  const p = amount / 100
  return {
    r: (rgb2.r - rgb1.r) * p + rgb1.r,
    g: (rgb2.g - rgb1.g) * p + rgb1.g,
    b: (rgb2.b - rgb1.b) * p + rgb1.b,
  }
}

function getHue(hsv: HsvObject, i: number, light?: boolean): number {
  let hue: number
  if (Math.round(hsv.h) >= 60 && Math.round(hsv.h) <= 240) {
    hue = light ? Math.round(hsv.h) - hueStep * i : Math.round(hsv.h) + hueStep * i
  } else {
    hue = light ? Math.round(hsv.h) + hueStep * i : Math.round(hsv.h) - hueStep * i
  }
  if (hue < 0) {
    hue += 360
  } else if (hue >= 360) {
    hue -= 360
  }
  return hue
}

function getSaturation(hsv: HsvObject, i: number, light?: boolean): number {
  if (hsv.h === 0 && hsv.s === 0) {
    return hsv.s
  }
  let saturation: number
  if (light) {
    saturation = hsv.s - saturationStep * i
  } else if (i === darkColorCount) {
    saturation = hsv.s + saturationStep
  } else {
    saturation = hsv.s + saturationStep2 * i
  }
  if (saturation > 1) {
    saturation = 1
  }
  if (light && i === lightColorCount && saturation > 0.1) {
    saturation = 0.1
  }
  if (saturation < 0.06) {
    saturation = 0.06
  }
  return Number(saturation.toFixed(2))
}

function getValue(hsv: HsvObject, i: number, light?: boolean): number {
  let value: number
  if (light) {
    value = hsv.v + brightnessStep1 * i
  } else {
    value = hsv.v - brightnessStep2 * i
  }
  if (value > 1) {
    value = 1
  }
  return Number(value.toFixed(2))
}

interface Opts {
  theme?: 'dark' | 'default'
  backgroundColor?: string
}

export default function generate(color: string, opts: Opts = {}): string[] {
  const patterns: string[] = []
  const pColor = inputToRGB(color)
  for (let i = lightColorCount; i > 0; i -= 1) {
    const hsv = toHsv(pColor)
    const colorString: string = toHex(
      inputToRGB({
        h: getHue(hsv, i, true),
        s: getSaturation(hsv, i, true),
        v: getValue(hsv, i, true),
      }),
    )
    patterns.push(colorString)
  }
  patterns.push(toHex(pColor))
  for (let i = 1; i <= darkColorCount; i += 1) {
    const hsv = toHsv(pColor)
    const colorString: string = toHex(
      inputToRGB({
        h: getHue(hsv, i),
        s: getSaturation(hsv, i),
        v: getValue(hsv, i),
      }),
    )
    patterns.push(colorString)
  }

  if (opts.theme === 'dark') {
    return darkColorMap.map(({ index, opacity }) => {
      const darkColorString: string = toHex(
        mix(
          inputToRGB(opts.backgroundColor || '#141414'),
          inputToRGB(patterns[index]),
          opacity * 100,
        ),
      )
      return darkColorString
    })
  }
  return patterns
}

export const generateColorMap = (color: string, opts: Opts = {}): ColorMap => {
  const patterns = generate(color, opts)
  const keys: ColorMapKeys[] = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900]
  return keys.reduce((acc, key, index) => {
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    acc[key] = patterns[index] || patterns[patterns.length - 1]!
    return acc
  }, {} as ColorMap)
}

export const getAlphaColor = (baseColor: string, alpha: number) =>
  new TinyColor(baseColor).setAlpha(alpha).toRgbString()

export const getSolidColor = (baseColor: string, brightness: number) => {
  const instance = new TinyColor(baseColor)
  return instance.darken(brightness).toHexString()
}
