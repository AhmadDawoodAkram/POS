import { defineRecipe } from '@pandacss/dev'

export const textarea = defineRecipe({
  className: 'textarea',
  description: 'Styles for the Textarea component',
  base: {
    display: 'flex',
    minH: '80px',
    w: 'full',
    rounded: '{radii.md}',
    border: '1px solid {colors.border}',
    bg: '{colors.surface.elevated}',
    px: '{spacing.padding.inline.md}',
    py: '{spacing.padding.block.md}',
    textStyle: 'sm',
    focusRingOffsetColor: '{colors.fill.secondary}',

    _hover: {
      borderColor: '{colors.primary.hover}',
    },
    _focus: {
      borderColor: '{colors.primary.hover}',
      shadow: '0 0 0 2px {colors.primary.bgHover}',
    },
    _placeholder: {
      color: '{colors.text.secondary}',
    },

    _focusVisible: {
      outline: '2px solid transparent',
      outlineOffset: '2px',
      focusRingWidth: '2',
      focusRingColor: '{colors.primary.border}',
      focusRingOffsetWidth: '2',
    },

    _disabled: {
      cursor: 'not-allowed',
      opacity: '0.5',
      color: '{colors.text.disabled}',
      bg: '{colors.fill.disabled}',
      borderColor: '{colors.border.secondary}',
    },
  },
})
