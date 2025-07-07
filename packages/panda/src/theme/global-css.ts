import { defineGlobalStyles } from '@pandacss/dev'

export const globalCss = defineGlobalStyles({
  body: {
    _dark: {
      colorScheme: 'dark',
    },
  },
  '*, *::before, *::after': {},

  '.sr-only': {
    position: 'absolute',
    width: '1px',
    height: '1px',
    padding: '0',
    margin: '-1px',
    overflow: 'hidden',
    clip: 'rect(0, 0, 0, 0)',
    border: '0',
  },
})
