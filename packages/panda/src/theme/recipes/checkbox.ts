import { defineSlotRecipe } from '@pandacss/dev'

export const checkbox = defineSlotRecipe({
  className: 'checkbox',
  description: 'Styles for the Checkbox component',
  slots: ['root', 'indicator'],
  base: {
    root: {
      flexShrink: '0',
      rounded: 'sm',
      border: '1px solid {colors.border}',
      cursor: 'pointer',
      boxShadow: '{shadows.insetMinimal}',
      _hover: {
        borderColor: '{colors.primary.bgHover}',
      },
      _focusVisible: {
        outline: '1px solid {colors.primary.bgHover}',
        outlineOffset: '2px',
      },

      _disabled: {
        cursor: 'not-allowed',
        opacity: '0.5',
        bg: '{colors.fill.disabled}',
        _hover: {
          borderColor: '{colors.border}',
        },
      },
      _checked: {
        bg: '{colors.primary}',
      },
      _indeterminate: {
        bg: '{colors.primary}',
      },
    },
    indicator: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '{colors.surface.elevated}',
    },
  },
  variants: {
    size: {
      sm: {
        root: {
          h: '{sizes.selectionControl.sm}',
          w: '{sizes.selectionControl.sm}',
        },
      },
      md: {
        root: {
          h: '{sizes.selectionControl.md}',
          w: '{sizes.selectionControl.md}',
        },
      },
      lg: {
        root: {
          h: '{sizes.selectionControl.lg}',
          w: '{sizes.selectionControl.lg}',
        },
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
})
