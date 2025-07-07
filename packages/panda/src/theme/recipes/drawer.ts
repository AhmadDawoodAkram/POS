import { defineSlotRecipe } from '@pandacss/dev'

export const drawer = defineSlotRecipe({
  className: 'drawer',
  description: 'Styles for the Drawer component',
  slots: [
    'root',
    'trigger',
    'portal',
    'overlay',
    'content',
    'close',
    'title',
    'description',
    'header',
    'footer',
    'body',
  ],
  base: {
    root: {},
    overlay: {
      position: 'fixed',
      zIndex: 50,
      inset: 0,
      backgroundColor: '{colors.bgSolid.hover}',
    },
    content: {
      position: 'fixed',
      zIndex: '150',
      w: '3/4',
      h: 'full',
      bg: 'surface.elevated',
      boxShadow: 'lg',
      p: '0',
      color: 'text',
      outline: 'none',
      insetY: '0',
      display: 'flex',
      flexDirection: 'column',
    },
    trigger: {},
    close: {
      position: 'absolute',
      top: 4,
      right: 4,
      cursor: 'pointer',
    },
    title: {
      fontSize: 'lg',
      fontWeight: 'semibold',
      color: 'text',
      mb: '1',
    },
    description: {
      fontSize: 'sm',
      color: 'text.secondary',
    },
    header: {
      display: 'flex',
      flexDirection: 'column',
      p: '{spacing.padding.block.lg} {spacing.padding.inline.md}',
      pb: '{spacing.padding.block.md}',
      borderBottomWidth: '1px',
      borderBottomColor: '{colors.border.secondary}',
      bg: '{colors.fill.secondary}',
      position: 'relative',
    },
    body: {
      display: 'flex',
      flexDirection: 'column',
      flex: '1',
      p: '{spacing.padding.block.lg} {spacing.padding.inline.md}',
      overflowY: 'auto',
    },
    footer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      p: '{spacing.padding.block.lg} {spacing.padding.inline.md}',
      pt: '{spacing.padding.block.md}',
      borderTopWidth: '1px',
      borderTopColor: '{colors.border.secondary}',
      mt: 'auto',
      gap: '2',
    },
  },
  variants: {
    side: {
      left: {
        content: {
          left: '0',
          animationStyle: 'drawerSlideLeft',
        },
      },
      right: {
        content: {
          right: '0',
          animationStyle: 'drawerSlideRight',
        },
      },
    },
  },
  defaultVariants: {
    side: 'left',
  },
})
