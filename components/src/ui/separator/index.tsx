import { styled } from '@styled-system/jsx'
import { type SeparatorVariantProps, separator } from '@styled-system/recipes'

export type SeparatorProps = SeparatorVariantProps & React.HTMLAttributes<HTMLDivElement>

const Component = styled('div', separator)

export const Separator = (props: SeparatorProps) => {
  return <Component {...props} />
}
