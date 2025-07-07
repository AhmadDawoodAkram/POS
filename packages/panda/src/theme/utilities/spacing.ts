import type { UtilityConfig } from '@pandacss/types'

export const spacing: UtilityConfig = {
  spaceX: {
    className: 'space_x',
    values: 'spacing',
    transform: (value: string) => {
      return {
        '& > * + *': {
          marginLeft: value,
        },
      }
    },
  },
  spaceY: {
    className: 'space_y',
    values: 'spacing',
    transform: (value: string) => {
      return {
        '& > * + *': {
          marginTop: value,
        },
      }
    },
  },
}
