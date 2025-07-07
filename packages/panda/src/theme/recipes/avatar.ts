import { defineSlotRecipe } from '@pandacss/dev'

export const avatar = defineSlotRecipe({
  className: 'avatar',
  description: 'Styles for the Avatar component',
  slots: ['root', 'image', 'fallback'],
  base: {
    root: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      verticalAlign: 'middle',
      overflow: 'hidden',
      userSelect: 'none',
      backgroundColor: '{colors.border.secondary}',
    },
    image: {
      width: '{full}',
      height: '{full}',
      objectFit: 'cover',
      borderRadius: 'inherit',
    },
    fallback: {
      width: '{full}',
      height: '{full}',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '{colors.text}',
      fontWeight: '{medium}',
    },
  },
  variants: {
    size: {
      sm: {
        root: {
          width: '{sizes.8}',
          height: '{sizes.8}',
        },
        fallback: {
          textStyle: '{sm}',
        },
      },
      md: {
        root: {
          width: '{sizes.10}',
          height: '{sizes.10}',
        },
        fallback: {
          textStyle: '{md}',
        },
      },
      lg: {
        root: {
          width: '{sizes.12}',
          height: '{sizes.12}',
        },
        fallback: {
          textStyle: '{lg}',
        },
      },
      xl: {
        root: {
          width: '{sizes.14}',
          height: '{sizes.14}',
        },
        fallback: {
          textStyle: '{xl}',
        },
      },
    },
    shape: {
      circle: {
        root: {
          borderRadius: '{full}',
        },
      },
      square: {
        root: {
          borderRadius: '{md}',
        },
      },
    },
  },
  defaultVariants: {
    size: 'md',
    shape: 'circle',
  },
})
