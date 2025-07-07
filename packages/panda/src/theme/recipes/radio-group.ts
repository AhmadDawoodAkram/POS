import { defineSlotRecipe } from '@pandacss/dev'

export const radioGroup = defineSlotRecipe({
  className: 'radioGroup',
  description: 'Styles for the RadioGroup component',
  slots: ['root', 'item', 'indicator', 'icon'],
  base: {
    root: {
      display: 'grid',
      gap: '{spacing.gap.inline.sm}',
    },
    item: {
      aspectRatio: 'square',
      h: '{sizes.selectionControl.md}',
      w: '{sizes.selectionControl.md}',
      rounded: 'full',
      border: '1px solid {colors.border}',
      color: '{colors.text}',
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
      },
    },
    indicator: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
      _after: {
        content: '""',
        display: 'block',
        w: '57%',
        h: '57%',
        borderRadius: '50%',
        backgroundColor: '{colors.primary}',
      },
    },
    icon: {
      h: '{sizes.icon.sm}',
      w: '{sizes.icon.sm}',
      fill: 'current',
      color: 'current',
    },
  },
  variants: {
    size: {
      sm: {
        root: {
          gap: '{spacing.gap.inline.xs}',
        },
        item: {
          h: '{sizes.selectionControl.sm}',
          w: '{sizes.selectionControl.sm}',
        },
      },

      md: {
        root: {
          gap: '{spacing.gap.inline.sm}',
        },
        item: {
          h: '{sizes.selectionControl.md}',
          w: '{sizes.selectionControl.md}',
        },
      },
      lg: {
        root: {
          gap: '{spacing.gap.inline.md}',
        },
        item: {
          h: '{sizes.selectionControl.lg}',
          w: '{sizes.selectionControl.lg}',
        },
      },
    },
  },
})
