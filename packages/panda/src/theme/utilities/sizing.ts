import type { UtilityConfig } from '@pandacss/types'

export const sizing: UtilityConfig = {
  sizing: {
    className: 'sizing',
    values: 'sizing',
    shorthand: ['size', 'sz'],
    transform: (value: string) => {
      return {
        width: value,
        height: value,
      }
    },
  },
}
