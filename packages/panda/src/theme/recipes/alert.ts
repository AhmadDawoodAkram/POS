import { defineRecipe } from '@pandacss/dev'

export const alert = defineRecipe({
  className: 'alert',
  description: 'Styles for the Alert component',
  base: {
    position: 'relative',
    w: 'full',
    rounded: '{radii.md}',
    border: '1px solid {colors.border}',
    p: '{spacing.padding.block.md}',

    '&:has(svg)': {
      pl: '11',
    },

    '& > svg + div': {
      translateY: '-3px',
    },

    '& > svg': {
      position: 'absolute',
      left: '4',
      top: '4',
      color: 'foreground',
      h: '4',
      w: '4',
    },
  },
  variants: {
    variant: {
      default: {
        bg: '{colors.background}',
        color: '{colors.text}',
      },
      info: {
        bca: '{colors.info.bg}',
        bg: '{colors.info.bg}',
        borderColor: '{colors.info.border}',
        color: '{colors.text}',
        '& > svg': {
          color: '{colors.info.active}',
        },
      },
      error: {
        bca: '{colors.error.bg}',
        bg: '{colors.error.bg}',
        borderColor: '{colors.error.border}',
        color: '{colors.text}',
        '& > svg': {
          color: '{colors.error.active}',
        },
      },
      warning: {
        bca: '{colors.warning.bg}',
        bg: '{colors.warning.bg}',
        borderColor: '{colors.warning.border}',
        color: '{colors.text}',
        '& > svg': {
          color: '{colors.warning.active}',
        },
      },
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

export const alertTitle = defineRecipe({
  className: 'alertTitle',
  description: 'Styles for the AlertTitle component',
  base: {
    mb: '1',
    color: '{colors.text}',
    fontWeight: 'medium',
    leading: 'none',
    tracking: 'tight',
  },
})

export const alertDescription = defineRecipe({
  className: 'alertDescription',
  description: 'Styles for the AlertDescription component',
  base: {
    textStyle: 'sm',
    color: '{colors.text}',

    '& p': {
      leading: 'relaxed',
    },
  },
})
