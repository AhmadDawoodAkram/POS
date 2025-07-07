import { defineSlotRecipe } from '@pandacss/dev'

export const tooltip = defineSlotRecipe({
  className: 'tooltip',
  description: 'Styles for the Tooltip component',
  slots: ['root', 'trigger', 'content', 'arrow'],
  base: {
    content: {
      zIndex: 50,
      overflow: 'hidden',
      rounded: '{radii.lg}',
      bg: '{colors.surface.elevated}',
      px: '{spacing.padding.inline.sm}',
      py: '{spacing.padding.block.sm}',
      color: '{colors.text}',
      boxShadow: '{shadows.lg}',
      animateIn: true,
      textStyle: 'xs',
      fadeIn: 10,
      zoomIn: 95,
      maxWidth: 250,

      _closed: {
        animateOut: true,
        fadeOut: 0,
        zoomOut: 95,
      },

      _top: {
        slideInFromBottom: '2',
      },

      _bottom: {
        slideInFromTop: '2',
      },

      _left: {
        slideInFromRight: '2',
      },

      _right: {
        slideInFromLeft: '2',
      },
    },
    arrow: {
      fill: '{colors.surface.elevated}',
    },
  },
})
