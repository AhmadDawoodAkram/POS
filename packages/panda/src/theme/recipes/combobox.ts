import { defineSlotRecipe } from '@pandacss/dev'

export const combobox = defineSlotRecipe({
  className: 'combobox',
  description: 'Styles for the Combobox component',
  slots: ['root', 'trigger', 'content', 'input', 'group', 'item', 'separator', 'itemIndicator'],
  base: {
    root: {},
    trigger: {
      border: '1px solid {colors.border}',

      _focus: {
        borderColor: '{colors.primary.hover} !important',
        shadow: '0 0 0 2px {colors.primary.bgHover}',
        outline: '2px solid {colors.primary.bgHover}',
        outlineOffset: '2px',
      },
      _hover: {
        borderColor: '{colors.primary.hover}',
        color: '{colors.text} !important',
      },
      _disabled: {
        cursor: 'not-allowed',
        color: '{colors.text.disabled}',
        bg: '{colors.fill.disabled}',
        borderColor: '{colors.border}',
        _hover: {
          borderColor: '{colors.border} !important',
        },
      },
      justifyContent: 'start',
      '& span': {
        mr: 'auto',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        _placeholder: {
          color: '{colors.text.secondary}',
        },
      },
      '& svg': {
        color: '{colors.text.tertiary}',
      },

      '&[data-status=error]': {
        borderColor: '{colors.error.border} !important',
        '&:is(:hover, [data-hover])': {
          borderColor: '{colors.error.borderHover}',
        },
        '&:is(:focus, [data-focus])': {
          borderColor: '{colors.error.borderHover} !important',
          shadow: '0 0 0 2px {colors.error.bgHover}',
          outline: '2px solid {colors.error.bgHover}',
        },
      },

      '&[data-status=success]': {
        borderColor: '{colors.success.border} !important',
        '&:is(:hover, [data-hover])': {
          borderColor: '{colors.success.borderHover}',
        },
        '&:is(:focus, [data-focus])': {
          borderColor: '{colors.success.borderHover} !important',
          shadow: '0 0 0 2px {colors.success.bgHover}',
          outline: '2px solid {colors.success.bgHover}',
        },
      },

      '&[data-status=warning]': {
        borderColor: '{colors.warning.border} !important',
        '&:is(:hover, [data-hover])': {
          borderColor: '{colors.warning.borderHover}',
        },
        '&:is(:focus, [data-focus])': {
          borderColor: '{colors.warning.borderHover} !important',
          shadow: '0 0 0 2px {colors.warning.bgHover}',
          outline: '2px solid {colors.warning.bgHover}',
        },
      },
    },
    content: {},
    input: {},
    group: {},
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

      ['&[data-disabled="true"]']: {
        pointerEvents: 'none',
        opacity: '0.5',
      },
    },
    separator: {
      mx: '-1',
      my: '1',
      h: '1px',
      bg: '{colors.border.secondary}',
    },
    itemIndicator: {
      position: 'absolute',
      left: '{spacing.padding.inline.xs}',
      display: 'flex',
      h: '{sizes.icon.sm}',
      w: '{sizes.icon.sm}',
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
  variants: {
    size: {
      sm: {
        trigger: {
          minH: '{sizes.controlHeight.sm}',
          maxH: '{sizes.controlHeight.sm}',
          '& *': {
            textStyle: 'sm',
          },
          px: '{spacing.padding.inline.sm} !important',
          py: '{spacing.padding.block.sm} !important',
        },
        item: {
          py: '{spacing.padding.block.sm}',
        },
      },
      md: {
        trigger: {
          minH: '{sizes.controlHeight.md}',
          maxH: '{sizes.controlHeight.md}',
          '& *': {
            textStyle: 'sm',
          },
          px: '{spacing.padding.inline.md} !important',
          py: '{spacing.padding.block.md} !important',
        },
      },
      lg: {
        trigger: {
          minH: '{sizes.controlHeight.lg}',
          maxH: '{sizes.controlHeight.lg}',
          '& *': {
            textStyle: 'md',
          },
          px: '{spacing.padding.inline.md} !important',
          py: '{spacing.padding.block.md} !important',
        },
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
  staticCss: [{ size: ['*'] }],
})
