import { defineSlotRecipe } from '@pandacss/dev'

export const toast = defineSlotRecipe({
  className: 'toast',
  description: 'Styles for the Toast component',
  slots: ['root', 'icon', 'title', 'description', 'close', 'action', 'actions', 'viewport'],
  base: {
    viewport: {
      position: 'fixed',
      display: 'flex',
      flexDirection: 'column',
      padding: '{spacing.padding.block.lg}',
      gap: '{spacing.gap.component.md}',
      width: { base: '100%', md: '50vw', xl: '40vw' },
      maxWidth: '100vw',
      margin: 0,
      listStyle: 'none',
      zIndex: '2147483647',
      outline: 'none',
    },
    root: {
      width: 'fit-content',
      display: 'grid',
      gridTemplateAreas: `'icon title close' 'icon description description' 'icon actions actions'`,
      gridTemplateColumns: 'auto auto 20px',
      borderRadius: '{radii.md}',
      paddingBlock: '{spacing.padding.block.lg}',
      paddingInline: '{spacing.padding.inline.lg}',
      shadow: 'md',
    },
    title: {
      gridArea: 'title',
      textStyle: 'sm',
      fontWeight: 'medium',
      paddingRight: '{spacing.padding.block.lg}',
    },
    description: {
      gridArea: 'description',
      textStyle: 'xs',
    },
    close: {
      gridArea: 'close',
      padding: '0!',
      height: '20px!',
    },
    actions: {
      gridArea: 'actions',
      marginTop: '{spacing.padding.block.md}',
      rowGap: '{spacing.gap.component.sm}',
    },
    icon: {
      marginRight: '{spacing.padding.inline.sm}',
      color: '{colors.primary}',
    },
  },
  variants: {
    variant: {
      bordered: {
        root: {
          borderWidth: '1px',
          borderColor: '{colors.border}',
        },
      },
      shadow: {
        root: {
          borderWidth: '0',
          boxShadow: `
            hsl(206 22% 7% / 35%) -10px 12px {radii.4xl} {spacing.-3}, 
            hsl(206 22% 7% / 35%) 5px -6px {radii.4xl} {spacing.-3}
          `,
        },
      },
    },
    placement: {
      topLeft: {
        viewport: {
          top: 0,
          bottom: 'unset',
          left: 0,
          right: 'unset',
          alignItems: 'flex-start',
        },
        root: {
          _open: {
            animationStyle: 'slideInLeft',
          },
          _closed: {
            animationStyle: 'slideOutLeft',
          },
        },
      },
      topRight: {
        viewport: {
          top: 0,
          bottom: 'unset',
          left: 'unset',
          right: 0,
          alignItems: 'flex-end',
        },
        root: {
          _open: {
            animationStyle: 'slideInRight',
          },
          _closed: {
            animationStyle: 'slideOutRight',
          },
        },
      },
      bottomLeft: {
        viewport: {
          top: 'unset',
          bottom: 0,
          left: 0,
          right: 'unset',
          alignItems: 'flex-start',
        },
        root: {
          _open: {
            animationStyle: 'slideInLeft',
          },
          _closed: {
            animationStyle: 'slideOutLeft',
          },
        },
      },
      bottomRight: {
        viewport: {
          top: 'unset',
          bottom: 0,
          left: 'unset',
          right: 0,
          alignItems: 'flex-end',
        },
        root: {
          _open: {
            animationStyle: 'slideInRight',
          },
          _closed: {
            animationStyle: 'slideOutRight',
          },
        },
      },
    },
  },
  defaultVariants: {
    variant: 'bordered',
    placement: 'topRight',
  },
})
