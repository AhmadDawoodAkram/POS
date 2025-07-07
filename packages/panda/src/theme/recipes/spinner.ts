import { defineRecipe } from '@pandacss/dev'

export const spinner = defineRecipe({
  className: 'spinner',
  description: 'Styles for the spinner',
  base: {
    display: 'inline-block',
    w: '{sizes.icon.sm}',
    h: '{sizes.icon.sm}',
    borderBottomColor: 'transparent !important',
    border: '4px solid {colors.primary}',

    borderRadius: '50%',
    boxSizing: 'border-box',
    animation: 'rotation 1s linear infinite',
  },
  variants: {
    size: {
      sm: {
        w: '{sizes.icon.sm}',
        h: '{sizes.icon.sm}',
      },
      md: {
        w: '{sizes.icon.md}',
        h: '{sizes.icon.md}',
      },
      lg: {
        w: '{sizes.icon.lg}',
        h: '{sizes.icon.lg}',
      },
    },
    variant: {
      default: {},
      thin: {
        borderWidth: '2px',
      },
    },
    color: {
      primary: {
        borderColor: '{colors.primary}',
      },
      default: {
        borderColor: '{colors.fill}',
      },
      solid: {
        borderColor: '{colors.bgSolid.text}',
      },
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'default',
    color: 'default',
  },
})
