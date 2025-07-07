import { defineSlotRecipe } from '@pandacss/dev'

export const daypicker = defineSlotRecipe({
  className: 'daypicker',
  description: 'Styles for the DayPicker component',
  slots: [
    'root',
    'months',
    'month',
    'month_caption',
    'weekdays',
    'weekday',
    'caption',
    'caption_label',
    'nav',
    'button_previous',
    'button_next',
    'month_grid',
    'day',
    'selected',
    'today',
    'outside',
    'disabled',
    'range_start',
    'range_middle',
    'range_end',
    'hidden',
    'week',
  ],
  base: {
    root: { w: 'max-content', m: '{spacing.gap.component.sm}' },
    months: {
      display: 'flex',
      flexDirection: 'column',
    },
    month: {
      w: 'full',
      spaceY: '{spacing.gap.component.md}',
    },
    month_caption: {
      position: 'relative',
      h: '7',
      mx: '10',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      pt: '1',
    },
    caption: {
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      pt: '1',
    },
    caption_label: {
      textStyle: 'sm',
      fontWeight: 'medium',
    },
    nav: {
      position: 'relative',
      display: 'flex',
      alignItems: 'flex-start',
      w: 'full',
    },
    button_previous: {
      position: 'absolute',
      left: '2',
      h: '7',
      w: '7',
      px: '0',
      py: '0',
    },
    button_next: {
      position: 'absolute',
      right: '2',
      h: '7',
      w: '7',
      px: '0',
      py: '0',
    },
    month_grid: {
      mt: '4',
      mx: 'auto',
    },

    day: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      h: '7',
      w: '8',
      px: '0',
      py: '0',
      fontSize: 'sm',
      fontWeight: 'normal',
      borderRadius: '{radii.md}',
      '&[aria-selected="true"]': {
        opacity: '1',
      },
    },
    week: {
      display: 'flex',
      flexDirection: 'row',
      mt: '2',
      w: 'max-content',
    },
    weekday: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      w: '8',
      px: '0',
      py: '0',
      textStyle: 'sm',
      color: '{colors.text.tertiary}',
    },
    weekdays: {
      display: 'flex',
      flexDirection: 'row',
      mt: '2',
      w: 'max-content',
    },
    selected: {
      bg: '{colors.primary}',
      color: '{colors.bgSolid.text}',

      _hover: {
        bg: '{colors.primary}',
        color: '{colors.bgSolid.text}',
      },

      _focus: {
        bg: '{colors.primary}',
        color: '{colors.bgSolid.text}',
      },
    },
    today: {
      border: '1px solid {colors.primary.border}',
    },
    outside: {
      color: '{colors.text.secondary}',
    },
    disabled: {
      color: '{colors.text.disabled}',
    },
    range_start: {
      roundedRight: '0',
      _selected: {
        roundedLeft: '{radii.md}',
      },
      _hover: {
        bg: '{colors.primary.hover}',
        color: '{colors.text}',
      },
    },
    range_middle: {
      borderRadius: '0',
      _selected: {
        bg: '{colors.primary.bg}',
        color: '{colors.text}',

        _hover: {
          bg: '{colors.primary.hover}',
          color: '{colors.text}',
        },
      },
    },
    range_end: {
      roundedLeft: '0',
      roundedRight: '{radii.md}',
      color: '{colors.bgSolid.text}',
      _hover: {
        bg: '{colors.primary.hover}',
        color: '{colors.text}',
      },
    },
    hidden: {
      visibility: 'hidden',
    },
  },
})
