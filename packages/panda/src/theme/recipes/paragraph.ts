import { defineRecipe } from '@pandacss/dev'

export const paragraph = defineRecipe({
  className: 'paragraph',
  description: 'Styles for the Paragraph component',
  base: {
    fontSize: {
      base: '{fontSizes.md}',
      lg: '{fontSizes.lg}',
      '2xl': '{fontSizes.xl}',
    },
    lineHeight: 'relaxed',
    fontFamily: 'body',
    textAlign: { base: 'left', md: 'left' },
    display: 'block',
  },
  variants: {
    size: {
      base: {
        fontSize: {
          base: '{fontSizes.sm}',
          lg: '{fontSizes.md}',
          '2xl': '{fontSizes.lg}',
        },
      },
      extraLarge: {
        fontSize: {
          base: '{fontSizes.xl}',
          lg: '{fontSizes.2xl}',
          '2xl': '{fontSizes.3xl}',
        },
        fontWeight: 'normal',
        lineHeight: 'snug',
        letterSpacing: '-0.01em',
      },
      large: {
        fontSize: {
          base: '{fontSizes.md}',
          lg: '{fontSizes.lg}',
          '2xl': '{fontSizes.xl}',
        },
      },
      compact: {
        fontSize: {
          base: '{fontSizes.xs}',
          lg: '{fontSizes.sm}',
          '2xl': '{fontSizes.md}',
        },
      },
      subscript: {
        fontSize: {
          base: '{fontSizes.2xs}',
          lg: '{fontSizes.xs}',
          '2xl': '{fontSizes.sm}',
        },
      },
    },
    color: {
      default: { color: '{colors.text}' },
      secondary: { color: '{colors.text.secondary}' },
      tertiary: { color: '{colors.text.tertiary}' },
      success: { color: '{colors.success}' },
      warning: { color: '{colors.warning}' },
      error: { color: '{colors.error}' },
      disabled: { color: '{colors.text.disabled}' },
    },
    textAlign: {
      left: { textAlign: 'left' },
      center: { textAlign: 'center' },
      right: { textAlign: 'right' },
      justify: { textAlign: 'justify' },
    },
    textStyle: {
      italic: { fontStyle: 'italic' },
      bold: { fontWeight: 'bold' },
      underline: { textDecoration: 'underline' },
    },
  },
  defaultVariants: {
    color: 'default',
    size: 'base',
  },
})
