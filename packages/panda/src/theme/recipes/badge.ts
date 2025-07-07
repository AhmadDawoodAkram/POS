import { defineRecipe } from '@pandacss/dev'

export const badge = defineRecipe({
  className: 'badge',
  description: 'Styles for the Badge component',
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    rounded: 'full',
    border: 'base',
    px: '{spacing.padding.inline.md}',
    py: '{spacing.padding.block.sm}',
    textStyle: 'xs',
    fontWeight: 'semibold',
    transition: 'colors',
  },
  variants: {
    variant: {
      default: {
        borderColor: '{colors.border.secondary}',
        bg: '{colors.fill.secondary}',
        color: '{colors.text}',

        _hover: {
          bg: '{colors.fill.secondary}/80',
        },
      },
      primary: {
        borderColor: '{colors.primary.border}',
        bg: '{colors.primary.bg}',
        color: '{colors.text}',

        _hover: {
          borderColor: '{colors.primary.borderHover}',
          bg: '{colors.primary.bgHover}',
        },
      },
      error: {
        borderColor: '{colors.error.border}',
        bg: '{colors.error.bg}',
        color: '{colors.text}',

        _hover: {
          borderColor: '{colors.error.borderHover}',
          bg: '{colors.error.bgHover}',
        },
      },
    },
    size: {
      sm: {
        px: '{spacing.padding.inline.sm}',
        py: '{spacing.padding.block.xs}',
      },
      md: {
        px: '{spacing.padding.inline.md}',
        py: '{spacing.padding.block.sm}',
      },
      lg: {
        textStyle: 'md',
        px: '{spacing.padding.inline.lg}',
        py: '{spacing.padding.block.md}',
      },
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})
