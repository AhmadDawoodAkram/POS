// panda.config.ts or a separate file like recipes/breadcrumb.recipe.ts
import { defineSlotRecipe } from '@pandacss/dev'

export const breadcrumb = defineSlotRecipe({
  className: 'breadcrumb',
  description: 'Styles for the Breadcrumb component',
  slots: ['root', 'list', 'item', 'link', 'page', 'separator', 'sperator_icon', 'ellipsis'],
  base: {
    root: {
      width: 'full',
    },
    list: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
      gap: '2px',
      wordBreak: 'break-word',
      fontSize: 'sm',
      color: 'text.secondary',
      padding: 0,
      margin: 0,
      listStyle: 'none',
    },
    item: {
      display: 'inline-flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: '{spacing.gap.inline.xs}',
      padding: 0,
      margin: 0,
    },
    link: {
      transitionProperty: 'colors',
      transitionDuration: 'fast',
      whiteSpace: 'nowrap',
      _hover: {
        color: 'text',
      },
    },
    page: {
      fontWeight: 'normal',
      color: 'text',
    },

    separator: {
      display: 'flex',
      alignItems: 'center',
      marginInline: '0.25rem',
      '& > svg': {
        width: '{sizes.icon.sm}',
        height: '{sizes.icon.sm}',
        color: 'text.secondary',
      },
    },
    sperator_icon: {
      width: '{sizes.icon.sm}',
      height: '{sizes.icon.sm}',
      color: 'text.secondary',
    },
    ellipsis: {
      display: 'flex',
      height: '{sizes.icon.lg}',
      width: '{sizes.icon.lg}',
      alignItems: 'center',
      justifyContent: 'center',
      '& > svg': {
        width: '{sizes.icon.sm}',
        height: '{sizes.icon.sm}',
      },
    },
  },
})
