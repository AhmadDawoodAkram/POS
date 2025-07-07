import assert from 'node:assert'
import fs from 'node:fs'
import { test } from 'node:test'
import { getResolvedConfig } from '@pandacss/config'
import { TokenDictionary } from '@pandacss/token-dictionary'
import type { Config, Preset } from '@pandacss/types'
import { presetPrimaryColors } from '../src/colors/paletteGenerator'
import { createPreset } from '../src/create-preset'
import type { ThemeColorPalette } from '../src/types'
import { generateTokenDocs } from './generate-token-docs'
import { resolveConfig } from './resolve-config'

test('generateThemeColors', async () => {
  //gave error on build time, defined defaults
  const defaultColors = {
    blue: '#1677ff',
    red: '#f5222d',
    green: '#52c41a',
    yellow: '#fadb14',
  }

  const themeColorPalette: ThemeColorPalette = {
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

  const loadPandaConfig = await resolveConfig(preset)
  console.log(loadPandaConfig)
  const { tokens, semanticTokens } = loadPandaConfig?.theme ?? {}
  const tokenDict = new TokenDictionary({
    tokens,
    semanticTokens,
  })
  tokenDict.registerTokens()
  tokenDict.build()

  console.log(tokenDict)
  const tokenDocs = generateTokenDocs(tokenDict.allTokens)
  fs.writeFileSync('token-docs.md', tokenDocs)
})
