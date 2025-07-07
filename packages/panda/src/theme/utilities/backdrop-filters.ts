import type { UtilityConfig } from '@pandacss/types'

const blurValues = {
  none: 'blur(0)',
  sm: 'blur(2px)',
  base: 'blur(4px)',
  md: 'blur(8px)',
  lg: 'blur(12px)',
  xl: 'blur(16px)',
  '2xl': 'blur(24px)',
  '3xl': 'blur(32px)',
} as const

export const backdropFilter: UtilityConfig = {
  backdropFilter: {
    property: 'backdropFilter',
    shorthand: ['bgBlur'],
    className: 'bg_blur',
    values: blurValues,
    transform: (value) => {
      return {
        backdropFilter: value,
      }
    },
  },
}
