import { defineRecipe } from '@pandacss/dev'

export const button = defineRecipe({
  className: 'button',
  description: 'The styles for the Button component',
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    textStyle: 'sm',
    transition: 'background-color 0.2s ease',
    cursor: 'pointer',
    '&:disabled': {
      cursor: 'not-allowed',
      opacity: 0.6,
    },
    borderRadius: '{radii.md}',
    height: '{sizes.controlHeight.md}',
    boxShadow: '{shadows.minimal}',

    '& [data-slot="button-content-wrapper"]': {
      w: 'full',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 2,
    },
  },
  variants: {
    variant: {
      primary: {
        bg: '{colors.primary}',
        color: '{colors.bgSolid.text}',
        _hover: {
          bg: '{colors.primary.hover}',
          _active: {
            bg: '{colors.primary.active}',
          },
        },
        '& .spinner': {
          borderColor: '{colors.bgSolid.text}',
        },
      },
      outlined: {
        bg: 'transparent',
        border: '1px solid {colors.border}',
        color: '{colors.text}',
        _hover: {
          color: '{colors.primary}',
          borderColor: '{colors.primary.borderHover}',
          _active: {
            color: '{colors.primary.active}',
            borderColor: '{colors.primary.borderActive}',
          },
        },
      },
      dashed: {
        bg: 'transparent',
        border: '1px dashed {colors.border}',
        color: '{colors.text}',
        _hover: {
          color: '{colors.primary}',
          borderColor: '{colors.primary.borderHover}',
          _active: {
            color: '{colors.primary.active}',
            borderColor: '{colors.primary.borderActive}',
          },
        },
      },
      default: {
        bg: '{colors.primary.bg}',
        color: '{colors.primary.text}',
        _hover: {
          bg: '{colors.primary.bgHover}',
          color: '{colors.primary.textHover}',
          _active: {
            bg: '{colors.primary.bgActive}',
            color: '{colors.primary.textActive}',
          },
        },
      },
      text: {
        bg: 'transparent',
        color: '{colors.text}',
        boxShadow: 'none',
        _hover: {
          bg: '{colors.fill.secondary}',
          color: '{colors.text.hover}',
        },
      },
      link: {
        bg: 'transparent',
        color: '{colors.primary}',
        boxShadow: 'none',
        _hover: {
          color: '{colors.primary.hover}',
        },
      },
    },
    size: {
      sm: {
        textStyle: 'sm',
        paddingX: '{spacing.padding.inline.sm}',
        paddingY: '{spacing.padding.block.sm}',
        height: '{sizes.controlHeight.sm}',
      },
      md: {
        textStyle: 'sm',
        paddingX: '{spacing.padding.inline.md}',
        paddingY: '{spacing.padding.block.md}',
        height: '{sizes.controlHeight.md}',
      },
      lg: {
        textStyle: 'md',
        paddingX: '{spacing.padding.inline.lg}',
        paddingY: '{spacing.padding.block.lg}',
        height: '{sizes.controlHeight.lg}',
      },
      icon: {
        width: '40px',
        height: '40px',
      },
    },
    shape: {
      default: {
        borderRadius: '{radii.md}',
      },
      rounded: {
        borderRadius: '{radii.4xl}',
      },
      circle: {
        borderRadius: '{radii.full}',
      },
    },
    width: {
      full: {
        width: '{sizes.full}',
      },
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
})
