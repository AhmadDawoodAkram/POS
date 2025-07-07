import { defineSlotRecipe } from '@pandacss/dev'

export const slider = defineSlotRecipe({
  className: 'slider',
  description: 'Styles for the Slider component',
  slots: ['root', 'track', 'range', 'thumb'],
  base: {
    root: {
      position: 'relative',
      display: 'flex',
      w: 'full',
      touchAction: 'none',
      userSelect: 'none',
      alignItems: 'center',
    },
    track: {
      position: 'relative',
      h: '1',
      w: 'full',
      flexGrow: '1',
      overflow: 'hidden',
      rounded: 'full',
      bg: '{colors.fill.secondary}',
    },
    range: {
      position: 'absolute',
      h: 'full',
      bg: '{colors.primary}',
    },
    thumb: {
      display: 'block',
      h: '{sizes.icon.sm}',
      w: '{sizes.icon.sm}',
      cursor: 'pointer',
      rounded: 'full',
      borderWidth: '2px',
      borderStyle: 'solid',
      borderColor: '{colors.primary}',
      bg: '{colors.surface.elevated}',
      focusRingOffsetColor: '{colors.surface.elevated}',
      transition: 'colors',

      _focusVisible: {
        outline: '2px solid transparent',
        outlineOffset: '2px',
        focusRingWidth: '2',
        focusRingColor: 'ring',
        focusRingOffsetWidth: '2',
      },

      _disabled: {
        pointerEvents: 'none',
        opacity: '0.5',
      },
    },
  },
})
