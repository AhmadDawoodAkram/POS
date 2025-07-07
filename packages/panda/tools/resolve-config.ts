import { mergeConfigs } from '@pandacss/config/merge'
import { logger } from '@pandacss/logger'
import presetBase from '@pandacss/preset-base'
import type { Config, Preset } from '@pandacss/types'

type Extendable<T> = T & { extend?: T }
type ExtendableConfig = Extendable<Config>

export function resolveConfig(config?: Config) {
  if (!config) return

  const presets = new Set<Preset>()

  if (!config.eject) {
    presets.add(presetBase)
  }

  if (config.presets) {
    config.presets.forEach((preset) => {
      if (typeof preset === 'object' && !(preset instanceof Promise)) {
        presets.add(preset)
      }
    })
  }

  config.presets = Array.from(presets)

  const mergedConfig = getResolvedConfig(config)

  if (!mergedConfig) return

  if (mergedConfig.logLevel) {
    logger.level = mergedConfig.logLevel
  }

  // No config:resolved hook, cause we can't resolve async here

  return mergedConfig
}

/**
 * Recursively merge all presets into a single config
 * PLayground won't be able to handle bundling presets
 */
function getResolvedConfig(config: ExtendableConfig) {
  const stack: ExtendableConfig[] = [config]
  const configs: ExtendableConfig[] = []
  while (stack.length > 0) {
    const current = stack.pop()
    if (!current) continue

    if (!isPlaygroundPreset(current as Preset)) {
      console.error(`Invalid preset: ${current}`)
      return
    }

    const subPresets = current.presets ?? []
    for (const subPreset of subPresets) {
      // Only handle object presets
      if (typeof subPreset === 'object' && !(subPreset instanceof Promise)) {
        stack.push(subPreset)
      }
    }

    configs.unshift(current)
  }

  const merged = mergeConfigs(configs) as Config

  // Keep the resolved presets so we can find the origin of a token
  merged.presets = configs.slice(0, -1) as Preset[]

  return merged
}

function isPlaygroundPreset(
  preset: string | Preset | Promise<Preset>,
): preset is Preset | Promise<Preset> {
  return typeof preset !== 'string'
}
