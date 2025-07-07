import assert from 'node:assert'
import fs from 'node:fs'
import { test } from 'node:test'
import { generateThemeColors } from '../colors/colors'
import { presetPrimaryColors } from '../colors/paletteGenerator'
import { createColorTokens } from './create-color-tokens'
test('createColorTokens', () => {
  const tokens = createColorTokens({ colorName: 'red', colorValue: '#F5222D' })
  console.log(tokens)
  // const expectedTokens = {
  //   'red.50': { value: '#fff1f0' },
  //   'red.100': { value: '#ffccc7' },
  //   'red.200': { value: '#ffa39e' },
  //   'red.300': { value: '#ff7875' },
  //   'red.400': { value: '#ff4d4f' },
  //   'red.500': { value: '#f5222d' },
  //   'red.600': { value: '#cf1322' },
  //   'red.700': { value: '#a8071a' },
  //   'red.800': { value: '#820014' },
  //   'red.900': { value: '#5c0011' },
  // }

  // assert.deepStrictEqual(
  //   tokens,
  //   expectedTokens,
  //   'The color tokens do not match the expected output',
  // )
})

test('createThemeColors', () => {
  const themeColors = generateThemeColors({
    primary: { colorName: 'blue', colorValue: presetPrimaryColors['blue'] },
    error: { colorName: 'red', colorValue: presetPrimaryColors['red'] },
    success: {
      colorName: 'green',
      colorValue: presetPrimaryColors['green'],
    },
    warning: {
      colorName: 'yellow',
      colorValue: presetPrimaryColors['yellow'],
    },
    info: {
      colorName: 'cyan',
      colorValue: presetPrimaryColors['cyan'],
    },
  })

  const themeColorsString = JSON.stringify(themeColors)
  // Correct the path construction
  const __dirname = import.meta.dirname
  const filePath = `${__dirname}/themeColors.json`.replace(/^\/([A-Za-z]:)/, '$1')
  fs.writeFileSync(filePath, themeColorsString)
})
