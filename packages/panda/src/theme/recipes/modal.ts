import { defineSlotRecipe } from '@pandacss/dev'

export const modal = defineSlotRecipe({
  className: 'modal',
  description: 'Styles for the Modal component',
  slots: [
    'root',
    'trigger',
    'portal',
    'overlay',
    'content',
    'header',
    'footer',
    'title',
    'description',
    'action',
    'cancel',
  ],
  base: {
    overlay: {
      position: 'fixed',
      inset: '0',
      zIndex: 50,
      bg: '{colors.surface.spotlight}',
      bgBlur: 'sm',
    },
    content: {
      position: 'fixed',
      left: '50%',
      top: '50%',
      zIndex: 50,
      display: 'grid',
      w: 'full',
      maxWidth: '{sizes.lg}',
      transform: 'translate(-50%, -50%)',
      textStyle: 'sm',
      gap: '{spacing.gap.component.sm}',
      bg: 'background',
      p: '{spacing.padding.block.lg}',
      boxShadow: 'lg',
      border: '1px solid {colors.border}',
      animationStyle: 'modalContentShow',

      _closed: {
        animationStyle: 'modalContentHide',
      },

      sm: {
        rounded: '{radii.lg}',
      },

      "&[data-slot='command-dialog-content']": {
        p: 0,
        border: 'none',
        w: 'min-content',
      },
    },
    header: {
      display: 'flex',
      flexDirection: 'column',
      textAlign: 'center',
      gap: '2px',
      sm: {
        textAlign: 'left',
      },
    },
    footer: {
      display: 'flex',
      flexDirection: 'column-reverse',

      sm: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        spaceX: '{spacing.gap.inline.sm}',
      },
    },
    title: {
      textStyle: 'lg',
      fontWeight: 'semibold',
    },
    description: {
      textStyle: 'xs',
      color: '{colors.text.secondary}',
    },
    cancel: {
      mt: {
        base: '{spacing.gap.component.sm}',
        sm: '0',
      },
    },
  },
})
