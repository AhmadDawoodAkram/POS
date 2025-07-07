import { defineRecipe } from '@pandacss/dev'

export const label = defineRecipe({
  className: 'label',
  description: 'Styles for the Label component',
  base: {
    textStyle: 'sm',
    leading: 'none',
    fontWeight: 'medium',
    color: '{colors.text.secondary}',
    _peerDisabled: {
      cursor: 'not-allowed',
      color: '{colors.text.disabled}',
    },
  },
})
