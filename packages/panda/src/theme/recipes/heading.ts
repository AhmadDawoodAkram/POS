import { defineRecipe } from '@pandacss/dev'

export const heading = defineRecipe({
  className: 'heading',
  description: 'Heading styles',
  base: {
    fontWeight: '{fontWeights.bold}',
    lineHeight: 'tight',
    color: '{colors.text}',
    letterSpacing: '-0.02em',
    textAlign: { base: 'left', md: 'left' },
  },
  variants: {
    level: {
      1: {
        fontSize: {
          base: '{fontSizes.4xl}',
          lg: '{fontSizes.5xl}',
        },
        mt: '{spacing.3}',
        mb: '{spacing.2}',
        fontWeight: '{fontWeights.extrabold}',
      },
      2: {
        fontSize: {
          base: '{fontSizes.3xl}',
          lg: '{fontSizes.4xl}',
        },
        mt: '{spacing.2}',
        mb: '{spacing.1}',
        fontWeight: '{fontWeights.semibold}',
      },
      3: {
        fontSize: {
          base: '{fontSizes.2xl}',
          lg: '{fontSizes.3xl}',
        },
        fontWeight: '{fontWeights.semibold}',
      },
      4: {
        fontSize: {
          base: '{fontSizes.xl}',
          lg: '{fontSizes.2xl}',
        },
        fontWeight: '{fontWeights.medium}',
      },
      5: {
        fontSize: {
          base: '{fontSizes.lg}',
          lg: '{fontSizes.xl}',
        },
        fontWeight: '{fontWeights.medium}',
      },
      6: {
        fontSize: {
          base: '{fontSizes.md}',
          lg: '{fontSizes.lg}',
        },
        fontWeight: '{fontWeights.normal}',
      },
    },
    variant: {
      normal: {
        fontFamily: '{fonts.body}',
      },
      accent: {
        fontFamily: '{fonts.accent}',
      },
    },
    color: {
      default: {
        color: '{colors.text}',
      },
      secondary: {
        color: '{colors.text.secondary}',
      },
      disabled: {
        color: '{colors.text.disabled}',
      },
    },
  },
  defaultVariants: {
    level: 1,
    variant: 'normal',
    color: 'default',
  },
})
