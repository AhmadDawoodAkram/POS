import { defineSlotRecipe } from '@pandacss/dev'

export const select = defineSlotRecipe({
  className: 'select',
  description: 'Styles for the Select component',
  slots: [
    'root',
    'group',
    'value',
    'trigger',
    'viewport',
    'content',
    'label',
    'item',
    'itemIndicator',
    'separator',
  ],
  base: {
    trigger: {
      display: 'flex',
      h: '{sizes.controlHeight.md}',
      w: 'full',
      alignItems: 'center',
      justifyContent: 'space-between',
      rounded: '{radii.md}',
      border: '1px solid {colors.border}',
      bg: '{colors.surface.elevated}',
      px: '{spacing.padding.inline.md}',
      py: '{spacing.padding.block.md}',
      textStyle: 'sm',
      cursor: 'pointer',

      _placeholder: {
        color: '{colors.text.secondary}',
      },
      _hover: {
        borderColor: '{colors.primary.hover}',
      },
      _focus: {
        borderColor: '{colors.primary.hover}',
        shadow: '0 0 0 2px {colors.primary.bgHover}',
        outline: '2px solid {colors.primary.bgHover}',
        outlineOffset: '2px',
      },

      _disabled: {
        cursor: 'not-allowed',
        color: '{colors.text.disabled}',
        bg: '{colors.fill.disabled}',
        borderColor: '{colors.border.secondary}',
        _hover: {
          borderColor: '{colors.border.secondary}',
        },
      },
    },
    viewport: {
      p: '1',

      '&[data-position=popper]': {
        h: 'var(--radix-select-trigger-height)',
        w: 'full',
        minW: 'var(--radix-select-trigger-width)',
      },
    },
    content: {
      position: 'relative',
      zIndex: 50,
      minW: '8rem',
      overflow: 'hidden',
      rounded: '{radii.md}',
      border: '1px solid {colors.border}',
      bg: '{colors.surface.elevated}',
      color: '{colors.text}',
      shadow: 'md',

      animationStyle: 'slideFadeIn',
      animationDuration: '{durations.normal}',
    },
    label: {
      color: '{colors.text.tertiary}',
      fontSize: 'sm',
      py: '{spacing.padding.block.xs}',
      px: '{spacing.padding.block.sm}',

      fontWeight: 'medium',
    },
    item: {
      position: 'relative',
      display: 'flex',
      cursor: 'default',
      userSelect: 'none',
      alignItems: 'center',
      rounded: '{radii.sm}',
      py: '{spacing.padding.block.md}',
      pl: '{spacing.gap.component.lg}',
      pr: '{spacing.gap.inline.sm}',
      textStyle: 'sm',
      outline: '2px solid transparent',

      _focus: {
        bg: '{colors.primary.bg}',
        color: '{colors.text.primary}',
      },

      ['&[data-disabled]']: {
        pointerEvents: 'none',
        opacity: '0.5',
      },
    },
    itemIndicator: {
      position: 'absolute',
      left: '{spacing.padding.inline.xs}',
      display: 'flex',
      h: '{sizes.iconSize.sm}',
      w: '{sizes.iconSize.sm}',
      alignItems: 'center',
      justifyContent: 'center',
    },
    separator: {
      mx: '-1',
      my: '1',
      h: '1px',
      bg: '{colors.border.secondary}',
    },
  },
  variants: {
    size: {
      sm: {
        trigger: {
          h: '{sizes.controlHeight.sm}',
          textStyle: 'sm',
          px: '{spacing.padding.inline.sm}',
          py: '{spacing.padding.block.sm}',
        },
        item: {
          py: '{spacing.padding.block.sm}',
        },
      },
      md: {
        trigger: {
          h: '{sizes.controlHeight.md}',
          textStyle: 'sm',
          px: '{spacing.padding.inline.md}',
          py: '{spacing.padding.block.md}',
        },
        item: {
          py: '{spacing.padding.block.md}',
        },
      },
      lg: {
        trigger: {
          h: '{sizes.controlHeight.lg}',
          textStyle: 'md',
          px: '{spacing.padding.inline.md}',
          py: '{spacing.padding.block.md}',
        },
      },
    },
  },
})
