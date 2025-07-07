import type { Meta, StoryObj } from '@storybook/react'
import { Stack } from '@styled-system/jsx'
import { Separator } from '~/ui/separator'

const meta: Meta<typeof Separator> = {
  title: 'Components/Separator',
  tags: ['autodocs'],
  render: (props) => (
    <Stack direction={props.orientation === 'horizontal' ? 'column' : 'row'}>
      <div>Lorem ipsum dolor sit amet</div>
      <Separator {...props} />
      <div>Lorem ipsum dolor sit amet</div>
      <Separator {...props} />
      <div>Lorem ipsum dolor sit amet</div>
    </Stack>
  ),
  argTypes: {
    orientation: {
      control: 'inline-radio',
      options: ['vertical', 'horizontal'],
    },
    rounded: {
      control: 'boolean',
    },
    type: {
      control: 'inline-radio',
      options: ['solid', 'dotted', 'dashed'],
    },
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    orientation: 'horizontal',
    type: 'solid',
  },
}

export const Variants = () => (
  <Stack>
    <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>

    <Separator />

    <Stack direction="row">
      <div>Lorem ipsum</div>
      <Separator orientation="vertical" />
      <div>dolor sit amet</div>
      <Separator orientation="vertical" css={{ borderEndWidth: '4' }} />
      <div>Lorem ipsum</div>
      <Separator orientation="vertical" css={{ borderEndWidth: '6' }} />
      <div>Lorem ipsum</div>
      <Separator orientation="vertical" css={{ borderEndWidth: '8' }} />
      <div>Lorem ipsum</div>
    </Stack>

    <Separator css={{ color: '{colors.info.border}', borderBlockEndWidth: '3' }} />

    <Stack direction="row">
      <div>Lorem ipsum</div>
      <Separator orientation="vertical" rounded />
      <div>dolor sit amet</div>
      <Separator orientation="vertical" css={{ borderEndWidth: '4' }} rounded />
      <div>Lorem ipsum</div>
      <Separator orientation="vertical" css={{ borderEndWidth: '6' }} rounded />
      <div>Lorem ipsum</div>
      <Separator orientation="vertical" css={{ borderEndWidth: '8' }} rounded />
      <div>Lorem ipsum</div>
    </Stack>

    <Separator css={{ color: '{colors.error.border}', borderBlockEndWidth: '5' }} />

    <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>

    <Separator css={{ color: '{colors.success.border}', borderBlockEndWidth: '7' }} rounded />

    <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>

    <Separator type="dotted" />

    <Separator type="dashed" />
  </Stack>
)
